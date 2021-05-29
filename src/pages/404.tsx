import styled from 'styled-components'
import { useTitle } from 'hooks'
import Link from 'next/link'

import { Section } from 'components'

const SectionContent = styled.div`
	font-size: 1rem;
	hyphens: auto;

	@media (min-width: 768px) {
		font-size: 1.3125rem;
	}
`

const Page404 = (): JSX.Element => (
	<>
		{useTitle('404')}
		<Section title="404">
			<SectionContent>
				<p>
					This page is missing, or you assembled the link incorrectly. Don&apos;t worry, you can return to browsing
					just by <Link href="/">going home</Link>
				</p>
			</SectionContent>
		</Section>
	</>
)

export default Page404
