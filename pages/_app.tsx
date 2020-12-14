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
import type { AppProps } from 'next/app'
import Head from 'next/head'

// Context
import AppProvider from 'contexts/app'

// Components
import Layout from 'components/layout/Layout'
import useAnalytics from 'hooks/useAnalytics'

import { preload } from 'utils'
import links from 'links'

library.add(faHashtag)
library.add(faGithubAlt, faTwitter, faLinkedinIn)
library.add(faLightbulb, faLightbulbOn, faLightbulbSlash)

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	useAnalytics({
		domainId: 'cd291bc6-83f4-4b60-82e9-b2219d50f7b7',
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
				{preload({ links })}
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
