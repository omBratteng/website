import process from 'process'
import getConfig from 'next/config'

import googleFonts from 'utils/googleFonts'

type Links = (string | { href: string; as?: string; type?: string })[]

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

const devLinks: Links = [
	googleFonts('Space+Mono:ital,wght@0,400;0,700;1,400;1,700'),
	{
		href: `${assetPrefix}/assets/fonts/space-mono-v6-latin-700italic.woff2`,
		as: 'font',
		type: 'font/woff2',
	},
	{
		href: `${assetPrefix}/assets/fonts/space-mono-v6-latin-italic.woff2`,
		as: 'font',
		type: 'font/woff2',
	},
]

const prodLinks: Links = [assetPrefix]
const globalLinks: Links = [
	{
		href: `${assetPrefix}/assets/fonts/space-mono-v6-latin-700.woff2`,
		as: 'font',
		type: 'font/woff2',
	},
	{
		href: `${assetPrefix}/assets/fonts/space-mono-v6-latin-regular.woff2`,
		as: 'font',
		type: 'font/woff2',
	},
]

const links: Links = [
	...(process.env.NODE_ENV === 'development' ? devLinks : prodLinks),
	...globalLinks,
]

export default links
