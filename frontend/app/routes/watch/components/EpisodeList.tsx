import { Box, Group, Select, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { EpisodeCard } from "./EpisodeCard";

interface EpisodeListProps {
  currentEpisode: number;
}

export default function EpisodeList({ currentEpisode }: EpisodeListProps) {
  const [episode, setCurrentEpisode] = useState(currentEpisode);

  const [selectedSeason, setSelectedSeason] = useState("1");

  const episodes = Array.from({ length: 26 }, (_, i) => ({
    episodeNumber: i + 1,
    title: `Episode ${i + 1}`,
    duration: "23:40",
    thumbnail:
      "https://images.unsplash.com/photo-1760445726866-cc0f10628955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGFjdGlvbiUyMHNjZW5lfGVufDF8fHx8MTc2Mjc4Mzk5NHww&ixlib=rb-4.1.0&q=80&w=1080",
  }));

  return (
    <Box mt="xl">
      <Group justify="space-between" mb="md">
        <Text size="xl" c="white">
          Episodes
        </Text>
        <Box w={160}>
          <Select
            value={selectedSeason}
            onChange={(value) => setSelectedSeason(value || "1")}
            data={[
              { value: "1", label: "Season 1" },
              { value: "2", label: "Season 2" },
              { value: "3", label: "Season 3" },
            ]}
            styles={{
              input: {
                backgroundColor: "#0a0a0a",
                borderColor: "#3f3f46",
                color: "white",
              },
            }}
          />
        </Box>
      </Group>

      <Stack gap="sm">
        {episodes.slice(0, 10).map((episode) => (
          <EpisodeCard
            key={episode.episodeNumber}
            {...episode}
            isCurrentEpisode={episode.episodeNumber === currentEpisode}
            onClick={() => setCurrentEpisode(episode.episodeNumber)}
          />
        ))}
      </Stack>
    </Box>
  );
}
