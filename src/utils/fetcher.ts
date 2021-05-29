const fetcher = async <Response>(path: string): Promise<Response> => {
	const resp = await fetch(path)

	if (!resp.ok) {
		throw new Error(await resp.json())
	}

	return resp.json()
}

export default fetcher
