import {
	createTheme,
	DEFAULT_THEME,
	MantineProvider,
	type MantineProviderProps,
} from "@mantine/core";

export const appTheme = createTheme({
	colors: {
		brand: DEFAULT_THEME.colors.dark,
	},
	primaryColor: "brand",
});

export function AppTheme({
	children,
	theme = appTheme,
	...props
}: MantineProviderProps) {
	return (
		<MantineProvider theme={theme} {...props}>
			{children}
		</MantineProvider>
	);
}
