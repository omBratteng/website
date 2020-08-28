import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { size } from 'polished'

import { useHover } from '@react-aria/interactions'

const Button = styled.button`
	${size('2rem')}
	align-items: center;
	background: var(
		${(props) =>
			props.isHovered ? '--global-font-color' : '--global-link-color'}
	);
	border: 0;
	border-radius: 100%;
	color: var(--global-background-color);
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	justify-content: center;
	margin: 0 0.5rem;
	transition: background 0.3s ease;

	@media (min-width: 768px) {
		font-size: 1.75rem;
		margin: 0 1rem;
		${size('3rem')}
	}
`

const ToggleTheme = ({ darkMode }) => {
	const [icon, setIcon] = useState('lightbulb')
	const { hoverProps, isHovered } = useHover(false)

	useEffect(() => {
		isHovered
			? setIcon(darkMode.value ? 'lightbulb-on' : 'lightbulb-slash')
			: setIcon('lightbulb')
	}, [isHovered, setIcon, darkMode])

	return (
		<Button
			{...hoverProps}
			isHovered={isHovered}
			onClick={darkMode.toggle}
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
