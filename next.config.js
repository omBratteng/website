/* eslint-disable no-undef */
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
	serverRuntimeConfig: {},
	publicRuntimeConfig: {
		assetPrefix,
		offsetTonnes: process.env.OFFSET_TONNES,
		nonce: process.env.CSP_NONCE,
	},
}

module.exports = withPlugins([], nextConfig)
