import type { ReactNode } from 'react'
import styled from 'styled-components'

import PageTitle from 'components/PageTitle'
import SoMeLink from 'components/SoMeLink'
import ToggleTheme from 'components/ToggleTheme'
import Footer from 'components/layout/Footer'

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: fill-available;
`

const Main = styled.main`
	align-self: center;
	margin: 5rem 0;
	max-width: 700px;
	padding: 0 1.25rem;
	width: 100%;

	@media (min-width: 768px) {
		padding: 0;
	}
`

const SocialMedia = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	font-size: 4rem;
	justify-content: center;
	margin-bottom: 1rem;
	padding: 1rem 0;
`

interface Props {
	children: ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
	return (
		<StyledLayout>
			<Main>
				<PageTitle />
				<SocialMedia>
					<ToggleTheme />

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
			<Footer />
		</StyledLayout>
	)
}

export default Layout
