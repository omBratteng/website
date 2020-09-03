import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
	max-width: 1.75rem;
	vertical-align: -0.125em;
`

const Section = ({ children, title }) => (
	<StyledSection>
		{title && (
			<Title>
				<Hashtag icon={['far', 'hashtag']} />
				{title}
			</Title>
		)}
		{children}
	</StyledSection>
)

Section.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.node,
		PropTypes.string,
	]).isRequired,
}

export default Section
