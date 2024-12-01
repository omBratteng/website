import type { PropsWithChildren, ReactElement } from 'react'

type Props = {
	title: string
} & PropsWithChildren

const Section = ({ children, title }: Props): ReactElement => (
	<section className="flex flex-wrap px-4 mb-8 first-of-type:pt-0 last-of-type:pb-0 last-of-type:mb-0">
		{title && (
			<h2 className="mb-4 w-full text-2xl md:text-3xl">
				{/* <Hashtag icon={['far', 'hashtag']} fixedWidth /> */}
				{title}
			</h2>
		)}
		{children}
	</section>
)

export { Section }
