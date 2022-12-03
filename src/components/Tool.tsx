import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;

	&:last-child {
		margin-bottom: 0;
	}

	p:first-of-type {
		margin-top: 0;
	}

	p:last-of-type {
		margin-bottom: 0;
	}
`

const Title = styled(Link)`
	font-size: 1.5em;
	margin: 0 0 0.5rem;
`

type Props = {
	name: string
	href: string
}

const Tool = ({ name, href, children }: PropsWithChildren<Props>): JSX.Element => {
	return (
		<Wrapper>
			<Title href={href} passHref>
				{name}
			</Title>
			{children}
		</Wrapper>
	)
}

export default Tool
