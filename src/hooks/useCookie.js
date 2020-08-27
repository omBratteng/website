import { useState } from 'react'

export const getCookie = (key, cookies = document.cookie) =>
	cookies.split('; ').reduce((total, currentCookie) => {
		const item = currentCookie.split('=')
		const storedKey = item[0]
		const storedValue = item[1]

		return key === storedKey ? decodeURIComponent(storedValue) : total
	}, '')

export const setCookie = (key, value, numberOfDays) => {
	const now = new Date()

	// set the time to be now + numberOfDays
	now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)

	document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`
}

/**
 *
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */
export const useCookie = (key, defaultValue) => {
	const getCookie = () => getCookie(key) || defaultValue
	const [cookieState, setCookieState] = useState(getCookie())

	const updateCookie = (value, numberOfDays) => {
		setCookieState(value)
		setCookie(key, value, numberOfDays)
	}

	return [cookieState, updateCookie]
}
