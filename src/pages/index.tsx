import styled from '@emotion/styled'

import type { GetStaticProps } from 'next'

import { Section } from 'components'
import Tool from 'components/Tool'

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
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash; Software Engineer. Located in the beautiful
					municipality of{' '}
					<a href="https://en.wikipedia.org/wiki/Stjørdal">
						<span itemProp="address">Stjørdal</span>, <span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Engineer</span> at{' '}
					<span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
						<a href="https://daily.dev/" itemProp="url">
							<span itemProp="name">Daily Dev</span>
						</a>
					</span>
					.
				</SectionContent>
			</Section>

			<Section title="Tools">
				<Tool name="Docker config secret generator" href="/dockerconfigjson">
					<p>
						A tool that takes generates base64 encoded string that can be used in a{' '}
						<a href="https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets">
							docker-registry
						</a>{' '}
						kubernetes secret.{' '}
						<em>Nothing is stored or sent to the server, everything is generated on the fly on the client</em>
						side. View the source code on{' '}
						<a href="https://github.com/omBratteng/website/blob/develop/src/pages/dockerconfigjson.tsx">GitHub</a>.
					</p>
				</Tool>
			</Section>
		</>
	)
}

export const getStaticProps: GetStaticProps<{ hello: string }> = async () => {
	return {
		props: {
			hello: 'world',
		},
	}
}

export default Index
