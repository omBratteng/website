// Strongly type the styled-components theme
import { CSSProp } from 'styled-components'

import { lightTheme as theme } from 'styles/lightTheme'

// Enable css prop support globally
declare module 'react' {
	interface Attributes {
		css?: CSSProp
	}
}

declare module 'styled-components' {
	type Theme = typeof theme
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}
