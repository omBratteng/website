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

		expect(container.firstChild).toMatchSnapshot()
	})
})
