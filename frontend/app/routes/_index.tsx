import type { Route } from "./+types/_index";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "~/components/Header";
import { Hero } from "~/components/Hero";
import { Navbar } from "~/components/Navbar";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Anime Streaming" },
		{ name: "description", content: "Your No. 1 Anime Streaming Platform" },
	];
}

export default function Home() {
	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "TV Shows", href: "/tvshows" },
		{ label: "Movies", href: "/movies" },
		{ label: "New & Popular", href: "/new-and-popular" },
		{ label: "My List", href: "/my-list" },
	]

	const [opened, { toggle, close }] = useDisclosure(false);

	return (
		<AppShell header={{ height: 70 }} navbar={{ width: 280, breakpoint: 'md', collapsed: { mobile: !opened, desktop: true } }} padding="md" styles={{
			header: {
				border: 'none',
				borderBottom: 'none',
			},
		}}>
			<Header opened={opened} toggle={toggle} navItems={navItems} />
			<Navbar opened={opened} close={close} navItems={navItems} />
			<Hero />
		</AppShell>
	);
}
