import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { size } from 'polished'

const Link = styled.a`
	${size('2rem')}
	align-items: center;
	background: var(--global-link-color);
	border-radius: 100%;
	color: var(--global-background-color);
	display: flex;
	font-size: 1.25rem;
	justify-content: center;
	margin: 0 0.5rem;
	transition: all 0.5s ease;

	&:hover {
		background: ${(props) => props.hoverColor ?? props.hoverColor};
	}

	span {
		font-size: 0;
	}

	@media (min-width: 768px) {
		font-size: ${(props) => (props.small ? '1.75rem' : '3.25rem')};
		margin: 0 1rem;
		${(props) => size(props.small ? '3rem' : '5rem')}
	}
`

const Icon = styled(FontAwesomeIcon)`
	@media (min-width: 768px) {
		${(props) =>
			props.icon[1] === 'twitter' &&
			css`
				left: 2px;
				position: relative;
				top: 2px;
			`}
	}
`

const SoMeLink = ({ href, alt, hoverColor, small, icon }) => {
	return (
		<Link
			href={href}
			alt={alt}
			className="no-bg"
			hoverColor={hoverColor}
			small={small}
		>
			<Icon icon={['fab', icon]} />
			<span>{alt}</span>
		</Link>
	)
}

SoMeLink.propTypes = {
	href: PropTypes.string,
	alt: PropTypes.string,
	hoverColor: PropTypes.string,
	small: PropTypes.bool,
	icon: PropTypes.string,
}

export default SoMeLink
