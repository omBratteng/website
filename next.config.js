/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const isProd =
	process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

const assetPrefix = isProd ? 'https://cdn.bratteng.sh' : ''

const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	assetPrefix,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: ['@svgr/webpack'],
		})

		return config
	},
	async headers() {
		return [
			{
				source: '/assets/fonts/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=15552000',
					},
				],
			},
		]
	},
	serverRuntimeConfig: {},
	publicRuntimeConfig: {
		assetPrefix,
		domainId: process.env.DOMAIN_ID,
		offsetTonnes: process.env.OFFSET_TONNES,
		nonce: process.env.CSP_NONCE,
	},
}

module.exports = withPlugins([], nextConfig)
