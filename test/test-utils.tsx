import type { ReactNode, ReactElement } from 'react'
import type { RenderResult, RenderOptions } from '@testing-library/react/types'

import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { dark } from '../src/styles'
import React from 'react'

interface ThemeWrapperProps {
	children: ReactNode
}
const ThemeWrapper = ({ children }: ThemeWrapperProps): JSX.Element => (
	<ThemeProvider theme={dark}>{children}</ThemeProvider>
)

const customRender = (ui: ReactElement, options: RenderOptions): RenderResult =>
	render(ui, { wrapper: ThemeWrapper as React.FunctionComponent, ...options })

export * from '@testing-library/react'

export { customRender as render }
