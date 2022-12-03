import styled from 'styled-components'

const StyledFooter = styled.footer`
	align-self: center;
	font-size: 0.8125rem;
	letter-spacing: 1.15px;
	margin-top: auto;
	max-width: 700px;
	padding: 0 1.25rem;
	width: 100%;

	html._fonts & {
		letter-spacing: 1px;
	}
`

const Footer = (): JSX.Element => {
	return <StyledFooter />
}

export default Footer
