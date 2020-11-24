import React from 'react'
import PropTypes from 'prop-types'

import { library } from '@fortawesome/fontawesome-svg-core'

// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { fad } from '@fortawesome/pro-duotone-svg-icons'
// import { fal } from '@fortawesome/pro-light-svg-icons'
// import { fas } from '@fortawesome/pro-solid-svg-icons'
// import { far } from '@fortawesome/pro-regular-svg-icons'
// library.add(far, fad)
import { faHashtag } from '@fortawesome/pro-regular-svg-icons'
library.add(faHashtag)

import {
	faGithubAlt,
	faTwitter,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
library.add(faGithubAlt, faTwitter, faLinkedinIn)

import {
	faLightbulb,
	faLightbulbOn,
	faLightbulbSlash,
} from '@fortawesome/pro-duotone-svg-icons'

library.add(faLightbulb, faLightbulbOn, faLightbulbSlash)

// Next.js
import Head from 'next/head'

// Context
import AppProvider from 'contexts/app'

// Components
import Layout from 'components/layout/Layout'
import useAnalytics from 'hooks/useAnalytics'

const App = ({ Component, pageProps }) => {
	useAnalytics({
		domainId: 'cd291bc6-83f4-4b60-82e9-b2219d50f7b7',
		server: 'https://analytics.bratteng.cloud',
		options: {
			detailed: true,
			ignoreLocalhost: false,
		},
	})

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta
					name="description"
					content="Ole-Martin Bratteng &mdash; Software developer"
				/>
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

App.propTypes = {
	Component: PropTypes.func,
	pageProps: PropTypes.object,
}

export default App
