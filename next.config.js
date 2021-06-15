/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const isProd = process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

const assetPrefix = isProd ? 'https://cdn.bratteng.sh' : ''

const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	assetPrefix,
	async headers() {
		return [
			{
				source: '/css/fonts.551bfafc.css',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=15552000',
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
