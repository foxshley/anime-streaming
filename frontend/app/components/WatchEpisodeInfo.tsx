import { Badge, Box, Button, Group, Text } from "@mantine/core";
import { ThumbsUp } from "lucide-react";

interface WatchEpisodeInfoProps {
  rating: string;
  year: string;
  genres: string[];
  description: string;
  currentEpisode: number;
  episodeTitle: string;
}

export default function WatchEpisodeInfo({
  rating,
  year,
  genres,
  description,
  currentEpisode,
  episodeTitle,
}: WatchEpisodeInfoProps) {
  return (
    <Box mb="xl">
      <Group mb="sm">
        <Text size="xl" c="white">
          Episode {currentEpisode}: {episodeTitle}
        </Text>
      </Group>
      <Group mb="md">
        <Badge color="red" variant="filled">
          {rating}
        </Badge>
        <Text size="sm" c="dimmed">
          {year}
        </Text>
        {genres.map((genre) => (
          <Badge key={genre} color="dark" variant="outline">
            {genre}
          </Badge>
        ))}
      </Group>
      <Text c="gray" mb="md">
        {description}
      </Text>
      <Group>
        <Button
          variant="outline"
          color="gray"
          leftSection={<ThumbsUp size={18} />}
        >
          Rate This Episode
        </Button>
      </Group>
    </Box>
  );
}
