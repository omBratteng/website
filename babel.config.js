/* eslint-env node */

module.exports = (api) => {
	const isDev = api.env('development')
	const isTest = api.env('test')

	return {
		presets: ['next/babel'],
		plugins: [
			[
				'babel-plugin-styled-components',
				{
					ssr: !isTest,
					displayName: isDev,
					preprocess: false,
				},
			],
		],
		env: {
			production: {
				plugins: [
					[
						'babel-plugin-react-remove-properties',
						{
							properties: ['data-testid'],
						},
					],
				],
			},
		},
	}
}
