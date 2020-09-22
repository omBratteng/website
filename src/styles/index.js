import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

// FontAwesome
// Add the css on the server side
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { lightTheme } from 'styles/lightTheme'
import { darkTheme } from 'styles/darkTheme'

const GlobalStyle = createGlobalStyle`
:root {
	box-sizing: border-box;
	font-family: 'Space Mono', monospace;
	font-size: 16px;
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
	letter-spacing: 1px;
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
${
	'' /* .svg-inline--fa.fa-lg{vertical-align:-0.225em;}
.svg-inline--fa.fa-w-1{width:0.0625em;}
.svg-inline--fa.fa-w-2{width:0.125em;}
.svg-inline--fa.fa-w-3{width:0.1875em;}
.svg-inline--fa.fa-w-4{width:0.25em;}
.svg-inline--fa.fa-w-5{width:0.3125em;}
.svg-inline--fa.fa-w-6{width:0.375em;}
.svg-inline--fa.fa-w-7{width:0.4375em;}
.svg-inline--fa.fa-w-8{width:0.5em;}
.svg-inline--fa.fa-w-9{width:0.5625em;}
.svg-inline--fa.fa-w-10{width:0.625em;}
.svg-inline--fa.fa-w-11{width:0.6875em;}
.svg-inline--fa.fa-w-12{width:0.75em;}
.svg-inline--fa.fa-w-13{width:0.8125em;}
.svg-inline--fa.fa-w-14{width:0.875em;}
.svg-inline--fa.fa-w-15{width:0.9375em;}
.svg-inline--fa.fa-w-16{width:1em;}
.svg-inline--fa.fa-w-17{width:1.0625em;}
.svg-inline--fa.fa-w-18{width:1.125em;}
.svg-inline--fa.fa-w-19{width:1.1875em;}
.svg-inline--fa.fa-w-20{width:1.25em;}
.svg-inline--fa.fa-pull-left{margin-right:0.3em;width:auto;}
.svg-inline--fa.fa-pull-right{margin-left:0.3em;width:auto;}
.svg-inline--fa.fa-border{height:1.5em;}
.svg-inline--fa.fa-li{width:2em;} */
}
.svg-inline--fa.fa-fw{width:1.25em;}

${'' /* ${dom.css()} */}
`

export { GlobalStyle, lightTheme, darkTheme }
