import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorPage from 'next/error'

// Hookes
import { useRouter } from 'next/router'

// Components
import Markdown from 'components/Markdown'

// Misc
import markdownToHTML from 'lib/markdownToHTML'
import { getPostBySlug, getAllPosts } from 'lib/getPost'
import { useLayout } from 'components/layout/Layout'

const Index = ({ post }) => {
	const router = useRouter()
	const { setPageTitle } = useLayout()

	useEffect(() => {
		setPageTitle(post.title)
	}, [setPageTitle, post])

	return !post?.slug ? (
		<ErrorPage statusPage={404} />
	) : router.isFallback ? (
		<div>Loading...</div>
	) : (
		<Markdown title={post.title} content={post.content} />
	)
}

Index.propTypes = {
	post: PropTypes.object,
}

export const getStaticProps = async ({ params }) => {
	const post = getPostBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
		'ogImage',
		'coverImage',
	])

	const content = await markdownToHTML(post.content || '')

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	}
}

export const getStaticPaths = async () => {
	const posts = getAllPosts(['slug'])

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			}
		}),
		fallback: false,
	}
}

export default Index
