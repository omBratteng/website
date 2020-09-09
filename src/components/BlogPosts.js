import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentLoader from 'react-content-loader'

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

const BlogPosts = ({ posts }) => {
	return posts.length > 0 ? (
		<List>
			{posts.map((post) => (
				<Li key={post.slug}>
					<Link as={`blog/${post.slug}`} href="/blog/[slug]">
						<a>{post.title}</a>
					</Link>
				</Li>
			))}
		</List>
	) : (
		<ContentLoader
			uniqueKey="50afad62-aria"
			speed={3}
			width={280}
			height={150}
			viewBox="0 0 280 150"
			backgroundColor="var(--contentLoader-bg)"
			foregroundColor="var(--contentLoader-fg)"
		>
			<rect x="0" y="6" rx="3" ry="0" width="280" height="20" />
			<rect x="0" y="45" rx="3" ry="0" width="200" height="20" />
			<rect x="0" y="84" rx="3" ry="0" width="260" height="20" />
			<rect x="0" y="123" rx="3" ry="0" width="155" height="20" />
		</ContentLoader>
	)
}

BlogPosts.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object),
}

export default BlogPosts
