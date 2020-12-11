const Health = (req, res) =>
	req.headers.host === 'localhost:3000'
		? res.status(200).json({
				status: 'OK',
				time: new Date().toISOString(),
		  })
		: res.status(403).end('403 Forbidden')

export default Health
