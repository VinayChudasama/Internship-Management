import { CSSVariablesResolver, createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  primaryShade: 6,
  fontFamily: "Inter, sans-serif",
  colors: {
    primary: [
      "#e1faff",
      "#cdf0ff",
      "#9fddfb",
      "#6ccaf7",
      "#44baf4",
      "#2bb0f2",
      "#16abf2",
      "#0095d8",
      "#0084c3",
      "#0073ac",
    ],
  },
  cursorType: "pointer",
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  dark: {},
  light: {},
});
