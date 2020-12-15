import process from 'process'
import getConfig from 'next/config'

import googleFonts from 'utils/googleFonts'

type Links = (string | { href: string; as?: string; type?: string })[]

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

const devLinks: Links = [
	googleFonts('Space+Mono:ital,wght@0,400;0,700;1,400;1,700'),
]

const prodLinks: Links = [assetPrefix, googleFonts('Space+Mono:wght@400;700')]
const globalLinks: Links = []

const links: Links = [
	...(process.env.NODE_ENV === 'development' ? devLinks : prodLinks),
	...globalLinks,
]

export default links
