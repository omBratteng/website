type TGoogleFonts = (fonts: string, text?: string) => { href: string; as: 'style' }

const googleFonts: TGoogleFonts = (fonts, text) => {
	let url = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`
	if (text) {
		text = text
			.split('')
			.filter(function (item, pos, self) {
				return self.indexOf(item) == pos
			})
			.join('')
		url += `&text=${encodeURIComponent(text)}`
	}

	return {
		href: url,
		as: 'style',
	}
}

export default googleFonts
