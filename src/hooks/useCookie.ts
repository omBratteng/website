import { useState } from 'react'

/**
 * @param key The cookie key we want
 * @param cookies String of cookies, defaults to document.cookie
 */
export const getCookie = (
	key: string,
	cookies: string = document.cookie,
): string =>
	cookies.split('; ').reduce((total, currentCookie) => {
		const item = currentCookie.split('=')
		const storedKey = item[0]
		const storedValue = item[1]

		return key === storedKey ? decodeURIComponent(storedValue) : total
	}, '')

/**
 * @param key The key to store our data to
 * @param value The value of our cookie
 * @param numberOfDays The amount of days for the cookie, defaults to 14 days
 */
export const setCookie = (
	key: string,
	value: string | boolean | number,
	numberOfDays = 14,
): void => {
	const now = new Date()

	// set the time to be now + numberOfDays
	now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)

	document.cookie = `${key}=${value}; expires=${now.toUTCString()}; sameSite=strict; path=/`
}

type UpdateCooke = (value: string, numberOfDays?: number) => void

/**
 * @param key The key to store our data to
 * @param defaultValue The default value to return in case the cookie doesn't exist
 */
export const useCookie = (
	key: string,
	defaultValue: string,
): [string, UpdateCooke] => {
	const [cookieState, setCookieState] = useState(
		getCookie(key) || defaultValue,
	)

	const updateCookie: UpdateCooke = (value, numberOfDays): void => {
		setCookieState(value)
		setCookie(key, value, numberOfDays)
	}

	return [cookieState, updateCookie]
}
