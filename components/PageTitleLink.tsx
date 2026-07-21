'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

const PageTitleLink = ({ hostname }: { hostname: string }): ReactElement => {
	const pathName = usePathname()
	const subTitle = pathName.substring(1)

	return (
		<>
			{pathName !== '/' ? (
				<Link className="no-bg cursor-pointer px-2 hover:text-(--red) transition" href="/" passHref>
					{hostname}
				</Link>
			) : (
				<span className="px-2">{hostname}</span>
			)}
			{subTitle && (
				<span className="font-bold before:content-['/'] before:text-(--red) before:mr-2">{subTitle}</span>
			)}
		</>
	)
}

export { PageTitleLink }
