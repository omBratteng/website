import type { Url } from 'url'
import { parse } from 'url'

interface IPreload {
	links: Array<
		| string
		| {
				as?: string
				integrity?: string
				autoload?: boolean
				href: string
		  }
	>
}

const preload = ({ links }: IPreload): JSX.Element[] => {
	const preconnect = new Set<string>()
	const preload = new Set<JSX.Element>()
	const stylesheet = new Set<JSX.Element>()
	const scripts = new Set<JSX.Element>()

	links.map((link, key: number) => {
		if (typeof link === 'string') {
			preconnect.add(link)
			return
		}

		const { as, integrity, href, autoload = true, ...props } = link
		const url: Url = parse(href)

		preconnect.add(`${url.protocol}//${url.host}`)

		if (url.pathname !== '/') {
			preload.add(
				<link
					key={`preload-${as}-${key}`}
					rel="preload"
					as={as}
					href={href}
					crossOrigin="anonymous"
					integrity={integrity}
					{...props}
				/>,
			)

			if (!autoload) return

			as === 'style' &&
				stylesheet.add(
					<link
						key={`preloaded-stylesheet-${key}`}
						rel="stylesheet"
						href={href}
						crossOrigin="anonymous"
					/>,
				)
			as === 'script' &&
				scripts.add(
					<script
						key={`preloaded-script-${key}`}
						src={href}
						crossOrigin="anonymous"
						async
					/>,
				)
		}
	})

	return [
		...[...preconnect].map((href: string, key: number) => (
			<link
				rel="preconnect"
				href={href}
				key={`preconnect-${key}`}
				crossOrigin="anonymous"
			/>
		)),
		...preload,
		...stylesheet,
		...scripts,
	]
}
export default preload
