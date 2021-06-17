export type OffsetTonnes = {
	offsetTonnes: string
}

export type OffsetOrders = {
	stats: {
		totalTons: number
		approximateTreesSavedPerYearEquivalent: number
		approximateMilesDrivenEquivalent: number
		approximateFlightsTakenEquivalent: number
	}
	offsetOrders: {
		id: string
		amount_paid_by_customer: number
		tons: number
		portfolio_id: number | null
		project_id: number
		source: string
		note: string | null
	}
}
