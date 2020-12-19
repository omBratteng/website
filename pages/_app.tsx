// Types
import type { AppProps } from 'next/app'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHashtag } from '@fortawesome/pro-regular-svg-icons'

import {
	faGithubAlt,
	faTwitter,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'

import {
	faLightbulb,
	faLightbulbOn,
	faLightbulbSlash,
} from '@fortawesome/pro-duotone-svg-icons'

// Next.js
import Head from 'next/head'

// Context
import AppProvider from 'contexts/app'

// Components
import Layout from 'components/layout/Layout'
import { useAnalytics } from 'hooks'

import { domainId } from 'env'

// import { preload } from 'utils'
// import links from 'links'

library.add(
	faGithubAlt,
	faHashtag,
	faLightbulb,
	faLightbulbOn,
	faLightbulbSlash,
	faLinkedinIn,
	faTwitter,
)

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	useAnalytics({
		domainId,
		server: 'https://analytics.bratteng.cloud',
		options: {
			detailed: true,
		},
	})

	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/css/fonts.edbb5bf.css"
					as="style"
					integrity="sha256-GxJsHG3iYHNKUW01TtdnnBwmrKgBtJDCZZtAzo0udCY="
				/>
				<link
					rel="stylesheet"
					href="/css/fonts.edbb5bf.css"
					integrity="sha256-GxJsHG3iYHNKUW01TtdnnBwmrKgBtJDCZZtAzo0udCY="
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta
					name="description"
					content="Ole-Martin Bratteng &mdash; Software developer"
				/>
				{/* {preload({ links })} */}
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<AppProvider siteTitle="bratteng &middot; sh">
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</>
	)
}

export default App
