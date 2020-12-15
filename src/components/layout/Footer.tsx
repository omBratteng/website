import styled from 'styled-components'
import { useApp } from 'contexts/app'

const StyledFooter = styled.footer`
	align-self: center;
	font-size: 0.8rem;
	margin-top: auto;
	max-width: 700px;
	padding: 0 1.25rem;
	width: 100%;
`

const Footer = (): JSX.Element => {
	const { offsetTonnes } = useApp()

	return (
		<>
			<StyledFooter>
				I have offset a total of {offsetTonnes} tons of CO<sub>2</sub>{' '}
				with{' '}
				<a href="https://www.wren.co/join/omBratteng?utm_campaign=share&utm_medium=profile_referral_link">
					Project Wren
				</a>
			</StyledFooter>
		</>
	)
}

export default Footer