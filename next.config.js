/* eslint-disable no-undef */
const withAssetsManifest = require('next-assets-manifest')
const isProd =
	process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

const nonce = process.env.CSP_NONCE

module.exports = withAssetsManifest({
	reactStrictMode: false,
	poweredByHeader: false,
	assetPrefix: isProd ? 'https://cdn.bratteng.sh' : '',
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
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: `default-src 'self' cdn.bratteng.sh; style-src 'nonce-${nonce}' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'nonce-${nonce}'`,
					},
				],
			},
		]
	},
	// Customize the client side manifest.
	assetsManifestClient: {
		output: `${process.cwd()}/public/asset-manifest.json`,
	},
})
