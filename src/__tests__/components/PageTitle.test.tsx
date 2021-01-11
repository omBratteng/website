import { render } from 'test-utils'

import PageTitle from 'components/PageTitle'

jest.mock('next/router', () => ({
	useRouter: () => {},
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('<PageTitle />', () => {
	test('It renders', () => {
		useRouter.mockImplementation(() => ({
			route: '/',
			query: '',
		}))
		const { container } = render(<PageTitle />)

		expect(container.firstChild).toMatchSnapshot()
		expect(container.firstChild).toHaveTextContent('bratteng.sh')
		expect(container.firstChild).not.toHaveTextContent('another-page')
	})

	test('It renders with a slug', () => {
		useRouter.mockImplementation(() => ({
			route: '/another-page',
			query: {
				slug: 'another-page',
			},
		}))
		const { container } = render(<PageTitle />)

		expect(container.firstChild).toMatchSnapshot()
		expect(container.firstChild).toHaveTextContent('bratteng.sh')
		expect(container.firstChild).toHaveTextContent('another-page')
	})

	test('It renders with a slug when in a 404 page', () => {
		useRouter.mockImplementation(() => ({
			route: '/404',
			query: '',
		}))
		const { container } = render(<PageTitle />)

		expect(container.firstChild).toMatchSnapshot()
		expect(container.firstChild).toHaveTextContent('bratteng.sh')
		expect(container.firstChild).toHaveTextContent('404')
	})
})
