import styled from 'styled-components'

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

export const config = { amp: false }

const Index = (): JSX.Element => {
	return (
		<>
			<Section title="About">
				<SectionContent itemScope itemType="https://schema.org/Person">
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash; Software Developer. Located in the beautiful city
					of{' '}
					<a href="https://en.wikipedia.org/wiki/Trondheim">
						<span itemProp="address">Trondheim</span>, <span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Developer</span> at{' '}
					<span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
						<a href="https://www.arkivverket.no/en" itemProp="url">
							<span itemProp="name">the National Archives of Norway</span>
						</a>
					</span>
					.
				</SectionContent>
			</Section>
		</>
	)
}

export const getStaticProps: GetStaticProps<{ offset: OffsetTonnes }> = async () => {
	return {
		props: {
			offset: await fetchWrenOffset(),
		},
	}
}

export default Index
