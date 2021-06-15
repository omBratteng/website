import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { size } from 'polished'

// Hooks
import { useHover } from '@react-aria/interactions'
import { useFocusRing } from '@react-aria/focus'
import { useApp } from 'hooks'

// Types
import type { IconName } from '@fortawesome/fontawesome-common-types'

type ButtonProps = {
	isHovered: boolean
	isFocused: boolean
}

const Button = styled.button<ButtonProps>`
	${size('2rem')}
	align-items: center;
	background: var(${(props) => (props.isHovered || props.isFocused ? '--global-font-color' : '--global-link-color')});
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

const ToggleTheme = (): JSX.Element => {
	const [icon, setIcon] = useState<IconName>('lightbulb')
	const { hoverProps, isHovered } = useHover({})
	const { focusProps, isFocused } = useFocusRing()
	const { theme, setTheme } = useApp()

	useEffect(() => {
		const lightBulbstate = theme ? 'lightbulb-on' : 'lightbulb-slash'
		isHovered || isFocused ? setIcon(lightBulbstate) : setIcon('lightbulb')
	}, [isFocused, isHovered, setIcon, theme])

	return (
		<Button
			{...hoverProps}
			{...focusProps}
			isHovered={isHovered}
			isFocused={isFocused}
			onClick={() => setTheme((prevState) => !prevState)}
			aria-label={`Toggle colour scheme`}
		>
			<FontAwesomeIcon icon={['fad', icon]} fixedWidth />
		</Button>
	)
}

export default ToggleTheme
