import styled from '@emotion/styled'

import { PageTitle, SoMeLink, ToggleTheme } from 'components'

const SocialMedia = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	font-size: 4rem;
	justify-content: center;
	margin-bottom: 1rem;
	padding: 1rem 0;
`

const Header = (): JSX.Element => {
	return (
		<>
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
		</>
	)
}

export default Header
