import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import process from 'process'

const postsDirectory = join(process.cwd(), 'content')

export const getPostSlugs = () => fs.readdirSync(postsDirectory)

export const getPostBySlug = (slug, fields = []) => {
	const realSlug = slug.replace(/\.md$/, '')
	const fullPath = join(postsDirectory, `${realSlug}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf-8')
	const { data, content } = matter(fileContents)

	const items = {}

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === 'slug') {
			items[field] = realSlug
		}

		if (field === 'content') {
			items[field] = content
		}

		if (data[field]) {
			items[field] = data[field]
		}
	})

	return items
}

export const getAllPosts = (fields = []) => {
	const slugs = getPostSlugs()
	const posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		// Sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))

	return posts
}
