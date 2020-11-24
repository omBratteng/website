import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const useAnalytics = ({ domainId, server, options = {} }) => {
	const router = useRouter()
	const tracker = useRef()
	const [trackerLoaded, setTrackerLoaded] = useState(false)

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
	}, [router.events, domainId, server, options, trackerLoaded])

	useEffect(() => {
		router.events.on('routeChangeComplete', recordVisit)

		return () => {
			router.events.off('routeChangeComplete', recordVisit)
		}
	}, [router.events])

	return tracker.current
}

export default useAnalytics
