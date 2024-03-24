import { Section } from 'components'

const Page = (): JSX.Element => (
	<Section title="About">
		<div className="text-base md:text-xl hyphens-auto" itemScope itemType="https://schema.org/Person">
			<span itemProp="name">Ole-Martin Bratteng</span> &mdash; Software Engineer. Located in the beautiful municipality
			of{' '}
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
)

export default Page
