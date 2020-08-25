import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, lightTheme, darkTheme } from 'styles'

const AppContext = createContext(undefined)

const useApp = () => {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error('useContext must be used within a AppProvider')
	}

	return context
}

const AppProvider = ({ children }) => {
	const [themeState, setThemeState] = useState({
		mode: 'light',
	})

	const toggleTheme = () => {
		setThemeState({ mode: themeState.mode === 'light' ? 'dark' : 'light' })
	}

	return (
		<AppContext.Provider value={{ themeState, toggleTheme }}>
			<ThemeProvider
				theme={themeState.mode === 'light' ? lightTheme : darkTheme}
			>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</AppContext.Provider>
	)
}

AppProvider.propTypes = {
	children: PropTypes.node,
}

export default AppProvider
export { useApp }
