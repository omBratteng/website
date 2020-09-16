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

const App = ({ Component, pageProps }) => {
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

export const reportWebVitals = ({ id, name, label, value }) => {
	ga('send', 'event', {
		eventCategory:
			label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
		eventAction: name,
		eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
		eventLabel: id,
		nonInteraction: true,
	})
}

App.propTypes = {
	Component: PropTypes.func,
	pageProps: PropTypes.object,
}

export default App
