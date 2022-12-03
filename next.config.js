/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const isProd = process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

const assetPrefix = isProd ? 'https://cdn.bratteng.com' : ''

const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	...(isProd && { assetPrefix }),
	serverRuntimeConfig: {
		wrenToken: process.env.WREN_TOKEN,
	},
	publicRuntimeConfig: {
		assetPrefix,
	},
}

module.exports = withBundleAnalyzer(nextConfig)
