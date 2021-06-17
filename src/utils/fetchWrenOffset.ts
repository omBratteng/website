import getConfig from 'next/config'

import type { OffsetOrders, OffsetTonnes } from 'types/dto'

const { serverRuntimeConfig } = getConfig()
const { wrenToken } = serverRuntimeConfig

import { fetcher } from 'utils'

const fetchWrenOffset = async (): Promise<OffsetTonnes> => {
	if (!wrenToken) return { offsetTonnes: '00.00' }

	const offsetTonnes = await fetcher<OffsetOrders>('https://www.wren.co/api/offset-orders', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${wrenToken}`,
		},
	})
		.then(({ stats }) => stats.totalTons)
		.then((offset: number) => offset.toFixed(2))

	return {
		offsetTonnes,
	}
}

export default fetchWrenOffset
