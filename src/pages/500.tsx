import styled from '@emotion/styled'
import { useTitle } from 'hooks'

import { Section } from 'components'

const SectionContent = styled.div`
	font-size: 1rem;
	hyphens: auto;

	@media (min-width: 768px) {
		font-size: 1.3125rem;
	}
`

const Page = (): JSX.Element => (
	<>
		{useTitle('500')}
		<Section title="500">
			<SectionContent>
				<p>Internal Server Error</p>
			</SectionContent>
		</Section>
	</>
)

export default Page
