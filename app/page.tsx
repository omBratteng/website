import type { ReactElement } from 'react'
import { Section } from 'components/Section'

const Page = (): ReactElement => (
	<Section title="About">
		<div className="text-base md:text-xl hyphens-auto" itemScope itemType="https://schema.org/Person">
			<span itemProp="name">Ole-Martin Bratteng</span> &mdash; <span itemProp="jobTitle">Senior Advisor</span> and{' '}
			<span itemProp="jobTitle">Team Architect</span> at{' '}
			<span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
				<a href="https://www.skatteetaten.no/" itemProp="url">
					<span itemProp="name">The Norwegian Tax Administration</span>
				</a>
			</span>
			. Located in the beautiful municipality of{' '}
			<a href="https://en.wikipedia.org/wiki/Stjørdal">
				<span itemProp="homeLocation" itemScope itemType="https://schema.org/Place">
					<span itemProp="name">Stjørdal</span>
				</span>
			</a>
			,{' '}
			<a href="https://en.wikipedia.org/wiki/Norway">
				<span itemProp="nationality">Norway</span>
			</a>
			.
		</div>
	</Section>
)

export default Page
