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
	// These options are used for both client and server manifest plugins.
	assetsManifest: {
		done(manifest) {
			console.log(`${manifest}`)
		},
	},
	// Customize the client side manifest.
	assetsManifestClient: {
		output: `${process.cwd()}/public/asset-manifest.json`,
	},
})
