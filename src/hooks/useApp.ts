import { useContext } from 'react'
import { AppContext, AppContextProps } from 'contexts/app'

const useApp = (): AppContextProps => {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error('useContext must be used within a AppProvider')
	}

	return context as AppContextProps
}

export default useApp
