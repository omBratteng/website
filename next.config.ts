import type { NextConfig } from 'next'

import NextBundleAnalyzer from '@next/bundle-analyzer'

const isProd = process.env.NODE_ENV === 'production' && process.env.APP_ENV !== 'staging'

const assetPrefix = isProd ? 'https://cdn.bratteng.com' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'standalone',
	reactStrictMode: false,
	poweredByHeader: false,
	...(isProd && { assetPrefix }),
	headers: async () => [
		{
			source: '/.well-known/atproto-did',
			headers: [
				{
					key: 'Content-Type',
					value: 'text/plain',
				},
			],
		},
		{
			source: '/(.*)',
			headers: [
				{
					key: 'X-Frame-Options',
					value: 'DENY',
				},
				{
					key: 'X-Content-Type-Options',
					value: 'nosniff',
				},
				{
					key: 'Referrer-Policy',
					value: 'strict-origin-when-cross-origin',
				},
				{
					key: 'X-XSS-Protection',
					value: '1; mode=block',
				},
			],
		},
	],
} satisfies NextConfig

export default NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})(nextConfig)
