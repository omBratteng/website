import type { IconName } from '@fortawesome/fontawesome-common-types'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { size } from 'polished'

import { useHover } from '@react-aria/interactions'
import { useFocusRing } from '@react-aria/focus'
import { DarkMode } from 'use-dark-mode'

interface Button {
	isHovered: boolean
	isFocused: boolean
}
const Button = styled.button<Button>`
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

interface Props {
	darkMode: DarkMode
}
const ToggleTheme = ({ darkMode }: Props): JSX.Element => {
	const [icon, setIcon] = useState<IconName>('lightbulb')
	const { hoverProps, isHovered } = useHover({})
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

export default ToggleTheme
