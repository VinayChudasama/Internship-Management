import { CSSVariablesResolver, createTheme } from "@mantine/core";
import { variantColorResolver } from "../../../shared/component/StatusBadge";
export const theme = createTheme({
  variantColorResolver,
  primaryColor: "primary",
  primaryShade: 6,
  fontFamily: "Inter, sans-serif",

  colors: {
    primary: [
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
      "#00488a",
    ],
  },
  cursorType: "pointer",
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  dark: {},
  light: {},
});
