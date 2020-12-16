// Types
import type { AppProps } from 'next/app'
import type { RuntimeConfig } from 'types'

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
import getConfig from 'next/config'

// Context
import AppProvider from 'contexts/app'

// Components
import Layout from 'components/layout/Layout'
import useAnalytics from 'hooks/useAnalytics'
import 'fonts.css'

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

const { publicRuntimeConfig } = getConfig()

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	const { domainId }: RuntimeConfig = publicRuntimeConfig

	useAnalytics({
		domainId: domainId,
		server: 'https://analytics.bratteng.cloud',
		options: {
			detailed: true,
		},
	})

	return (
		<>
			<Head>
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
			<AppProvider>
				<Layout siteTitle="bratteng &middot; sh">
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</>
	)
}

export default App
