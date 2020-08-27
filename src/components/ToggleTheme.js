import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { size } from 'polished'

const Button = styled.button`
	${size('3rem')}
	align-items: center;
	background: var(--global-link-color);
	border: 0;
	border-radius: 100%;
	color: var(--global-background-color);
	cursor: pointer;
	display: flex;
	font-size: 1.75rem;
	justify-content: center;
	margin: 0 1rem;
	transition: background 0.3s ease;

	&:hover {
		background: var(--global-font-color);
	}
`

const ToggleTheme = ({ darkMode }) => (
	<Button onClick={darkMode.toggle} aria-label="Toggle dark mode on or off">
		<FontAwesomeIcon icon={['fas', darkMode.value ? 'sun' : 'moon']} />
	</Button>
)

ToggleTheme.propTypes = {
	darkMode: PropTypes.object,
}

export default ToggleTheme
