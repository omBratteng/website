import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Next.js
import Head from 'next/head'

const LayoutContext = createContext(undefined)
const useLayout = () => {
	const context = useContext(LayoutContext)

	if (context === undefined) {
		throw new Error('useContext must be used within a LayoutContext')
	}

	return context
}

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`

const Main = styled.main`
	display: flex;
	flex: 1;
	flex-direction: column;

	@media (min-width: 900px) {
		flex-direction: row;
	}
`

const Layout = ({ siteTitle, children }) => {
	const [pageTitle, setPageTitle] = useState(undefined)
	const [title, setTitle] = useState(siteTitle)

	useEffect(() => {
		setTitle(pageTitle ? `${pageTitle} – ${siteTitle}` : siteTitle)
	}, [pageTitle, siteTitle])

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<LayoutContext.Provider value={{ pageTitle, setPageTitle }}>
				<StyledLayout>
					<Main>{children}</Main>
				</StyledLayout>
			</LayoutContext.Provider>
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node,
	siteTitle: PropTypes.string,
}

Layout.defaultProps = {
	siteTitle: '',
}

export default Layout
export { useLayout }
