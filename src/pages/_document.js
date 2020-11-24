import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import process from 'process'
import { parse as URLParse } from 'url'

import PropTypes from 'prop-types'

import { getCookie } from 'hooks/useCookie'

const googleFonts = (fonts) =>
	`https://fonts.googleapis.com/css2?family=${fonts}&display=swap`

const devLinks = [
	{
		href: googleFonts('Space+Mono:ital,wght@0,400;0,700;1,400;1,700'),
	},
]

const prodLinks = [
	{
		href: 'https://cdn.bratteng.sh',
	},
	{
		href: googleFonts('Space+Mono:wght@400;700'),
	},
]

const globalLinks = []

const isDev = process.env.NODE_ENV === 'development'
const links = [...(isDev ? devLinks : prodLinks), ...globalLinks]

const nonce = process.env.CSP_NONCE
global.__webpack_nonce__ = nonce

class Doc extends Document {
	constructor(props) {
		super(props)

		this.darkMode = props.darkMode
	}

	static async getInitialProps(context) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = context.renderPage

		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(
							<StyleSheetManager disableVendorPrefixes={isDev}>
								<App {...props} />
							</StyleSheetManager>,
						),
				})

			const darkMode = getCookie(
				'darkMode',
				context.req.headers.cookie || '',
			)

			const initialProps = await Document.getInitialProps(context)
			return {
				...initialProps,
				darkMode,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html lang="no">
				<Head {...{ nonce }}>
					<PreloadStyles links={links} />
				</Head>
				<body
					className={`${
						this.darkMode === 'true' ? 'dark-mode' : 'light-mode'
					}`}
				>
					<script
						dangerouslySetInnerHTML={{
							__html: `!function(){var e="dark-mode",a="light-mode";function o(o){document.body.classList.add(o?e:a),document.body.classList.remove(o?a:e)}var t=window.matchMedia("(prefers-color-scheme: dark)"),r="(prefers-color-scheme: dark)"===t.media,d=null;try{d=localStorage.getItem("darkMode")}catch(e){}var s=null!==d;if(s&&(d=JSON.parse(d)),s)o(d);else if(r)o(t.matches),localStorage.setItem("darkMode",t.matches);else{var c=document.body.classList.contains(e);localStorage.setItem("darkMode",JSON.stringify(c))}}();`,
						}}
					/>
					<Main />
					<NextScript {...{ nonce }} />
				</body>
			</Html>
		)
	}
}

const PreloadStyles = ({ links }) => {
	let preconnect = new Set()
	let preload = new Set()
	let stylesheet = new Set()
	let scripts = new Set()

	links.map((linkProps, key) => {
		const { as, integrity, href, autoload = true } = linkProps
		const url = URLParse(href)

		preconnect.add(`${url.protocol}//${url.host}`)

		if (url.pathname !== '/') {
			preload.add(
				<link
					key={key}
					rel="preload"
					as={as}
					integrity={integrity}
					crossOrigin="anonymous"
					{...linkProps}
				/>,
			)

			if (!autoload) return

			as === 'style'
				? stylesheet.add(
						<link
							key={key}
							rel="stylesheet"
							href={linkProps.href}
							crossOrigin="anonymous"
						/>,
				  )
				: scripts.add(
						<script
							key={key}
							src={linkProps.href}
							crossOrigin="anonymous"
							async
						/>,
				  )
		}
	})

	return (
		<>
			{[
				[...preconnect].map((href, key) => (
					<link
						rel="preconnect"
						href={href}
						key={key}
						crossOrigin="anonymous"
					/>
				)),
				...preload,
				...stylesheet,
				...scripts,
			]}
		</>
	)
}

PreloadStyles.propTypes = {
	links: PropTypes.array,
}

export default Doc
