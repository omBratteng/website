import type { Dispatch, SetStateAction } from 'react'
import { createContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

// Next.js
import Head from 'next/head'

import { GlobalStyle, dark, light } from 'styles'
import useDarkMode, { DarkMode } from 'use-dark-mode'

export type ContextProps = {
	darkMode: DarkMode
	pageTitle: string
	setPageTitle: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext({})

interface IAppProvider {
	siteTitle: string
	children: React.ReactNode
}

const AppProvider = ({ siteTitle, children }: IAppProvider): JSX.Element => {
	const [pageTitle, setPageTitle] = useState<string>('')
	const [title, setTitle] = useState<string>(siteTitle)

	const darkMode = useDarkMode(true)

	useEffect(() => {
		const now = new Date()
		now.setTime(now.getTime() + 31 * 60 * 60 * 24 * 1000)

		document.cookie = `darkMode=${
			darkMode.value
		}; expires=${now.toUTCString()}; sameSite=strict; path=/`
	}, [darkMode])

	useEffect(() => {
		setTitle(pageTitle ? `${pageTitle} – ${siteTitle}` : siteTitle)
	}, [pageTitle, siteTitle])

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<AppContext.Provider value={{ darkMode, pageTitle, setPageTitle }}>
				<ThemeProvider theme={darkMode.value ? dark : light}>
					<GlobalStyle />
					{children}
				</ThemeProvider>
			</AppContext.Provider>
		</>
	)
}

export default AppProvider
