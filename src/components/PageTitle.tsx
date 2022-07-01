import styled, { css } from 'styled-components'

import Link from 'next/link'
import { useRouter } from 'next/router'

const A = styled.a`
	cursor: pointer;
	padding: 0 0.5rem;
	transition: color 0.3s ease;

	&:hover {
		color: var(--red);
	}
`

const H1 = styled.h1`
	font-size: 2.25rem;
	font-weight: 400;
	margin: 0;
	padding-bottom: 1rem;
	text-align: center;
	width: 100%;

	&::before {
		color: var(--red);
		content: '~/';
		font-style: normal;
	}
`

const Slug = styled.span<Partial<{ isNotHome: boolean }>>`
	${(props) =>
		props.isNotHome
			? css`
					font-weight: bold;

					&::before {
						color: var(--red);
						content: '/';
						font-style: normal;
						font-weight: 400;
						margin-right: 0.5rem;
					}
			  `
			: css`
					padding: 0 0.5rem;
			  `}
`

const PageTitle = (): JSX.Element => {
	const { route, query } = useRouter()

	const subTitle = route === '/404' ? route.substring(1) : query.slug

	const pageTitle =
		route !== '/' ? (
			<Link href="/" passHref>
				<A className="no-bg">bratteng.com</A>
			</Link>
		) : (
			<Slug>bratteng.com</Slug>
		)
	return (
		<H1>
			{pageTitle}
			{subTitle && <Slug isNotHome={route !== '/'}>{subTitle}</Slug>}
		</H1>
	)
}

export default PageTitle
