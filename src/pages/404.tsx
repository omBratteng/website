import styled from 'styled-components'
import { useTitle } from 'hooks'
import Link from 'next/link'

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

export const getStaticProps: GetStaticProps<{ offset: OffsetTonnes }> = async () => {
	return {
		props: {
			offset: await fetchWrenOffset(),
		},
	}
}

export default Page
