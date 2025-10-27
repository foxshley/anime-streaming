import { AppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimeCarousel } from "~/components/AnimeCarousel";
import { Header } from "~/components/Header";
import { Hero } from "~/components/Hero";
import { Navbar } from "~/components/Navbar";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
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
	];

	const trendingAnime = [
		{
			id: "1",
			title: "Attack on Titan",
			image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f",
			rating: "TV-MA",
			year: "2023",
			episodes: "24 Episodes",
		},
		{
			id: "2",
			title: "Studio Ghibli Collection",
			image: "https://images.unsplash.com/photo-1720636440389-2429e032e39d",
			rating: "PG",
			year: "2022",
			episodes: "Movie",
		},
		{
			id: "3",
			title: "Japanese Animation Art",
			image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c",
			rating: "PG-13",
			year: "2023",
			episodes: "12 Episodes",
		},
		{
			id: "4",
			title: "Anime Poster Design",
			image: "https://images.unsplash.com/photo-1659715790821-2e3f472262db",
			rating: "TV-14",
			year: "2024",
			episodes: "26 Episodes",
		},
		{
			id: "5",
			title: "Demon Slayer",
			image: "https://images.unsplash.com/photo-1695747003335-ac77eeea43c2",
			rating: "TV-14",
			year: "2023",
			episodes: "44 Episodes",
		},
	];

	const popularAnime = [
		{
			id: "6",
			title: "Spirited Away",
			image: "https://images.unsplash.com/photo-1720636440389-2429e032e39d",
			rating: "PG",
			year: "2001",
			episodes: "Movie",
		},
		{
			id: "7",
			title: "Your Name",
			image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c",
			rating: "PG",
			year: "2016",
			episodes: "Movie",
		},
		{
			id: "8",
			title: "One Piece",
			image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f",
			rating: "TV-14",
			year: "2023",
			episodes: "1000+ Episodes",
		},
		{
			id: "9",
			title: "Jujutsu Kaisen",
			image: "https://images.unsplash.com/photo-1659715790821-2e3f472262db",
			rating: "TV-MA",
			year: "2023",
			episodes: "24 Episodes",
		},
		{
			id: "10",
			title: "My Hero Academia",
			image: "https://images.unsplash.com/photo-1695747003335-ac77eeea43c2",
			rating: "TV-14",
			year: "2024",
			episodes: "138 Episodes",
		},
	];

	const newReleases = [
		{
			id: "11",
			title: "Chainsaw Man",
			image: "https://images.unsplash.com/photo-1659715790821-2e3f472262db",
			rating: "TV-MA",
			year: "2024",
			episodes: "12 Episodes",
		},
		{
			id: "12",
			title: "Spy x Family",
			image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f",
			rating: "TV-14",
			year: "2024",
			episodes: "25 Episodes",
		},
		{
			id: "13",
			title: "Cyberpunk Edgerunners",
			image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c",
			rating: "TV-MA",
			year: "2024",
			episodes: "10 Episodes",
		},
		{
			id: "14",
			title: "Mob Psycho 100",
			image: "https://images.unsplash.com/photo-1720636440389-2429e032e39d",
			rating: "TV-14",
			year: "2024",
			episodes: "37 Episodes",
		},
		{
			id: "15",
			title: "Tokyo Ghoul",
			image: "https://images.unsplash.com/photo-1695747003335-ac77eeea43c2",
			rating: "TV-MA",
			year: "2024",
			episodes: "48 Episodes",
		},
	];

	const [opened, { toggle, close }] = useDisclosure(false);

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
				<Hero />

				<Box my="xl" pb="xl">
					<AnimeCarousel title="Trending Now" items={trendingAnime} />
					<AnimeCarousel title="Popular Anime" items={popularAnime} />
					<AnimeCarousel title="New Releases" items={newReleases} />
				</Box>
			</AppShell.Main>
		</AppShell>
	);
}
