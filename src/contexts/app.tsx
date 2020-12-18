import type { Dispatch, SetStateAction } from 'react'
import { createContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

// Next.js
import Head from 'next/head'

import { GlobalStyle, dark, light } from 'styles'
import useDarkMode, { DarkMode } from 'use-dark-mode'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export type ContextProps = {
	darkMode: DarkMode
	offsetTonnes: string
	pageTitle: string
	setPageTitle: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<Partial<ContextProps>>({
	offsetTonnes: '0',
})

interface IAppProvider {
	siteTitle: string
	children: React.ReactNode
}

const AppProvider = ({ siteTitle, children }: IAppProvider): JSX.Element => {
	const [pageTitle, setPageTitle] = useState<string>('')
	const [title, setTitle] = useState<string>(siteTitle)

	const darkMode = useDarkMode(true)
	const { offsetTonnes }: { offsetTonnes: string } = publicRuntimeConfig

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
			<AppContext.Provider
				value={{ darkMode, offsetTonnes, pageTitle, setPageTitle }}
			>
				<ThemeProvider theme={darkMode.value ? dark : light}>
					<GlobalStyle />
					{children}
				</ThemeProvider>
			</AppContext.Provider>
		</>
	)
}

export default AppProvider
