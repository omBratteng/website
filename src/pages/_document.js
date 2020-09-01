import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import process from 'process'

const googleFonts = (fonts) =>
	`https://fonts.googleapis.com/css2?family=${fonts}&display=swap`

const devLinks = [
	{
		href: googleFonts('Space+Mono:ital,wght@0,400;0,700;1,400;1,700'),
	},
]

const prodLinks = [
	{
		href: googleFonts('Space+Mono:wght@400;700'),
	},
]

const globalLinks = []

const isDev = process.env.NODE_ENV === 'development'
const links = [...(isDev ? devLinks : prodLinks), ...globalLinks]

class Doc extends Document {
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

			const initialProps = await Document.getInitialProps(context)
			return {
				...initialProps,
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
				<Head>
					<PreloadStyles links={links} />
				</Head>
				<body>
					<script
						dangerouslySetInnerHTML={{
							__html: `!function(){var e="dark-mode",a="light-mode";function o(o){document.body.classList.add(o?e:a),document.body.classList.remove(o?a:e)}var t=window.matchMedia("(prefers-color-scheme: dark)"),r="(prefers-color-scheme: dark)"===t.media,d=null;try{d=localStorage.getItem("darkMode")}catch(e){}var s=null!==d;if(s&&(d=JSON.parse(d)),s)o(d);else if(r)o(t.matches),localStorage.setItem("darkMode",t.matches);else{var c=document.body.classList.contains(e);localStorage.setItem("darkMode",JSON.stringify(c))}}();`,
						}}
					/>
					<Main />
					<NextScript />
					<script
						async
						dangerouslySetInnerHTML={{
							__html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga("create", "UA-176398081-1", "auto");
ga("set", "anonymizeIp", true);
ga("send", "pageview");`,
						}}
					/>
				</body>
			</Html>
		)
	}
}

const PreConnect = ({ hrefs }) =>
	hrefs.map((href, key) => (
		<link rel="preconnect" href={href} key={key} crossOrigin="anonymous" />
	))

const PreloadStyles = ({ links }) => {
	let preconnect = new Set()
	let preload = new Set()
	let stylesheet = new Set()
	links.map((linkProps) => {
		let url = linkProps.href.match(/(https?:\/\/[a-z.]+)/i)[0]
		preconnect.add(url)

		preload.add(
			<link
				rel="preload"
				as="style"
				{...linkProps}
				crossOrigin="anonymous"
			/>,
		)
		stylesheet.add(
			<link
				rel="stylesheet"
				{...linkProps}
				crossOrigin="anonymous"
				async
			/>,
		)
	})

	return [
		<PreConnect hrefs={[...preconnect]} key="0" />,
		...preload,
		...stylesheet,
	]
}

export default Doc
