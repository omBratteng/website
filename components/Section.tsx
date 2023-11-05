import type { ReactNode } from 'react'

interface Props {
	title: string
	children: ReactNode
}

const Section = ({ children, title }: Props): JSX.Element => (
	<section className="flex flex-wrap px-4 first-of-type:pt-0 last-of-type:pb-0">
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
