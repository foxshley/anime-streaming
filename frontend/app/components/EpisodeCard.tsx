import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { Play } from "lucide-react";

interface EpisodeCardProps {
	episodeNumber: number;
	title: string;
	description: string;
	duration: string;
	thumbnail: string;
}

export function EpisodeCard({
	episodeNumber,
	title,
	description,
	duration,
	thumbnail,
}: EpisodeCardProps) {
	return (
		<Card
			p={0}
			radius="md"
			style={{
				backgroundColor: "#18181b",
				border: "1px solid #27272a",
				cursor: "pointer",
				transition: "all 0.2s",
			}}
			styles={{
				root: {
					"&:hover": {
						backgroundColor: "#27272a",
						borderColor: "#3f3f46",
					},
				},
			}}
		>
			<Group gap={0} wrap="nowrap">
				{/* Thumbnail */}
				<Box
					pos="relative"
					w={160}
					h={96}
					style={{
						flexShrink: 0,
						overflow: "hidden",
					}}
				>
					<img
						src={thumbnail}
						alt={title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							display: "block",
						}}
					/>

					{/* Play button overlay */}
					<Box
						pos="absolute"
						top={0}
						left={0}
						right={0}
						bottom={0}
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.4)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							opacity: 0,
							transition: "opacity 0.2s",
						}}
						className="group-hover-overlay"
					>
						<Box
							w={48}
							h={48}
							style={{
								borderRadius: "50%",
								backgroundColor: "rgba(255, 255, 255, 0.9)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Play size={20} fill="black" style={{ marginLeft: 2 }} />
						</Box>
					</Box>

					{/* Duration badge */}
					<Box
						pos="absolute"
						bottom={4}
						right={4}
						px={8}
						py={2}
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							borderRadius: 4,
						}}
					>
						<Text size="xs" c="white">
							{duration}
						</Text>
					</Box>
				</Box>

				{/* Content */}
				<Stack gap="xs" p="md" style={{ flex: 1 }}>
					<Group justify="space-between">
						<Text size="lg" c="white" fw={400}>
							{episodeNumber}. {title}
						</Text>
					</Group>
					<Text size="sm" c="dimmed" lineClamp={2}>
						{description}
					</Text>
				</Stack>
			</Group>
		</Card>
	);
}
