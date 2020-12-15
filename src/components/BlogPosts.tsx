import styled from 'styled-components'

import Link from 'next/link'

const List = styled.ul`
	list-style-type: none;
	margin: 0;
	padding-left: 0;
`

const Li = styled.li`
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`

interface Props {
	posts: []
}

const BlogPosts = ({ posts }: Props): JSX.Element => {
	return posts.length > 0 ? (
		<List>
			{posts.map((post: { [key: string]: string }) => (
				<Li key={post.slug}>
					<Link href={`/blog/${post.slug}`}>
						<a>{post.title}</a>
					</Link>
				</Li>
			))}
		</List>
	) : (
		<></>
	)
}

export default BlogPosts
