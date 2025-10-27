import { Badge, Box, Card, Group, Image, Text } from "@mantine/core";

interface AnimeCardProps {
	title: string;
	image: string;
	rating?: string;
	year?: string;
	episodes?: string;
}

export function AnimeCard({
	title,
	image,
	rating,
	year,
	episodes,
}: AnimeCardProps) {
	return (
		<Card
			shadow="sm"
			padding="0"
			radius="md"
			style={{
				backgroundColor: "#1a1a1a",
				cursor: "pointer",
				transition: "transform 0.2s",
				overflow: "hidden",
			}}
			className="anime-card"
		>
			<Card.Section>
				<Image src={image} alt={title} height={180} fit="cover" />
			</Card.Section>

			<Box p="md">
				<Text fw={600} size="md" c="white" lineClamp={2} mb="xs">
					{title}
				</Text>

				<Group gap="xs" mb="xs">
					{rating && (
						<Badge variant="light" color="yellow" size="sm">
							★ {rating}
						</Badge>
					)}
					{year && (
						<Badge variant="outline" color="gray" size="sm">
							{year}
						</Badge>
					)}
				</Group>

				{episodes && (
					<Text size="sm" c="dimmed">
						{episodes} Episodes
					</Text>
				)}
			</Box>

			<style>{`
        .anime-card:hover {
          transform: scale(1.05);
        }
      `}</style>
		</Card>
	);
}
