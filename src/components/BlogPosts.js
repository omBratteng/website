import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Link from 'next/link'

const List = styled.ul`
	list-style-type: none;
	margin: 0;
	padding-left: 0;
`

const BlogPosts = ({ posts }) => {
	return (
		<List>
			{posts.map((post) => (
				<li key={post.slug}>
					<Link as={`blog/${post.slug}`} href="/blog/[slug]">
						<a>{post.title}</a>
					</Link>
				</li>
			))}
		</List>
	)
}

BlogPosts.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object),
}

export default BlogPosts
