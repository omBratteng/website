import type { GetStaticProps } from 'next'
import styled from 'styled-components'

import Section from 'components/layout/Section'

const SectionContent = styled.div`
	font-size: 1rem;
	hyphens: auto;

	@media (min-width: 768px) {
		font-size: 1.3rem;
	}
`

const Index = (): JSX.Element => {
	return (
		<>
			<Section title="About">
				<SectionContent itemScope itemType="http://schema.org/Person">
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash;
					Software Developer. Located in the beautiful city of{' '}
					<a href="http://en.wikipedia.org/wiki/Trondheim">
						<span itemProp="address">Trondheim</span>,{' '}
						<span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Developer</span> at{' '}
					<span
						itemProp="worksFor"
						itemScope
						itemType="http://schema.org/Organization"
					>
						<a href="https://www.arkivverket.no/en" itemProp="url">
							<span itemProp="name">
								the National Archives of Norway
							</span>
						</a>
					</span>
					.
				</SectionContent>
			</Section>
		</>
	)
}

export const getServerSideProps: GetStaticProps = async () => ({
	props: {},
})

export default Index
