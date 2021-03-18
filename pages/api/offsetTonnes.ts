import type { NextApiHandler } from 'next'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const { wrenToken } = serverRuntimeConfig

const OffsetTonnes: NextApiHandler = async (req, res) => {
	if (!wrenToken) return res.status(500).end()
	if (req.method !== 'HEAD') return res.status(405).end()

	const offsetTonnes = await fetch(
		'https://wren-staging.herokuapp.com/api/offset-orders',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${wrenToken}`,
			},
		},
	)
		.then((data) => data.json())
		.then((offsets) => {
			return offsets.reduce(
				(prev: number, { tons }: { tons: number }) => {
					return prev + tons
				},
				0,
			)
		})
		.then((offset: number) => parseFloat(offset.toFixed(2)))

	res.setHeader('Cache-Control', 'public, max-age=2592000')
	res.setHeader('X-Offset-Tonnes', offsetTonnes)
	return res.status(200).json({})
}

export default OffsetTonnes
