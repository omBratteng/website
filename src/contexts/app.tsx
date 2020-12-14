import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, lightTheme, darkTheme } from 'styles'
import useDarkMode, { DarkMode } from 'use-dark-mode'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export type ContextProps = Partial<{
	darkMode: DarkMode
	offsetTonnes: string
}>

const AppContext = createContext({})
const useApp = (): ContextProps => {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error('useContext must be used within a AppProvider')
	}

	return context
}

interface IAppProvider {
	children: React.ReactNode
}

const AppProvider = ({ children }: IAppProvider): JSX.Element => {
	const darkMode = useDarkMode(true)
	const { offsetTonnes }: { offsetTonnes: string } = publicRuntimeConfig

	useEffect(() => {
		const now = new Date()
		now.setTime(now.getTime() + 31 * 60 * 60 * 24 * 1000)

		document.cookie = `darkMode=${
			darkMode.value
		}; expires=${now.toUTCString()}; sameSite=strict; path=/`
	}, [darkMode])

	return (
		<AppContext.Provider value={{ darkMode, offsetTonnes }}>
			<ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</AppContext.Provider>
	)
}

AppProvider.propTypes = {
	children: PropTypes.node,
	preferDarkMode: PropTypes.bool,
}

export default AppProvider
export { useApp }
