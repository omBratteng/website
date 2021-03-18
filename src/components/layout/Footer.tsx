import styled from 'styled-components'

import { useEffect, useState } from 'react'

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
	const [offset, setOffset] = useState<string | null>('0.00')
	useEffect(() => {
		fetch('/api/offsetTonnes', {
			method: 'HEAD',
		}).then(({ headers }) => setOffset(headers.get('X-Offset-Tonnes')))
	}, [])
	return (
		<>
			<StyledFooter>
				So far I have offset a total of {offset} tons of CO
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
