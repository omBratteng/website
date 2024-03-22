import { Metadata } from 'next'
import { Section } from 'components'

export const metadata: Metadata = {
	title: 'bratteng \u00B7 com',
}

const Page = (): JSX.Element => {
	return (
		<>
			<Section title="About">
				<div className="text-base md:text-xl hyphens-auto" itemScope itemType="https://schema.org/Person">
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash; Software Engineer. Located in the beautiful
					municipality of{' '}
					<a href="https://en.wikipedia.org/wiki/Stjørdal">
						<span itemProp="address">Stjørdal</span>, <span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Engineer</span> at{' '}
					<span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
						<a href="https://daily.dev/?ref=bratteng.com" itemProp="url">
							<span itemProp="name">Daily Dev</span>
						</a>
					</span>
					.
				</div>
			</Section>
			<Section title="Testing wildcard preview domain">
				<div className="text-base md:text-xl hyphens-auto">
					<p>Testing wildcard preview domain. This is a test to see if the preview domain works as expected.</p>
				</div>
			</Section>
		</>
	)
}

export default Page
