import { headers } from 'next/headers'
import type { ReactElement } from 'react'

import { PageTitleLink } from 'components/PageTitleLink'

const PageTitle = async (): Promise<ReactElement> => {
	const host = (await headers()).get('host') ?? 'bratteng.com'
	const hostname = host.split(':')[0]

	return (
		<h1 className="text-4xl pb-4 font-normal text-center w-full before:content-['~/'] before:text-(--red)">
			<PageTitleLink hostname={hostname} />
		</h1>
	)
}

export { PageTitle }
