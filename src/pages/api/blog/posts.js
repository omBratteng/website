import { getAllPosts } from 'lib/getPost'

const Posts = (req, res) => {
	return res.status(200).json({
		posts: getAllPosts(['title', 'date', 'slug']),
	})
}

export default Posts
