import getConfig from 'next/config'
import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

// FontAwesome
// Add the css on the server side
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { lightTheme } from 'styles/lightTheme'
import { darkTheme } from 'styles/darkTheme'

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

const GlobalStyle = createGlobalStyle`
html {
	box-sizing: border-box;
	font-family: monospace;
	font-size: 16px;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-style: normal;
	font-weight: 400;
	letter-spacing: 1.25px;
	-ms-overflow-style: -ms-autohiding-scrollbar;
	text-rendering: optimizeLegibility;
	text-size-adjust: 100%;

	&.wf-active {
		font-family: 'Space Mono', monospace;
		letter-spacing: 1px;
	}
}

html,
body,
#__next { height: 100%; }

* { box-sizing: border-box; }

::selection {
	background: ${(props) => rgba(props.theme.colors.linkColor, 0.15)};
}

body {
	background: var(--global-background-color);
	color: var(--global-font-color);
	font-feature-settings: "liga" 1, "lnum" 1, "tnum" 1;
	font-variant-ligatures: common-ligatures;
	line-height: ${(props) => props.theme.font.lineHeight};
	margin: 0;
	transition: background 0.5s ease, color 0.5s ease;

	@supports not (font-variant-ligatures: common-ligatures) {
		font-feature-settings: "liga";
	}

	--red: ${darkTheme.colors.red};

	&.dark-mode {
		--global-background-color: ${darkTheme.colors.background};
		--global-font-color: ${darkTheme.colors.font};
		--global-link-color: ${darkTheme.colors.linkColor};

		--github-hover-color: ${darkTheme.some.github};
		--twitter-hover-color: ${darkTheme.some.twitter};
		--linkedin-hover-color: ${darkTheme.some.linkedin};

		--contentLoader-bg: #353535;
		--contentLoader-fg: #424242;
	}

	&.light-mode {
		--global-background-color: ${lightTheme.colors.background};
		--global-font-color: ${lightTheme.colors.font};
		--global-link-color: ${lightTheme.colors.linkColor};

		--github-hover-color: ${lightTheme.some.github};
		--twitter-hover-color: ${lightTheme.some.twitter};
		--linkedin-hover-color: ${lightTheme.some.linkedin};

		--contentLoader-bg: #f3f3f3;
		--contentLoader-fg: #ecebeb;
	}
}

a {
	color: var(--global-link-color);
	text-decoration: none;

	&:hover:not(.no-bg) {
		background: ${(props) => rgba(props.theme.colors.linkColor, 0.15)};
	}
}

svg:not(:root).svg-inline--fa{overflow:visible;}
.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-0.125em;}
.svg-inline--fa.fa-fw{width:1.25em;}


@font-face {
	font-display: swap;
	font-family: 'Space Mono';
	font-style: normal;
	font-weight: 400;
	src: local('Space Mono'),
		url('${assetPrefix}/assets/fonts/space-mono-v6-latin-regular.woff2') format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
		U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
	font-display: swap;
	font-family: 'Space Mono';
	font-style: italic;
	font-weight: 400;
	src: local('Space Mono'),
		url('${assetPrefix}/assets/fonts/space-mono-v6-latin-italic.woff2') format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
		U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
	font-display: swap;
	font-family: 'Space Mono';
	font-style: normal;
	font-weight: 700;
	src: local('Space Mono'),
		url('${assetPrefix}/assets/fonts/space-mono-v6-latin-700.woff2') format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
		U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
	font-display: swap;
	font-family: 'Space Mono';
	font-style: italic;
	font-weight: 700;
	src: local('Space Mono'),
		url('${assetPrefix}/assets/fonts/space-mono-v6-latin-700italic.woff2') format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
		U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`

export { GlobalStyle, lightTheme, darkTheme }
