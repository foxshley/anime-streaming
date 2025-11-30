import {
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  type CSSVariablesResolver,
  type MantineProviderProps,
} from "@mantine/core";

export const appTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.dark,
    red: [
      "#ffe9e9", // lightest
      "#ffcccc",
      "#ff9999",
      "#ff6666",
      "#ff3333",
      "#ff0000", // pure red (index 5 - default for filled buttons)
      "#cc0000",
      "#990000",
      "#660000",
      "#330000", // darkest
    ],
  },
  primaryColor: "red",
  autoContrast: true,
  primaryShade: { light: 8, dark: 4 }, // Use darker shade (8) in dark mode
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": "#ffffff",
  },
  dark: {
    "--mantine-color-body": "#000000",
  },
});

export function AppTheme({
  children,
  theme = appTheme,
  ...props
}: MantineProviderProps) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      cssVariablesResolver={resolver}
      {...props}
    >
      {children}
    </MantineProvider>
  );
}
