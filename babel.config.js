/* eslint-env node */

module.exports = (api) => {
	const isDev = api.env('development')

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					corejs: 3,
				},
			],
			'@babel/preset-react',
			'next/babel',
		],
		plugins: [
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
