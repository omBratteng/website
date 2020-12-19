import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useLocalStorage, useEvent } from 'react-use'

export type ThemeState = boolean | undefined
export type ThemeAction = Dispatch<SetStateAction<ThemeState>>

export interface IUseTheme {
	theme: ThemeState
	setTheme: ThemeAction
}

const useTheme = (
	key = 'theme',
	initialValue = '',
): [ThemeState, ThemeAction] => {
	const [value, setValue] = useLocalStorage(key, initialValue, {
		raw: true,
	})
	const [theme, setTheme] = useState<ThemeState>(undefined)

	useEvent('storage', (event) => {
		if (event.key === key) {
			if (value !== event.newValue) {
				setTheme(event.newValue === 'dark')
			}
		}
	})

	useEffect(() => {
		const root = window.document.documentElement
		const initialColorValue = root.style.getPropertyValue(
			'--initial-color-mode',
		)
		setTheme(initialColorValue === 'dark')

		const mql = window?.matchMedia('(prefers-color-scheme: dark)')
		mql.addEventListener('change', ({ matches }) => setTheme(matches))

		return () => {
			mql.addEventListener('change', ({ matches }) => setTheme(matches))
		}
	}, [])

	useEffect(() => {
		if (theme !== undefined) {
			const _theme = theme ? 'dark' : 'light'
			document.body.setAttribute('initialised', '')
			document.documentElement.setAttribute('data-theme', _theme)
			setValue(_theme)
		}
	}, [theme, setValue])

	return [theme, setTheme]
}

export default useTheme
