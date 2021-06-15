/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const isProd = process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

const assetPrefix = isProd ? 'https://cdn.bratteng.sh' : ''

const fonts = require('./src/fonts.json')

const links = [
	'<https://cdn.bratteng.sh/>; rel=preconnect',
	'<https://cdn.bratteng.sh/>; rel=dns-prefetch',
	'<https://fonts.gstatic.com/>; rel=preconnect',
	'<https://fonts.gstatic.com/>; rel=dns-prefetch',
]

fonts.forEach(({ url }) => {
	links.push(`<${url}>; rel=preload; as=font; crossorigin=anonymous`)
})

const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	assetPrefix,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Link',
						value: links.join(),
					},
				],
			},
		]
	},
	serverRuntimeConfig: {
		wrenToken: process.env.WREN_TOKEN,
	},
	publicRuntimeConfig: {
		assetPrefix,
	},
}

module.exports = withPlugins([withBundleAnalyzer], nextConfig)
