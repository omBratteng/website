import type { NextApiHandler, NextApiRequest } from 'next'
import https from 'https'
import { createHmac } from 'crypto'

interface Signature {
	[version: string]: string[]
}

const currentVersion = 'v1'

const errNotSigned = new Error('webhook has no signature')
const errInvalidHeader = new Error('webhook has an invalid signature')

function verifyWebhookSignature<T>(req: NextApiRequest, body: string): T[] | Error {
	const secret = process.env.TS_WEBHOOK_SECRET
	if (!secret) {
		throw new Error('missing environment variable: TS_WEBHOOK_SECRET')
	}
	// Grab the signature sent in the request header.
	const signatureHeader = req.headers['tailscale-webhook-signature']
	if (!signatureHeader) {
		return errNotSigned
	}

	const { timestamp, signatures } = parseSignatureHeader(signatureHeader as string)

	// Verify that the timestamp is recent.
	// Here, we use a threshold of 5 minutes.
	const threshold = new Date(Date.now() - 5 * 60 * 1000)
	if (timestamp < threshold) {
		return new Error('invalid header: timestamp older than 5 minutes')
	}

	// Form the expected signature.
	const mac = createHmac('sha256', secret)
	mac.update(timestamp.toString())
	mac.update('.')
	mac.update(body)
	const want = mac.digest('hex')

	// Verify that the signatures match.
	const match = signatures[currentVersion] && signatures[currentVersion].includes(want)
	if (!match) {
		return new Error(`signature does not match: want = "${want}", got = "${signatures[currentVersion]}"`)
	}

	// If verified, return the events.
	const events: T[] = JSON.parse(body)
	return events
}

function parseSignatureHeader(header: string): { timestamp: Date; signatures: Signature } {
	const signatures: Signature = {}
	const pairs = header.split(',')

	let timestamp: Date | undefined = undefined

	for (const pair of pairs) {
		const parts = pair.split('=')
		if (parts.length !== 2) {
			throw errInvalidHeader
		}

		switch (parts[0]) {
			case 't':
				const tsint = parseInt(parts[1], 10)
				if (isNaN(tsint)) {
					throw errInvalidHeader
				}
				timestamp = new Date(tsint * 1000) // Convert to milliseconds
				break
			default:
				signatures[parts[0]] = parts[1].split(' ')
				break
		}
	}

	if (!timestamp || Object.keys(signatures).length === 0) {
		throw errNotSigned
	}

	return { timestamp, signatures }
}

type RequestType = 'nodeCreated' | 'nodeDeleted'

type RequestData = {
	timestamp: string
	version: number
	type: RequestType
	tailnet: string
	message: string
	data: {
		nodeID: string
		url: string
		deviceName: string
		managedBy: string
		actor: string
	}
}

const endpoint: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const requestData = verifyWebhookSignature<RequestData>(req, req.body)

			if (requestData instanceof Error) {
				console.error(`error validating signature: ${requestData.message}`)
				return res.status(400).end(requestData.message)
			}

			if (requestData && Array.isArray(requestData) && requestData.length > 0) {
				requestData.forEach(async (item) => {
					switch (item.data.managedBy) {
						case 'tag:fly-ingress':
							return res.status(400).json({ error: 'Invalid manager' })
						default:
							break
					}
					if (item.data && item.data.url && item.data.deviceName) {
						const fqdn = 'bratteng.com'
						const rrset_name = item.data.deviceName.replace(`.${process.env.TAILSCALE_TAILNET}`, '')
						const rrset_type = 'A'
						const ipAddress = item.data.url.split('/').pop()

						const authorization = `Apikey ${process.env.GANDI_LIVEDNS_KEY}`

						const method = item.type === 'nodeCreated' ? 'POST' : 'DELETE'

						const path = `/v5/livedns/domains/${fqdn}/records/${rrset_name}/${rrset_type}`
						const options = {
							method,
							hostname: 'api.gandi.net',
							port: null,
							path,
							headers: {
								authorization,
								'content-type': 'application/json',
							},
						}

						const req = https.request(options, function (res) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const chunks: any[] = []

							res.on('data', function (chunk) {
								chunks.push(chunk)
							})

							res.on('end', function () {
								const body = Buffer.concat(chunks)
								console.log(body.toString())
							})
						})

						if (item.type === 'nodeCreated') {
							req.write(
								JSON.stringify({
									rrset_values: [ipAddress],
									rrset_ttl: 300,
								}),
							)
						}
						req.end()
					}
				})

				res.status(200).json({ message: 'Data processed and requests sent to Gandi.' })
			} else {
				res.status(400).json({ error: 'Invalid data format in the request.' })
			}
		} catch (error) {
			console.error('Error:', error)
			res.status(500).json({ error: 'Internal server error.' })
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}

export default endpoint
