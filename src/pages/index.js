import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SoMeLink from 'components/SoMeLink'

const PageTitle = styled.h1`
	flex-grow: 0;
	font-size: 2.5rem;
	font-weight: 500;
	text-align: center;
	width: 100%;

	&::before {
		color: #da4d5e;
		content: '~/';
		font-style: normal;
		font-weight: 500;
	}
`

const Hashtag = styled(FontAwesomeIcon)`
	color: #da4d5e;
	margin-right: 0.75rem;
	max-width: 1.75rem;
	vertical-align: -0.125em;
`

const Section = styled.section`
	display: flex;
	flex-wrap: wrap;
`
const SectionTitle = styled.h2`
	font-size: 2rem;
	width: 100%;
`

const SectionContent = styled.div`
	font-size: 1.3rem;
	hyphens: auto;
`

const SocialMedia = styled(Section)`
	align-items: center;
	font-size: 4rem;
	justify-content: center;
`

const Index = () => {
	return (
		<>
			<PageTitle>bratteng.sh</PageTitle>

			<SocialMedia>
				<SoMeLink
					href="https://github.com/omBratteng"
					alt="Ole-Martin Bratteng on GitHub"
					hoverColor="#fff"
					icon="github-alt"
				/>

				<SoMeLink
					href="https://twitter.com/omBratteng"
					alt="Ole-Martin Bratteng on Twitter"
					hoverColor="#1da1f2"
					icon="twitter"
				/>

				<SoMeLink
					href="https://www.linkedin.com/in/ombratteng/"
					alt="Ole-Martin Bratteng on LinkedIn"
					hoverColor="#1683bb"
					small={true}
					icon="linkedin-in"
				/>
			</SocialMedia>

			<Section>
				<SectionTitle>
					<Hashtag icon={['far', 'hashtag']} />
					About
				</SectionTitle>

				<SectionContent>
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash;
					Software Developer. Located in the beautiful city of{' '}
					<a href="http://en.wikipedia.org/wiki/Trondheim">
						<span itemProp="address">Trondheim</span>,{' '}
						<span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Developer</span> at{' '}
					<a href="https://www.arkivverket.no/en">
						the National Archives of Norway
					</a>
					.
				</SectionContent>
			</Section>
		</>
	)
}

export default Index
