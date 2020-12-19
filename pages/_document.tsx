import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default class Doc extends Document {
	static async getInitialProps(
		context: DocumentContext,
	): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = context.renderPage

		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(
							<StyleSheetManager>
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

	render(): JSX.Element {
		return (
			<Html lang="no">
				<Head />
				<body>
					<script
						dangerouslySetInnerHTML={{
							__html: blockingSetInitialColorMode,
						}}
					></script>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

const blockingSetInitialColorMode = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`

function setInitialColorMode() {
	function getInitialColorMode() {
		const persistedColorPreference = window.localStorage.getItem('theme')
		const hasPersistedPreference =
			typeof persistedColorPreference === 'string'

		/**
		 * If the user has explicitly chosen light or dark,
		 * use it. Otherwise, this value will be null.
		 */
		if (hasPersistedPreference) {
			return persistedColorPreference
		}

		// If there is no saved preference, use a media query
		const mql = window.matchMedia('(prefers-color-scheme: dark)')
		const hasMediaQueryPreference = typeof mql.matches === 'boolean'

		if (hasMediaQueryPreference) {
			return mql.matches ? 'dark' : 'light'
		}

		// default to 'light'.
		return 'light'
	}

	const colorMode = getInitialColorMode()
	const root = document.documentElement
	root.style.setProperty('--initial-color-mode', colorMode)

	// add HTML attribute if dark mode
	if (colorMode === 'dark')
		document.documentElement.setAttribute('data-theme', 'dark')
}
