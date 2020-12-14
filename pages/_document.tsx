import type {
	DocumentContext,
	DocumentInitialProps,
	DocumentProps,
} from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import process from 'process'

import { getCookie } from 'hooks/useCookie'

const nonce = process.env.CSP_NONCE || ''
global.__webpack_nonce__ = nonce

type Props = {
	darkMode: string
}

class Doc extends Document {
	darkMode: string

	constructor(props: DocumentProps & Props) {
		super(props)

		this.darkMode = props.darkMode
	}

	static async getInitialProps(
		context: DocumentContext,
	): Promise<DocumentInitialProps & Props> {
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

			const darkMode = context.req
				? getCookie('darkMode', context.req.headers.cookie || '')
				: 'false'

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

	render(): JSX.Element {
		return (
			<Html lang="no">
				<Head {...{ nonce }} />
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

export default Doc
