import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledSection = styled.section`
	display: flex;
	flex-wrap: wrap;
	padding: 1rem 0;

	&:first-of-type {
		padding-top: 0;
	}

	&:last-of-type {
		padding-bottom: 0;
	}
`

const Title = styled.h2`
	font-size: 1.5rem;
	margin: 0 0 1rem;
	width: 100%;

	@media (min-width: 768px) {
		font-size: 2rem;
	}
`

const Hashtag = styled(FontAwesomeIcon)`
	color: var(--red);
	margin-right: 0.75rem;
	max-width: 1.25rem;
	vertical-align: -0.125em;

	@media (min-width: 768px) {
		max-width: 1.75rem;
	}
`

interface Props {
	title: string
	children: ReactNode
}

const Section = ({ children, title }: Props): JSX.Element => (
	<StyledSection>
		{title && (
			<Title>
				<Hashtag icon={['far', 'hashtag']} fixedWidth />
				{title}
			</Title>
		)}
		{children}
	</StyledSection>
)

export default Section
