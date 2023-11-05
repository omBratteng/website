'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PageTitle = (): JSX.Element => {
	const pathName = usePathname()

	const subTitle = pathName.substring(1)
	console.log(pathName, subTitle)

	const pageTitle =
		pathName !== '/' ? (
			<Link className="no-bg cursor-pointer px-2 hover:text-[var(--red)] transition" href="/" passHref>
				bratteng.com
			</Link>
		) : (
			<span className="px-2">bratteng.com</span>
		)

	return (
		<h1 className="text-4xl pb-4 font-normal text-center w-full before:content-['~/'] before:text-[var(--red)]">
			{pageTitle}
			{subTitle && (
				<span className="font-bold before:content-['/'] before:text-[var(--red)] before:mr-2">{subTitle}</span>
			)}
		</h1>
	)
}

export { PageTitle }
