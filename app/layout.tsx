import { Metadata } from 'next'
// import Script from 'next/script'

// import { AppProvider } from 'contexts'
import './globals.css'

import { PageTitle } from 'components/PageTitle'
import Head from 'next/head'

const ogTitle = 'Ole-Martin Bratteng'
const ogDescription = `${ogTitle} \u2014 Software developer`
const title = 'bratteng \u00B7 com'

export const metadata: Metadata = {
	description: ogDescription,
	title,

	openGraph: {
		siteName: title,
		title: ogTitle,
		type: 'website',
		description: ogDescription,
		locale: 'en_GB',
	},

	twitter: {
		site: '@omBratteng',
		creator: '@omBratteng',
		title: ogTitle,
		description: ogDescription,
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="dark">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				{/* <meta name="description" content={ogDescription} /> */}
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="shortcut icon" href="/favicon.ico" />

				<link rel="me" href="https://cloud-native.social/@omBratteng" />

				{/* <meta property="og:image" content="/opengraph-image.png" /> */}
				{/* <meta property="og:url" content="https://bratteng.com" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:alt" content={ogDescription} />
				<meta property="og:description" content={ogDescription} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={ogTitle} />
				<meta property="og:site_name" content={siteTitle} />
				<meta property="og:locale" content="en_GB" /> */}

				{/* <meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@omBratteng" />
				<meta name="twitter:creator" content="@omBratteng" />
				<meta name="twitter:url" content="https://bratteng.com" />
				<meta name="twitter:title" content={ogTitle} />
				<meta name="twitter:description" content={ogDescription} />
				<meta name="twitter:image" content={ogImage} />
				<meta name="twitter:image:alt" content={ogDescription} /> */}
			</Head>
			<body>
				{/* <AppProvider> */}
				<div className="flex flex-col min-h-[stretch] mt-20">
					<PageTitle />
					<main className="mx-2 max-w-[43.75rem] w-full py-1 self-center">{children}</main>
				</div>
				{/* </AppProvider> */}
			</body>
			{/* <Script
				strategy="beforeInteractive"
				id="theme-script"
				dangerouslySetInnerHTML={{
					__html: `(()=>{const e=(()=>{const e=window.localStorage.getItem("theme");if("string"==typeof e)return e;const t=window.matchMedia("(prefers-color-scheme: dark)");return"boolean"==typeof t.matches&&t.matches?"dark":"light"})();document.documentElement.style.setProperty("--initial-color-mode",e),"dark"===e&&document.documentElement.setAttribute("data-theme","dark")})();`,
				}}
			/> */}
		</html>
	)
}
