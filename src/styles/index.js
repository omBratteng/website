import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

import { lightTheme } from 'styles/lightTheme'
import { darkTheme } from 'styles/darkTheme'

const GlobalStyle = createGlobalStyle`
:root {
	--global-background-color: ${(props) => props.theme.background};
	--global-font-color: ${(props) => props.theme.font};
	--global-link-color: ${(props) => props.theme.linkColor};
	--global-line-height: 1.5;

	box-sizing: border-box;
	font-family: 'Space Mono', monospace;
	font-size: 1rem;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-style: normal;
	font-weight: 400;
	line-height: var(--global-line-height);
	-ms-overflow-style: -ms-autohiding-scrollbar;
	text-rendering: optimizeLegibility;
	text-size-adjust: 100%;
}

html,
body,
#__next { height: 100%; }

* { box-sizing: border-box; }

::selection {
	background: ${(props) => rgba(props.theme.linkColor, 0.15)};
}

body {
	background: var(--global-background-color);
	color: var(--global-font-color);
	font-feature-settings: "liga" 1, "lnum" 1, "tnum" 1;
	font-variant-ligatures: common-ligatures;
	transition: background 0.5s ease, color 0.5s ease;

	@supports not (font-variant-ligatures: common-ligatures) {
		font-feature-settings: "liga";
	}

	--github-hover-color: #24292e;
	--twitter-hover-color: #1da1f2;
	--linkedin-hover-color: #1683bb;

	&.dark-mode {
		--github-hover-color: #fff;
	}
}

a {
	color: ${(props) => props.theme.linkColor};
	text-decoration: none;

	&:hover:not(.no-bg) {
		background: ${(props) => rgba(props.theme.linkColor, 0.15)};
	}
}
`

export { GlobalStyle, lightTheme, darkTheme }
