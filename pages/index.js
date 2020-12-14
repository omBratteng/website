import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import BlogPosts from 'components/BlogPosts'
import Section from 'components/layout/Section'

import { getAllPosts } from 'lib/getPost'

const SectionContent = styled.div`
	font-size: 1rem;
	hyphens: auto;

	@media (min-width: 768px) {
		font-size: 1.3rem;
	}
`

const Index = ({ allPosts }) => {
	return (
		<>
			<Section title="About">
				<SectionContent itemScope itemType="http://schema.org/Person">
					<span itemProp="name">Ole-Martin Bratteng</span> &mdash;
					Software Developer. Located in the beautiful city of{' '}
					<a href="http://en.wikipedia.org/wiki/Trondheim">
						<span itemProp="address">Trondheim</span>,{' '}
						<span itemProp="nationality">Norway</span>
					</a>
					. <span itemProp="jobTitle">Software Developer</span> at{' '}
					<span
						itemProp="worksFor"
						itemScope
						itemType="http://schema.org/Organization"
					>
						<a href="https://www.arkivverket.no/en" itemProp="url">
							<span itemProp="name">
								the National Archives of Norway
							</span>
						</a>
					</span>
					.
				</SectionContent>
			</Section>

			{/* {allPosts.length > 0 && (
				<Section title="Blog">
					<SectionContent>
						<BlogPosts posts={allPosts} />
					</SectionContent>
				</Section>
			)} */}
		</>
	)
}

Index.propTypes = {
	allPosts: PropTypes.arrayOf(PropTypes.object),
}

export const getServerSideProps = async () => ({
	props: { allPosts: getAllPosts(['title', 'date', 'slug']) },
})

export default Index
