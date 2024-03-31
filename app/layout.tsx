import { Metadata } from 'next'
import getConfig from 'next/config'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

import { PageTitle } from 'components/PageTitle'

const ogTitle = 'Ole-Martin Bratteng'
const ogDescription = `${ogTitle} \u2014 Software developer`
const title = 'bratteng \u00B7 com'

const { publicRuntimeConfig } = getConfig()

export const metadata: Metadata = {
	metadataBase: new URL('https://bratteng.com'),
	description: ogDescription,
	title: {
		template: `%s \u00B7 ${title}`,
		default: title,
	},

	openGraph: {
		siteName: title,
		title: ogTitle,
		type: 'website',
		locale: 'en_GB',
	},

	twitter: {
		site: '@omBratteng',
		creator: '@omBratteng',
		title: ogTitle,
	},

	icons: {
		shortcut: '/favicon.ico',
		other: {
			rel: 'me',
			url: 'https://cloud-native.social/@omBratteng',
		},
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="dark">
			<body className="pt-20">
				<div className="flex flex-col min-h-[stretch]">
					<PageTitle />
					<main className="mx-2 max-w-[43.75rem] w-full py-1 self-center">{children}</main>
				</div>
				<SpeedInsights scriptSrc={`${publicRuntimeConfig.assetPrefix}/_vercel/speed-insights/script.js`} />
				<Analytics scriptSrc={`${publicRuntimeConfig.assetPrefix}/_vercel/insights/script.js`} />
			</body>
		</html>
	)
}
