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
import getConfig from 'next/config'

// Context
import AppProvider from 'contexts/app'

// Components
import Layout from 'components/layout/Layout'

// import { preload } from 'utils'
// import links from 'links'

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

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
	return (
		<>
			<Head>
				{process.env.NODE_ENV !== 'development' ? (
					<>
						<link
							rel="preload"
							href={`${assetPrefix}/css/fonts.551bfafc.css`}
							as="style"
						/>
						<link
							rel="stylesheet"
							href={`${assetPrefix}/css/fonts.551bfafc.css`}
						/>
					</>
				) : (
					<>
						<link
							rel="preload"
							href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700"
							as="style"
						/>
						<link
							rel="stylesheet"
							href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700"
						/>
					</>
				)}
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
