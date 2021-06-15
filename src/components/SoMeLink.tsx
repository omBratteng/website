import type { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hideVisually, size } from 'polished'

type LinkProps = {
	hoverColor: string
	small?: boolean
}
const Link = styled.a<LinkProps>`
	${size('2rem')}
	align-items: center;
	background: var(--global-link-color);
	border-radius: 100%;
	color: var(--global-background-color);
	display: flex;
	font-size: 1.25rem;
	justify-content: center;
	margin: 0 0.5rem;
	outline: 0;
	transition: all 0.5s ease;

	&:focus,
	&:hover {
		background: var(--${(props) => props.hoverColor}-hover-color);
	}

	&:focus {
		box-shadow: 0px 0px 0px 2px #005fcc;
		outline: 0;
	}

	span {
		${hideVisually()}
	}

	@media (min-width: 768px) {
		font-size: ${(props) => (props.small ? '1.75rem' : '3.25rem')};
		margin: 0 1rem;
		${(props) => size(props.small ? '3rem' : '5rem')}
	}
`

const Icon = styled(FontAwesomeIcon)<{ icon: [IconPrefix, IconName] }>`
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

interface Props {
	href: string
	alt: string
	hoverColor: string
	icon: IconName
	small?: boolean
}

const SoMeLink = ({ href, alt, hoverColor, small, icon }: Props): JSX.Element => {
	return (
		<Link href={href} className="no-bg" hoverColor={hoverColor} small={small}>
			<Icon icon={['fab', icon]} fixedWidth />
			<span>{alt}</span>
		</Link>
	)
}

export default SoMeLink
