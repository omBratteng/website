/* eslint-disable no-undef */
const withAssetsManifest = require('next-assets-manifest')
const isProd =
	process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'
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
	// Customize the client side manifest.
	assetsManifestClient: {
		output: `${process.cwd()}/public/asset-manifest.json`,
	},
})
