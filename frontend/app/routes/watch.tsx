import { Box, Container, Grid } from "@mantine/core";
import { VideoPlayer } from "~/components/VideoPlayer/VideoPlayer";
import WatchAnimeInfo from "~/components/WatchAnimeInfo";
import WatchEpisodeInfo from "~/components/WatchEpisodeInfo";
import WatchEpisodeList from "~/components/WatchEpisodeList";
import { WatchHeader } from "~/components/WatchHeader";
import type { Route } from "./+types/watch";

export async function loader({ params }: Route.LoaderArgs) {
	// TODO: Replace with:
	// const watchId = params.watchId;
	// const watchMetadata = await getWatchMetadata(watchId);

	const watchMetadata = {
		title: "Demon Slayer: Kimetsu no Yaiba",
		season: "Season 1",
		currentEpisode: 12,
		episodeTitle: "The Final Fight",
		totalEpisodes: 26,
		year: "2019",
		rating: "TV-14",
		genres: ["Action", "Fantasy", "Supernatural"],
		description:
			"Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.",
	};

	return { watchMetadata };
}

export function meta({ loaderData }: Route.MetaArgs) {
	const episodeTitle = loaderData.watchMetadata.episodeTitle;
	const animeTitle = loaderData.watchMetadata.title;

	return [
		{ title: `${episodeTitle} - ${animeTitle} | Anime Streaming` },
		{ name: "description", content: "Your No. 1 Anime Streaming Platform" },
	];
}
export default function WatchAnime({ loaderData }: Route.ComponentProps) {
	const { watchMetadata } = loaderData;

	return (
		<Box>
			{/* Header */}
			<WatchHeader title={watchMetadata.title} season={watchMetadata.season} />

			{/* Video Player */}
			<VideoPlayer
				videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
				posterUrl="https://images.unsplash.com/photo-1760445726866-cc0f10628955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGFjdGlvbiUyMHNjZW5lfGVufDF8fHx8MTc2Mjc4Mzk5NHww&ixlib=rb-4.1.0&q=80&w=1080"
			/>

			<Container size="xl" py="xl">
				<Grid gutter="xl">
					<Grid.Col span={{ base: 12, md: 8 }}>
						{/* Episode Info */}
						<WatchEpisodeInfo
							rating={watchMetadata.rating}
							year={watchMetadata.year}
							genres={watchMetadata.genres}
							description={watchMetadata.description}
							currentEpisode={watchMetadata.currentEpisode}
							episodeTitle={watchMetadata.episodeTitle}
						/>

						{/* Episodes List */}
						<WatchEpisodeList currentEpisode={watchMetadata.currentEpisode} />
					</Grid.Col>

					{/* Sidebar */}
					<Grid.Col span={{ base: 12, md: 4 }}>
						<WatchAnimeInfo animeId={"2347"} />
					</Grid.Col>
				</Grid>
			</Container>
		</Box>
	);
}
