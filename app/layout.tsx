import type { PropsWithChildren, ReactElement } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { domainToUnicode } from 'node:url'
import './globals.css'

import { PageTitle } from 'components/PageTitle'

const ogTitle = 'Ole-Martin Bratteng'
const ogDescription = `${ogTitle} \u2014 Software developer`

export async function generateMetadata(): Promise<Metadata> {
	const host = (await headers()).get('host') ?? 'bratteng.com'
	const hostname = domainToUnicode(host.split(':')[0])
	const title = hostname.replaceAll('.', ' \u00B7 ')

	return {
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
}

export default function RootLayout({ children }: PropsWithChildren): ReactElement {
	return (
		<html lang="en" data-theme="dark">
			<body className="pt-20">
				<div className="flex flex-col min-h-[stretch]">
					<PageTitle />
					<main className="mx-2 max-w-175 w-full py-1 self-center">{children}</main>
				</div>
			</body>
		</html>
	)
}
