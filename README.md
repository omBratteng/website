# My personal website

[![build](https://img.shields.io/github/workflow/status/ombratteng/bratteng.sh/continuous-integration?event=push&label=CI%20Build&style=for-the-badge)](https://github.com/omBratteng/bratteng.sh/actions?query=workflow:continuous-integration)

## Generating fonts

To generate the base64 fonts we need, we'll run [`webfont-dl`](https://github.com/mmastrac/webfont-dl).

For regular (400)

```sh
 npx webfont-dl "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap&text=brateng.shOl-Mi%20BoGHuTwLkdIpm%2CycD'jvf59C2PW~%2FA%E2%80%94SN" \
    -o regular.css \
    --eot=omit \
    --ttf=omit \
    --woff1=omit
```

For bold (700)

```sh
 npx webfont-dl "https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap&text=About40" \
    -o bold.css \
    --eot=omit \
    --ttf=omit \
    --woff1=omit
```

To fetch to unique characters, run this in the console.
> **NOTE:** Not a perfect script, elements without a set `font-weight`, e.g. parent divs, will get the text content of e.g. child `<strong />` elements
>
> Also doesn't care/ crawl for other pages

```js
const fontWeights = {}

document.querySelectorAll('*').forEach(elem => {
    if (["HTML", "HEAD", "BODY", "META", "LINK", "SCRIPT", "TITLE", "NOSCRIPT", "STYLE", "SVG"].includes(elem.tagName)) return
    if (!elem.innerText) return
    let weight = window.getComputedStyle(elem).fontWeight
    if (!fontWeights[weight]) fontWeights[weight] = []
    fontWeights[weight].push(elem.innerText.replace(/\r?\n|\r/g, ''))

    if(window.getComputedStyle(elem, "::before").content !== "none") {
        weight = window.getComputedStyle(elem, "::before").fontWeight
        fontWeights[weight].push(window.getComputedStyle(elem, "::before").content.replace(/^"(.+)"$/, "$1"))
    }

    if(window.getComputedStyle(elem, "::after").content !== "none") {
        weight = window.getComputedStyle(elem, "::after").fontWeight
        fontWeights[weight].push(window.getComputedStyle(elem, "::after").content.replace(/^"(.+)"$/, "$1"))
    }
})

Object.keys(fontWeights)
.filter((key) => fontWeights[key].length > 0)
.map((key) => {
    let weight = fontWeights[key]
    let text = weight.join('').replace(/\r?\n|\r/g, '')
                     .split('')
                     .filter((item, pos, self) => self.indexOf(item) === pos)
                     .join('')

    fontWeights[key] = encodeURIComponent(text)
})

console.log(fontWeights)
```
