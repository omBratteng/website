'use client'
import { createContext } from 'react'
// import { Global, ThemeProvider } from '@emotion/react'
// Next.js
// import Head from 'next/head'

// import { appGlobalStyles, dark, light } from '_src/styles'

import useTheme, { IUseTheme } from 'hooks/useTheme'

export interface AppContextProps extends IUseTheme {
	siteTitle: string
}

export const AppContext = createContext({})

type Props = {
	siteTitle?: string
	children: React.ReactNode
}
const AppProvider = ({ siteTitle, children }: Props): JSX.Element => {
	const [theme, setTheme] = useTheme()

	return <AppContext.Provider value={{ siteTitle, theme, setTheme }}>{children}</AppContext.Provider>
}

export default AppProvider
