import styled from 'styled-components'
import { useTitle } from 'hooks'

import type { GetStaticProps } from 'next'
import type { OffsetTonnes } from 'types/dto'

import { Section } from 'components'
import fetchWrenOffset from 'utils/fetchWrenOffset'

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

export const getStaticProps: GetStaticProps<{ offset: OffsetTonnes }> = async () => {
	return {
		props: {
			offset: await fetchWrenOffset(),
		},
	}
}

export default Page
