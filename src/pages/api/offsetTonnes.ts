import type { NextApiHandler } from 'next'
import type { OffsetTonnes } from 'types/dto'

import fetchWrenOffset from 'utils/fetchWrenOffset'

import redis from 'lib/redis'

const ApiEndpoint: NextApiHandler<OffsetTonnes> = async ({ method }, res) => {
	res.setHeader('Cache-Control', 'public, max-age=604800')

	const cache = method === 'PURGE' ? null : await redis.get('offsetTonnes')
	const offsetTonnes: OffsetTonnes = cache ? JSON.parse(cache) : await fetchWrenOffset()

	!cache && (await redis.set('offsetTonnes', JSON.stringify(offsetTonnes), 'EX', '604800'))

	return res.status(200).json(await fetchWrenOffset())
}

export default ApiEndpoint
