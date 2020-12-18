import { useContext } from 'react'
import { AppContext, ContextProps } from 'contexts/app'

const useApp = (): ContextProps => {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error('useContext must be used within a AppProvider')
	}

	return context as ContextProps
}

export default useApp
