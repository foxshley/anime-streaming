import { Box, Container, Stack, Tabs, Text } from "@mantine/core";
import { EpisodeCard } from "~/components/EpisodeCard";
import { Hero } from "~/components/Hero";
import type { Route } from "./+types/anime_.$anime";

export async function loader({ params }: Route.LoaderArgs) {
	const animeData = {
		title: "Cyber Chronicles",
		description:
			"In a dystopian future where technology and humanity collide, a group of hackers fights against a corrupt megacorporation. Armed with cutting-edge cybernetic enhancements and unbreakable determination, they must uncover the truth before it's too late.",
		year: 2024,
		rating: "9.2",
		episodes: 24,
		genres: ["Action", "Sci-Fi", "Thriller", "Drama"],
		backgroundImage:
			"https://images.unsplash.com/photo-1610114586897-20495783e96c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGxhbmRzY2FwZSUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NjE1NDkyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
	};

	const episodes = [
		{
			episodeNumber: 1,
			title: "The Beginning",
			description:
				"A mysterious hack shakes the city. Our heroes discover a conspiracy that will change everything they know about their world.",
			duration: "24:12",
			thumbnail:
				"https://images.unsplash.com/photo-1697122032802-510036fd4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwbmlnaHR8ZW58MXx8fHwxNzYxNDg1OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
		},
		{
			episodeNumber: 2,
			title: "Digital Shadows",
			description:
				"The team goes deeper into the network, uncovering secrets hidden in the digital realm. Trust becomes a luxury they can't afford.",
			duration: "23:45",
			thumbnail:
				"https://images.unsplash.com/photo-1725397438618-6bbdfbfba26b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0fGVufDF8fHx8MTc2MTQ3NzYxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
		},
		{
			episodeNumber: 3,
			title: "Ghost Protocol",
			description:
				"An old ally returns with critical information. The hackers must decide whether to trust someone from their past or face certain destruction.",
			duration: "25:18",
			thumbnail:
				"https://images.unsplash.com/photo-1568609159926-5bfc94b48aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbGFuZHNjYXBlJTIwZGFya3xlbnwxfHx8fDE3NjE1NDkyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
		},
		{
			episodeNumber: 4,
			title: "System Breach",
			description:
				"The corporation strikes back. A devastating attack forces the team to go underground and regroup for their next move.",
			duration: "24:56",
			thumbnail:
				"https://images.unsplash.com/photo-1761129386720-82a53e04d9b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGFuaW1hdGlvbiUyMGFydHxlbnwxfHx8fDE3NjE1NDkyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
		},
		{
			episodeNumber: 5,
			title: "Neon Requiem",
			description:
				"In the heart of the neon city, secrets are revealed that shake the foundation of everything they believed in.",
			duration: "23:34",
			thumbnail:
				"https://images.unsplash.com/photo-1697059172415-f1e08f9151bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTQ3MDAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
		},
		{
			episodeNumber: 6,
			title: "Code Red",
			description:
				"Time is running out as the team races against the clock to prevent a catastrophic event that could destroy millions of lives.",
			duration: "26:02",
			thumbnail:
				"https://images.unsplash.com/photo-1610114586897-20495783e96c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGxhbmRzY2FwZSUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NjE1NDkyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
		},
	];

	return { animeData, episodes };
}

export function meta({ loaderData }: Route.MetaArgs) {
	const animeTitle = loaderData.animeData?.title || "Unknown Anime";

	return [
		{ title: `${animeTitle} | Anime Streaming` },
		{ name: "description", content: "Your No. 1 Anime Streaming Platform" },
	];
}

export default function AnimeDetails({ loaderData }: Route.ComponentProps) {
	const { animeData, episodes } = loaderData;
	return (
		<Box>
			<Hero {...animeData} />

			<Container size="xl" py={48}>
				<Tabs defaultValue="episodes" variant="pills" color="red">
					<Tabs.List mb={32}>
						<Tabs.Tab value="episodes" px={24} py={12} fz="lg">
							Episodes
						</Tabs.Tab>
						<Tabs.Tab value="details" px={24} py={12} fz="lg">
							Details & More
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="episodes">
						<Stack gap="md">
							<Text size="xl" c="white" mb={16}>
								Season 1
							</Text>
							{episodes.map((episode) => (
								<EpisodeCard key={episode.episodeNumber} {...episode} />
							))}
						</Stack>
					</Tabs.Panel>

					<Tabs.Panel value="details">
						<Stack gap="xl">
							<Box>
								<Text c="dimmed" mb={8}>
									About
								</Text>
								<Text c="white" size="lg" lh={1.6}>
									{animeData.description}
								</Text>
							</Box>

							<Box>
								<Text c="dimmed" mb={8}>
									Genres
								</Text>
								<Text c="white">{animeData.genres.join(", ")}</Text>
							</Box>

							<Box>
								<Text c="dimmed" mb={8}>
									Rating
								</Text>
								<Text c="white">{animeData.rating}/10</Text>
							</Box>

							<Box>
								<Text c="dimmed" mb={8}>
									Year
								</Text>
								<Text c="white">{animeData.year}</Text>
							</Box>
						</Stack>
					</Tabs.Panel>
				</Tabs>
			</Container>
		</Box>
	);
}
