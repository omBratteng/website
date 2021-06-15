import { createGlobalStyle } from 'styled-components'

// FontAwesome
// Add the css on the server side
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { dark, light } from 'styles/themes'

const GlobalStyle = createGlobalStyle`
:root {
	--red: ${dark.colors.red};
	--line-height: ${dark.font.lineHeight};

	--global-background-color: ${light.colors.background};
	--global-font-color: ${light.colors.font};
	--global-link-color: ${light.colors.linkColor};
	--global-link-hover-color: rgba(170, 147, 116, 0.15);

	--github-hover-color: ${light.some.github};
	--twitter-hover-color: ${light.some.twitter};
	--linkedin-hover-color: ${light.some.linkedin};
}

[data-theme="dark"] {
	--global-background-color: ${dark.colors.background};
	--global-font-color: ${dark.colors.font};
	--global-link-color: ${dark.colors.linkColor};
	--global-link-hover-color: rgba(170, 147, 116, 0.15);

	--github-hover-color: ${dark.some.github};
	--twitter-hover-color: ${dark.some.twitter};
	--linkedin-hover-color: ${dark.some.linkedin};
}

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

	&._fonts {
		font-family: 'Space Mono', monospace;
		letter-spacing: 1px;
	}
}

html,
body,
#__next { height: 100%; }

* { box-sizing: border-box; }

::selection {
	background: var(--global-link-hover-color);
}

body {
	background: var(--global-background-color);
	color: var(--global-font-color);
	font-feature-settings: "liga" 1, "lnum" 1, "tnum" 1;
	font-variant-ligatures: common-ligatures;
	line-height: var(--line-height);
	margin: 0;

	@supports not (font-variant-ligatures: common-ligatures) {
		font-feature-settings: "liga";
	}

	&[initialised] {
		transition: background 0.5s ease, color 0.5s ease;
	}
}

a {
	color: var(--global-link-color);
	text-decoration: none;

	&:hover:not(.no-bg) {
		background: var(--global-link-hover-color);
	}
}

svg:not(:root).svg-inline--fa{overflow:visible;}
.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-0.125em;}
.svg-inline--fa.fa-fw{width:1.25em;}
`

export { GlobalStyle, dark, light }
