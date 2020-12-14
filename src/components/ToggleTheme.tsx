import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { size } from 'polished'

import { useHover } from '@react-aria/interactions'
import { useFocusRing } from '@react-aria/focus'

const Button = styled.button`
	${size('2rem')}
	align-items: center;
	background: var(
		${(props) =>
			props.isHovered || props.isFocused
				? '--global-font-color'
				: '--global-link-color'}
	);
	border: 0;
	border-radius: 100%;
	color: var(--global-background-color);
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	justify-content: center;
	margin: 0 0.5rem;
	transition: all 0.5s ease;

	&:focus {
		box-shadow: 0px 0px 0px 2px #005fcc;
		outline: 0;
	}

	@media (min-width: 768px) {
		font-size: 1.75rem;
		margin: 0 1rem;
		${size('3rem')}
	}
`

const ToggleTheme = ({ darkMode }) => {
	const [icon, setIcon] = useState('lightbulb')
	const { hoverProps, isHovered } = useHover(false)
	const { focusProps, isFocused } = useFocusRing()

	useEffect(() => {
		isHovered || isFocused
			? setIcon(darkMode.value ? 'lightbulb-on' : 'lightbulb-slash')
			: setIcon('lightbulb')
	}, [isFocused, isHovered, setIcon, darkMode])

	return (
		<Button
			{...hoverProps}
			{...focusProps}
			isHovered={isHovered}
			isFocused={isFocused}
			onClick={darkMode.toggle}
			aria-label={`Toggle colour scheme`}
		>
			<FontAwesomeIcon icon={['fad', icon]} fixedWidth />
		</Button>
	)
}

ToggleTheme.propTypes = {
	darkMode: PropTypes.object,
}

export default ToggleTheme
