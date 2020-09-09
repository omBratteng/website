import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BlogPosts from 'components/BlogPosts'
import Section from 'components/layout/Section'

const SectionContent = styled.div`
	font-size: 1rem;
	hyphens: auto;
	position: relative;

	@media (min-width: 768px) {
		font-size: 1.3rem;
	}
`

const Index = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch('/api/blog/posts')
			.then((response) => response.json())
			.then((response) => setPosts(response.posts))
	}, [])

	return (
		<>
			<Section title="About">
				<SectionContent>
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash;
					Software Developer. Located in the beautiful city of{' '}
					<a href="http://en.wikipedia.org/wiki/Trondheim">
						<span itemProp="address">Trondheim</span>,{' '}
						<span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Developer</span> at{' '}
					<a href="https://www.arkivverket.no/en">
						the National Archives of Norway
					</a>
					.
				</SectionContent>
			</Section>

			<Section title="Blog">
				<SectionContent>
					<BlogPosts posts={posts} />
				</SectionContent>
			</Section>
		</>
	)
}

Index.propTypes = {
	allPosts: PropTypes.arrayOf(PropTypes.object),
}

export const getServerSideProps = async () => ({ props: {} })

export default Index
