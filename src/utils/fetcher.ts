const fetcher = async <Response>(path: string, init?: RequestInit): Promise<Response> => {
	const resp = await fetch(path, init)

	if (!resp.ok) {
		throw new Error(await resp.json())
	}

	return resp.json()
}

export default fetcher
