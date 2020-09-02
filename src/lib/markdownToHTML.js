import remark from 'remark'
import html from 'remark-html'

const markdownToHTML = async (markdown) => {
	const result = await remark().use(html).process(markdown)
	return result.toString()
}

export default markdownToHTML
