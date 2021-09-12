import type { NextApiHandler } from 'next'

const Health: NextApiHandler = (_, res) =>
	res.status(200).json({
		status: 'OK',
		time: new Date().toISOString(),
	})

export default Health
