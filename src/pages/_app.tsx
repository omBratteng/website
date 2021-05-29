// Types
import type { AppProps } from 'next/app'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHashtag } from '@fortawesome/pro-regular-svg-icons'

import { faGithubAlt, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import { faLightbulb, faLightbulbOn, faLightbulbSlash } from '@fortawesome/pro-duotone-svg-icons'

// Next.js
import Head from 'next/head'
import getConfig from 'next/config'

// Context
import { AppProvider } from 'contexts'

// Components
import { Layout } from 'components'

// import { preload } from 'utils'
// import links from 'links'

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

library.add(faGithubAlt, faHashtag, faLightbulb, faLightbulbOn, faLightbulbSlash, faLinkedinIn, faTwitter)

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	const ogTitle = 'Ole-Martin Bratteng'
	const ogDescription = `${ogTitle} &mdash; Software developer`
	const ogImage = `${assetPrefix}/ogimage.png`
	const siteTitle = 'bratteng &middot; sh'

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<meta name="description" content={ogDescription} />
				{/* {preload({ links })} */}
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="shortcut icon" href="/favicon.ico" />

				<meta property="og:url" content="https://bratteng.sh" />
				<meta property="og:image" content={ogImage} />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:alt" content={ogDescription} />
				<meta property="og:description" content={ogDescription} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={ogTitle} />
				<meta property="og:site_name" content={siteTitle} />
				<meta property="og:locale" content="en_GB" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@omBratteng" />
				<meta name="twitter:creator" content="@omBratteng" />
				<meta name="twitter:url" content="https://bratteng.sh" />
				<meta name="twitter:title" content={ogTitle} />
				<meta name="twitter:description" content={ogDescription} />
				<meta name="twitter:image" content={ogImage} />
				<meta name="twitter:image:alt" content={ogDescription} />
			</Head>
			<AppProvider siteTitle={siteTitle}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</>
	)
}

export default App
