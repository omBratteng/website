import { useApp } from 'hooks'
import Head from 'next/head'

const useTitle = (pageTitle = ''): JSX.Element => {
	const { siteTitle } = useApp()

	return (
		<Head>
			<title>{pageTitle ? `${pageTitle} – ${siteTitle}` : siteTitle}</title>
		</Head>
	)
}

export default useTitle
