import React, { useState, useLayoutEffect } from 'react'
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

const ToggleTheme = ({ darkMode }) => {
	const [icon, setIcon] = useState('lightbulb')
	const [hover, setHover] = useState(false)

	useLayoutEffect(() => {
		hover
			? setIcon(darkMode.value ? 'lightbulb-on' : 'lightbulb-slash')
			: setIcon('lightbulb')
	}, [hover, setIcon, darkMode])

	return (
		<Button
			onClick={darkMode.toggle}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			aria-label={`Turn ${darkMode.value ? 'off' : 'on'} dark mode`}
		>
			<FontAwesomeIcon icon={['fad', icon]} fixedWidth />
		</Button>
	)
}

ToggleTheme.propTypes = {
	darkMode: PropTypes.object,
}

export default ToggleTheme
