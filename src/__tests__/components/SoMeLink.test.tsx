import { render } from 'test-utils'

import SoMeLink from 'components/SoMeLink'

describe('<PageTitle />', () => {
	test('It renders', () => {
		const props = {
			href: 'https://example.com',
			alt: 'This is the alt text',
			hoverColor: '#147e4e',
		}
		const { container } = render(<SoMeLink icon="github" {...props} />)
		const svg = (container.firstChild as Element).querySelector('svg')

		expect(container.firstChild).toMatchSnapshot()
		expect(container.firstChild).toHaveTextContent('This is the alt text')
		expect(container.firstChild).toHaveAttribute('href', 'https://example.com')
		expect(container.firstChild).toHaveStyleRule('font-size', '3.25rem', {
			media: '(min-width: 768px)',
		})
		expect(svg).not.toHaveStyleRule('left', '2px', {
			media: '(min-width: 768px)',
		})
	})

	test('It renders when small', () => {
		const props = {
			href: 'https://example.com',
			alt: 'This is the alt text',
			hoverColor: '#147e4e',
			small: true,
		}
		const { container } = render(<SoMeLink icon="github" {...props} />)

		expect(container.firstChild).toMatchSnapshot()
		expect(container.firstChild).toHaveStyleRule('font-size', '1.75rem', {
			media: '(min-width: 768px)',
		})
	})

	test('It applies the correct css if icon is "twitter"', () => {
		const props = {
			href: 'https://example.com',
			alt: 'This is the alt text',
			hoverColor: '#147e4e',
		}
		const { container } = render(<SoMeLink icon="twitter" {...props} />)
		const svg = (container.firstChild as Element).querySelector('svg')

		expect(container.firstChild).toMatchSnapshot()
		expect(svg).toHaveStyleRule('left', '2px', {
			media: '(min-width: 768px)',
		})
	})
})
