import process from "node:process"
import * as BunnySDK from "@bunny.net/edgescript-sdk";

BunnySDK.net.http.serve(async (request: Request): Promise<Response> => {
    if (!process.env.BUNNY_API_KEY || !process.env.BUNNY_STORAGE_ZONE_NAME) {
		return new Response('ERR: Bunny API key or storage zone name not set.', { status: 500 })
	}

    if (request.method !== 'POST') {
        return new Response('ERR: Method not allowed.', {status: 405})
    }

    if (request.method !== 'POST') {
		return new Response('ERR: Method not allowed.', { status: 405 })
	}

	try {
		const contentType = request.headers.get('content-type')

		if (contentType && contentType.startsWith('multipart/form-data')) {
			const image = (await request.formData()).get('file') as Blob

			if (!image) {
				return new Response('ERR: No file provided in the FormData.', { status: 400 })
			}

			// Generate a unique key for the Bunny Edge Files object
			const key = `${Date.now()}_${Math.random().toString(36).substring(7)}.${image.type.split('/')[1]}`

			// Define Bunny Edge Files upload URL
			const uploadUrl = `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE_NAME}/${key}`
			const pullUrl = process.env.BUNNY_STORAGE_ZONE_NAME.replaceAll('-', '.')

			// Use fetch to upload the image to Bunny Edge Files
			const upload = await fetch(uploadUrl, {
				method: 'PUT',
				headers: {
					AccessKey: process.env.BUNNY_API_KEY,
					'Content-Type': 'application/octet-stream',
				},
				body: image,
			})

			if (upload.status !== 201) {
				return new Response('ERR: Failed to upload to Bunny Edge Files.', { status: 500 })
			}

			const imageUrl = `https://${pullUrl}/${key}`
			console.log(`SUCCESS: ${imageUrl}`)
			return new Response(`SUCCESS: ${imageUrl}`, { status: 200 })
		} else {
			return new Response('ERR: Content-Type must be multipart/form-data.', { status: 400 })
		}
	} catch (error) {
		console.error('Server error:', error)
		return new Response('ERR: Server error.', { status: 500 })
	}
});
