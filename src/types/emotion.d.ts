// Strongly type the styled-components theme
// import { CSSProp } from 'styled-components'

import { dark as theme } from 'styles'

// Enable css prop support globally
// declare module 'react' {
// 	interface Attributes {
// 		css?: CSSProp
// 	}
// }

declare module '@emotion/react' {
	type CustomTheme = typeof theme
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends CustomTheme {}
}
