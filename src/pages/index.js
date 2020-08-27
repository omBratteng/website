import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const Section = styled.section``
const SectionTitle = styled.h2`
	font-size: 2rem;
`

const SectionContent = styled.div`
	font-size: 1.3rem;
	hyphens: auto;
`

const Index = () => {
	return (
		<>
			<PageTitle>bratteng.sh</PageTitle>

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
