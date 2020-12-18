import { createContext, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

// Next.js
import Head from 'next/head'

import { GlobalStyle, dark, light } from 'styles'
import useDarkMode, { DarkMode } from 'use-dark-mode'
import { setCookie } from 'hooks'

export type ContextProps = {
	darkMode: DarkMode
	siteTitle: string
}

export const AppContext = createContext({})

type Props = {
	siteTitle: string
	children: React.ReactNode
}

const AppProvider = ({ siteTitle, children }: Props): JSX.Element => {
	const darkMode = useDarkMode(true)

	useEffect(() => {
		setCookie('darkMode', darkMode.value)
	}, [darkMode])

	return (
		<>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<AppContext.Provider value={{ darkMode, siteTitle }}>
				<ThemeProvider theme={darkMode.value ? dark : light}>
					<GlobalStyle />
					{children}
				</ThemeProvider>
			</AppContext.Provider>
		</>
	)
}

export default AppProvider
