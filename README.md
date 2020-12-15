# My personal website

[![build](https://img.shields.io/github/workflow/status/ombratteng/bratteng.sh/continuous-integration?event=push&label=CI%20Build&style=for-the-badge)](https://github.com/omBratteng/bratteng.sh/actions?query=workflow:continuous-integration)

### Generating fonts
To generate the base64 fonts we need, we'll run [`webfont-dl`](https://github.com/mmastrac/webfont-dl).

For regular (400)
```sh
npx webfont-dl "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap&text=brateng.shOl-Mi%20BoGHuTwLkdIA%E2%80%94SfDvpcym%2CN59C2PjW~%2F" \
	-o public/css/regular.css \
	--eot=omit \
	--ttf=omit \
	--woff1=omit
```

For bold (700)
```sh
npx webfont-dl "https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap&text=About" \
	-o public/css/bold.css \
	--eot=omit \
	--ttf=omit \
	--woff1=omit
```

To fetch to unique characters, run this in the console.
> **NOTE:** This doesn't get characters inside `content` of css nor does it detect `font-weight`
```js
document.documentElement.innerText
	.replace(/\r?\n|\r/g, '')
	.split('')
	.filter((item, pos, self) => self.indexOf(item) === pos)
	.join('')
```
