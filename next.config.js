/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

// const isProd = process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

// const assetPrefix = isProd ? 'https://cdn.bratteng.com' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: false,
	poweredByHeader: false,
	// ...(isProd && { assetPrefix }),
	serverRuntimeConfig: {},
	// publicRuntimeConfig: {
	// 	assetPrefix,
	// },
}

module.exports = withBundleAnalyzer(nextConfig)
