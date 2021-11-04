import { createGlobalStyle, DefaultTheme } from "styled-components";

/**
 * Global style applied to entire network component.
 */
export const GlobalStyle = createGlobalStyle<AppTheme>`
  html {
    font-family: 'Open Sans', sans-serif;
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.text}
  }
`;

export interface AppTheme extends DefaultTheme {
  theme: {
    colors: {
      text: string;
      bg: string;
      panel: string;
    };
  };
}

export const themeNames = ["dark", "light"] as const;
export type Themes = typeof themeNames[number];

export const dark = {
  colors: {
    text: "white",
    bg: "#222330",
    panel: "#1c1c26",
  },
};
export const light = {
  colors: {
    text: "#316DA4",
    bg: "white",
    panel: "lightgray",
  },
};

export const themeLookup: Record<Themes, Record<string, any>> = {
  dark,
  light,
};

export const defaultTheme = light;
