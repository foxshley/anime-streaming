import {
	Box,
	Code,
	ColorSchemeScript,
	Container,
	mantineHtmlProps,
	Text,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type React from "react";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { AppShell } from "@mantine/core";
import { AppTheme } from "~/app-theme";
import { Header } from "~/components/Header";
import { Navbar } from "~/components/Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "TV Shows", href: "/tvshows" },
		{ label: "Movies", href: "/movies" },
		{ label: "New & Popular", href: "/new-and-popular" },
		{ label: "My List", href: "/my-list" },
	];

	const [opened, { toggle, close }] = useDisclosure(false);

	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<ColorSchemeScript defaultColorScheme="dark" />
				<Meta />
				<Links />
			</head>
			<body>
				<AppTheme>
					<AppShell
						header={{ height: 70 }}
						navbar={{
							width: 280,
							breakpoint: "md",
							collapsed: { mobile: !opened, desktop: true },
						}}
						padding="md"
						styles={{
							header: {
								border: "none",
								borderBottom: "none",
							},
						}}
					>
						<Header opened={opened} toggle={toggle} navItems={navItems} />
						<Navbar opened={opened} close={close} navItems={navItems} />

						<AppShell.Main p={0}>{children}</AppShell.Main>
					</AppShell>
				</AppTheme>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<Container component="main" pt="xl" p="md" mx="auto">
			<Title>{message}</Title>
			<Text>{details}</Text>
			{stack && (
				<Box component="pre" w="100%" style={{ overflowX: "auto" }} p="md">
					<Code>{stack}</Code>
				</Box>
			)}
		</Container>
	);
}
