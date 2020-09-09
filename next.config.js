/* eslint-disable no-undef */
const isProd =
	process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'
module.exports = {
	reactStrictMode: false,
	poweredByHeader: false,
	assetPrefix: isProd ? 'https://brattengsh.b-cdn.net' : '',
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
}
