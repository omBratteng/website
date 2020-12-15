import process from 'process'
import getConfig from 'next/config'

type Links = (string | { href: string; as?: string; type?: string })[]

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

const devLinks: Links = []

const prodLinks: Links = [assetPrefix]
const globalLinks: Links = []

const links: Links = [
	...(process.env.NODE_ENV === 'development' ? devLinks : prodLinks),
	...globalLinks,
]

export default links
