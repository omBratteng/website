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
				{
					key: 'Cache-Control',
					value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
				},
			],
		},
		{
			source: '/(favicon.ico|ogimage.png)',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=86400, stale-while-revalidate=604800',
				},
			],
		},
		{
			source: '/(robots.txt|sitemap.xml)',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=3600',
				},
			],
		},
	],
} satisfies NextConfig

export default NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})(nextConfig)
