import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Next.js
import Head from 'next/head'

import PageTitle from 'components/PageTitle'
import SoMeLink from 'components/SoMeLink'
import ToggleTheme from 'components/ToggleTheme'
import { useApp } from 'contexts/app'

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
	min-height: fill-available;
`

const Main = styled.main`
	align-self: center;
	margin: 5rem 0;
	max-width: 700px;
	padding: 0 1.5rem;
	width: 100%;

	@media (min-width: 768px) {
		padding: 0;
	}
`

const SocialMedia = styled.section`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	font-size: 4rem;
	justify-content: center;
	padding: 1rem 0;
`

const Layout = ({ siteTitle, children }) => {
	const [pageTitle, setPageTitle] = useState(undefined)
	const [title, setTitle] = useState(siteTitle)
	const { darkMode } = useApp()

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
					<Main>
						<PageTitle />
						<SocialMedia>
							<ToggleTheme darkMode={darkMode} />

							<SoMeLink
								href="https://github.com/omBratteng"
								alt="Ole-Martin Bratteng on GitHub"
								hoverColor="github"
								icon="github-alt"
							/>

							<SoMeLink
								href="https://twitter.com/omBratteng"
								alt="Ole-Martin Bratteng on Twitter"
								hoverColor="twitter"
								icon="twitter"
							/>

							<SoMeLink
								href="https://www.linkedin.com/in/ombratteng/"
								alt="Ole-Martin Bratteng on LinkedIn"
								hoverColor="linkedin"
								small={true}
								icon="linkedin-in"
							/>
						</SocialMedia>
						{children}
					</Main>
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
