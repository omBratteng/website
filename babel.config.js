/* eslint-env node */

module.exports = (api) => {
	const isDev = api.env('development')

	return {
		presets: [
			[
				'next/babel',
				{
					'preset-env': {
						corejs: 3,
						useBuiltIns: 'entry', //tells the preset to look for browserslist config source
					},
				},
			],
		],
		plugins: [
			[
				'babel-plugin-styled-components',
				{
					ssr: true,
					displayName: isDev,
					preprocess: false,
				},
			],
			['babel-plugin-module-resolver', { root: ['./src'] }],
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
