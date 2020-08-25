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
			]
		],
		plugins: [
			['babel-plugin-module-resolver', { root: ['./src'] }],
		]
	}
}
