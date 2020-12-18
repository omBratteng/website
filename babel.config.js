/* eslint-env node */

module.exports = (api) => {
	const isDev = api.env('development')

	return {
		presets: ['next/babel'],
		plugins: [
			[
				'babel-plugin-styled-components',
				{
					ssr: true,
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
