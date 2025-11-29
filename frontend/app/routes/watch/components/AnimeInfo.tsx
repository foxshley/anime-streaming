import { Box, Stack, Text } from "@mantine/core";

interface AnimeInfoProps {
  animeId: string;
}

export default function AnimeInfo({ animeId }: AnimeInfoProps) {
  const animeInfo = {
    studio: "ufotable",
    director: "Haruo Sotozaki",
    genres: ["Action", "Fantasy", "Supernatural"],
  };

  return (
    <Box
      bg="#09090b"
      p="xl"
      mt="md"
      style={{
        border: "1px solid #18181b",
        borderRadius: 8,
      }}
    >
      <Text size="lg" c="white" mb="md">
        About
      </Text>
      <Stack gap="sm">
        <Box>
          <Text size="sm" c="dimmed" mb={4}>
            Studio
          </Text>
          <Text size="sm" c="white">
            {animeInfo.studio}
          </Text>
        </Box>
        <Box>
          <Text size="sm" c="dimmed" mb={4}>
            Director
          </Text>
          <Text size="sm" c="white">
            {animeInfo.director}
          </Text>
        </Box>
        <Box>
          <Text size="sm" c="dimmed" mb={4}>
            Genre
          </Text>
          <Text size="sm" c="white">
            {animeInfo.genres.join(", ")}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
