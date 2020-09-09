import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

import { lightTheme } from 'styles/lightTheme'
import { darkTheme } from 'styles/darkTheme'

const GlobalStyle = createGlobalStyle`
:root {
	box-sizing: border-box;
	font-family: 'Space Mono', monospace;
	font-size: 1rem;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-style: normal;
	font-weight: 400;
	-ms-overflow-style: -ms-autohiding-scrollbar;
	text-rendering: optimizeLegibility;
	text-size-adjust: 100%;
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
`

export { GlobalStyle, lightTheme, darkTheme }
