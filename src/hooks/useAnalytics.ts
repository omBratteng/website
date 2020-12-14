/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { AckeeInstance } from 'ackee-tracker'
interface Props {
	domainId: string
	server: string
	options: Partial<{
		ignoreOwnVisits?: boolean
		ignoreLocalhost?: boolean
		detailed?: boolean
	}>
}

const useAnalytics = ({
	domainId,
	server,
	options = {},
}: Props): AckeeInstance | undefined => {
	const router = useRouter()
	const tracker = useRef<any>()
	const [trackerLoaded, setTrackerLoaded] = useState<boolean>(false)

	const recordVisit = () => {
		if (!tracker.current) {
			throw new Error('Unable to load `ackee-tracker`')
		}
		tracker.current.record()
	}

	useEffect(() => {
		;(async () => {
			if (trackerLoaded) return
			await import('ackee-tracker').then((ackeeTracker) => {
				tracker.current = ackeeTracker.create(
					{
						server,
						domainId,
					},
					options,
				)
				setTrackerLoaded(true)
			})

			recordVisit()
		})()
	}, [domainId, server, options, trackerLoaded])

	useEffect(() => {
		router.events.on('routeChangeComplete', recordVisit)

		return () => {
			router.events.off('routeChangeComplete', recordVisit)
		}
	}, [router.events])

	return tracker.current
}

export default useAnalytics
