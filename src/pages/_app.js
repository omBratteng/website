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

import { getCookie } from 'hooks/useCookie'

// Components
import Layout from 'components/layout/Layout'

const App = ({ Component, pageProps, darkMode }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
			</Head>
			<AppProvider preferDarkMode={darkMode}>
				<Layout siteTitle="bratteng &middot; sh">
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</>
	)
}

App.getInitialProps = ({ ctx }) => {
	let darkMode = getCookie('darkMode', ctx.req.headers.cookie || '')

	return {
		darkMode: darkMode === 'true',
	}
}

App.propTypes = {
	Component: PropTypes.func,
	pageProps: PropTypes.object,
	darkMode: PropTypes.bool,
}

App.defaultProps = {
	darkMode: false,
}

export default App
