import { useEffect } from 'react'

// Components
import Markdown from 'components/Markdown'

// Misc
import markdownToHTML from 'lib/markdownToHTML'
import { useLayout } from 'components/layout/Layout'
import type { GetStaticProps } from 'next'

interface Props {
	post: {
		title: string
		content: string
	}
}

const Index = ({ post }: Props): JSX.Element => {
	const { setPageTitle } = useLayout()

	useEffect(() => {
		if (setPageTitle) setPageTitle(post.title)
	}, [setPageTitle, post])

	return <Markdown title={post.title} content={post.content} />
}

export const getStaticProps: GetStaticProps = async () => {
	const title = "Hei! I'm Ole-Martin 👋"
	const content = await markdownToHTML(`Heisann, thanks for checking the blog! I'm Ole-Martin, a software developer at [the National Archives of Norway](https://www.arkivverket.no/en).

If you happen to read this and find my posts interesting, just [let me know](https://twitter.com/omBratteng)! Will be happy to have a chat with you around a coffee ☕️ (or red wine 🍷?).`)

	return {
		props: {
			post: {
				title,
				content,
			},
		},
	}
}

export default Index
