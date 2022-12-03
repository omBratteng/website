import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Section } from 'components'

const SectionContent = styled.div`
	display: grid;
	grid-row-gap: 0.5rem;
	grid-template-columns: 100px auto;
	width: 100%;

	p {
		margin: 0;
	}
`

const Input = styled.input`
	background-color: rgba(255, 255, 255, 0.05);
	border: none;
	color: ${({ theme }) => theme.colors.font};
	padding: 0.5rem;
	width: 100%;

	&:focus {
		box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.red};
		outline: none;
	}
`

const Button = styled.button`
	appearance: none;
	background: ${({ theme }) => theme.colors.red};
	border: none;
	color: ${({ theme }) => theme.colors.font};
	cursor: pointer;
	font-size: 1.5rem;
	margin-top: 1rem;
	padding: 0.5rem 1rem;
	width: 100%;
`

const Code = styled.code`
	white-space: pre-wrap;
	width: 100%;
	word-break: break-all;
`

type DockerConfig = {
	auths: {
		[host: string]: {
			username: string
			password: string
			email: string
			auth: string
		}
	}
}

type GenerateDockerConfig = (server: string, username: string, password: string, email: string) => DockerConfig

const Page = (): JSX.Element => {
	const [base64, setBase64] = useState('')
	const [yaml, setYAML] = useState('')
	const [generatedConfig, setGeneratedConfig] = useState<DockerConfig>({
		auths: {},
	})
	const [viewJSON, setViewJSON] = useState(false)

	const [server, setServer] = useState('https://index.docker.io/v1/')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	const dockerconfig: GenerateDockerConfig = (server, username, password, email) => {
		const auth = Buffer.from(`${username}:${password}`).toString('base64')
		return {
			auths: {
				[server]: {
					username,
					password,
					email,
					auth,
				},
			},
		}
	}

	const copyToClipboard = (data: string) => {
		const el = document.createElement('textarea')
		el.value = data
		document.body.appendChild(el)
		el.select()
		document.execCommand('copy')
		document.body.removeChild(el)
	}

	useEffect(() => {
		setGeneratedConfig(dockerconfig(server, username, password, email))
	}, [email, server, password, username])

	useEffect(() => {
		setBase64(btoa(JSON.stringify(generatedConfig)))
		setYAML(`---
kind: Secret
apiVersion: v1
type: kubernetes.io/dockerconfigjson
metadata:
  name: image-pull-secret
data:
  .dockerconfigjson: ${btoa(JSON.stringify(generatedConfig))}`)
	}, [generatedConfig])

	return (
		<>
			<Section title="What is this?">
				<p>
					A tool that takes generates base64 encoded string that can be used in a{' '}
					<a href="https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets">
						docker-registry
					</a>{' '}
					kubernetes secret.{' '}
					<em>Nothing is stored or sent to the server, everything is generated on the fly on the client</em>
					side. View the source code on{' '}
					<a href="https://github.com/omBratteng/website/blob/develop/src/pages/dockerconfigjson.tsx">GitHub</a>.
				</p>
			</Section>
			<Section title="Docker auth">
				<SectionContent>
					<p>Host</p>
					<Input
						placeholder="docker-server"
						onChange={(value) => setServer(value.target.value)}
						defaultValue={server}
					/>

					<p>Username</p>
					<Input placeholder="docker-username" onChange={(value) => setUsername(value.target.value)} />

					<p>Password</p>
					<Input
						placeholder="docker-password"
						type="password"
						onChange={(value) => setPassword(value.target.value)}
					/>

					<p>Email</p>
					<Input
						placeholder="docker-email"
						type="email"
						name="email"
						onChange={(value) => setEmail(value.target.value)}
					/>
				</SectionContent>
			</Section>
			<Section title="Generated Base64">
				<Code>{base64}</Code>
				<Button onClick={() => copyToClipboard(base64)}>Copy</Button>
			</Section>

			<Section title="Generated k8s YAML">
				<Code>{yaml}</Code>
				<Button onClick={() => copyToClipboard(yaml)}>Copy</Button>
			</Section>

			<Section title="Generated JSON">
				<Button onClick={() => setViewJSON((prev) => !prev)}>{viewJSON ? 'Hide' : 'View'} JSON</Button>
				{viewJSON && (
					<>
						<Code>{JSON.stringify(generatedConfig, null, 2)}</Code>
						<Button onClick={() => copyToClipboard(JSON.stringify(generatedConfig, null, 2))}>Copy</Button>
					</>
				)}
			</Section>
		</>
	)
}

export default Page
