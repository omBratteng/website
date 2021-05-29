import styled from 'styled-components'
import useSWR from 'swr'

import type { OffsetTonnes } from 'pages/api/offsetTonnes'

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
	const { data } = useSWR<OffsetTonnes>('/api/offsetTonnes')

	return (
		<>
			<StyledFooter>
				So far I have offset a total of {data?.offsetTonnes ?? '00.00'} tons of CO
				<sub>2</sub> with{' '}
				<a href="https://www.wren.co/join/omBratteng?utm_campaign=share&utm_medium=profile_referral_link">
					Project Wren
				</a>
				.
			</StyledFooter>
		</>
	)
}

export default Footer
