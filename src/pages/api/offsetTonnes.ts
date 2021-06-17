import type { NextApiHandler } from 'next'
import type { OffsetTonnes } from 'types/dto'

import fetchWrenOffset from 'utils/fetchWrenOffset'

const ApiEndpoint: NextApiHandler<OffsetTonnes> = async (_, res) => {
	res.setHeader('Cache-Control', 'public, max-age=2592000')
	return res.status(200).json(await fetchWrenOffset())
}

export default ApiEndpoint
