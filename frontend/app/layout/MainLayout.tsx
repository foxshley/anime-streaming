import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { Header } from "~/components/Header";
import { Navbar } from "~/components/Navbar";

export default function MainLayout() {
	const [opened, { toggle, close }] = useDisclosure(false);

	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "TV Shows", href: "/tvshows" },
		{ label: "Movies", href: "/movies" },
		{ label: "New & Popular", href: "/new-and-popular" },
		{ label: "My List", href: "/my-list" },
	];

	return (
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

			<AppShell.Main p={0}>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
