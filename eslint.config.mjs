import { defineConfig, globalIgnores } from 'eslint/config'
import nextConfig from 'eslint-config-next'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

// eslint-config-next applies Next's bundled Babel parser to all JS/MJS/CJS
// files. That parser's scope manager is incompatible with ESLint 10
// (`scopeManager.addGlobals is not a function`). Reuse the TypeScript parser
// that the config already ships for `.ts`/`.tsx` — it parses plain JS too and
// is ESLint 10 compatible.
const typescriptParser = nextConfig.find((entry) => entry.name === 'next/typescript').languageOptions.parser

export default defineConfig([
	...nextConfig,
	prettierRecommended,
	{
		files: ['**/*.{js,jsx,mjs,cjs}'],
		languageOptions: {
			parser: typescriptParser,
		},
	},
	{
		languageOptions: {
			globals: {
				global: true,
			},
		},
		settings: {
			// Pin the React version explicitly. eslint-plugin-react's `detect`
			// path relies on context.getFilename(), which ESLint 10 removed.
			react: {
				version: '19',
			},
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					semi: false,
					singleQuote: true,
					tabWidth: 4,
					trailingComma: 'all',
					useTabs: true,
					printWidth: 127,
				},
			],
			'@typescript-eslint/no-empty-function': 'off',
		},
	},
	globalIgnores(['.next/', '**/*.min.*']),
])
