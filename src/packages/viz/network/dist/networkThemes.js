"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTheme = exports.themeLookup = exports.light = exports.dark = exports.themeNames = exports.GlobalStyle = void 0;
const styled_components_1 = require("styled-components");
/**
 * Global style applied to entire network component.
 */
exports.GlobalStyle = (0, styled_components_1.createGlobalStyle) `
  html {
    font-family: 'Open Sans', sans-serif;
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.text}
  }
`;
exports.themeNames = ["dark", "light"];
exports.dark = {
    colors: {
        text: "white",
        bg: "#222330",
        panel: "#1c1c26",
    },
};
exports.light = {
    colors: {
        text: "#316DA4",
        bg: "white",
        panel: "lightgray",
    },
};
exports.themeLookup = {
    dark: exports.dark,
    light: exports.light,
};
exports.defaultTheme = exports.light;
//# sourceMappingURL=networkThemes.js.map