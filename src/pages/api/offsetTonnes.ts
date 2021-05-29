import type { NextApiHandler } from 'next'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const { wrenToken } = serverRuntimeConfig

export type OffsetTonnes = {
	offsetTonnes: string
}

const ApiEndpoint: NextApiHandler<OffsetTonnes> = async (_, res) => {
	if (!wrenToken) return res.status(500).end()

	const offsetTonnes = await fetch('https://wren-staging.herokuapp.com/api/offset-orders', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${wrenToken}`,
		},
	})
		.then((data) => data.json())
		.then(({ stats }) => {
			return stats.totalTons
		})
		.then((offset: number) => offset.toFixed(2))

	res.setHeader('Cache-Control', 'public, max-age=2592000')
	return res.status(200).json({
		offsetTonnes,
	})
}

export default ApiEndpoint
