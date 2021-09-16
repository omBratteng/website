import { createContext } from 'react'
import { ThemeProvider } from 'styled-components'

// Next.js
import Head from 'next/head'

import { GlobalStyle, dark, light } from 'styles'

import useTheme, { IUseTheme } from 'hooks/useTheme'

export interface AppContextProps extends IUseTheme {
	siteTitle: string
}

export const AppContext = createContext({})

type Props = {
	siteTitle: string
	children: React.ReactNode
}

const AppProvider = ({ siteTitle, children }: Props): JSX.Element => {
	const [theme, setTheme] = useTheme()

	return (
		<>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<AppContext.Provider value={{ siteTitle, theme, setTheme }}>
				<ThemeProvider theme={theme ? dark : light}>
					<GlobalStyle />
					{children}
				</ThemeProvider>
			</AppContext.Provider>
		</>
	)
}

export default AppProvider
