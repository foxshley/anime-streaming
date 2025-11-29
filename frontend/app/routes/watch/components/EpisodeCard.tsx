import { Badge, Box, Card, Group, Image, Text } from "@mantine/core";
import { Play } from "lucide-react";

interface EpisodeCardProps {
  episodeNumber: number;
  title: string;
  duration: string;
  thumbnail: string;
  isCurrentEpisode?: boolean;
  onClick: () => void;
}

export function EpisodeCard({
  episodeNumber,
  title,
  duration,
  thumbnail,
  isCurrentEpisode,
  onClick,
}: EpisodeCardProps) {
  return (
    <Card
      p="md"
      onClick={onClick}
      bg={isCurrentEpisode ? "#1a1a1a" : "#0a0a0a"}
      styles={{
        root: {
          border: isCurrentEpisode ? "2px solid #dc2626" : "1px solid #27272a",
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#27272a",
          },
        },
      }}
    >
      <Group gap="md" wrap="nowrap" align="flex-start">
        <Box
          pos="relative"
          w={160}
          h={96}
          bg="#18181b"
          style={{
            flexShrink: 0,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            src={thumbnail}
            alt={`Episode ${episodeNumber}`}
            w="100%"
            h="100%"
            fit="cover"
            fallbackSrc="https://placehold.co/160x96/18181b/666?text=No+Image"
          />

          {/* Play button overlay */}
          <Box
            pos="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.5)"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
            className="episode-play-overlay"
          >
            <Play size={32} color="white" />
          </Box>

          {/* Duration badge */}
          <Box
            pos="absolute"
            bottom={4}
            right={4}
            px={8}
            py={2}
            bg="rgba(0, 0, 0, 0.8)"
            style={{ borderRadius: 4 }}
          >
            <Text size="xs" c="white">
              {duration}
            </Text>
          </Box>
        </Box>

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" mb={8}>
            <Text size="lg" c="white">
              {episodeNumber}. {title}
            </Text>
            {isCurrentEpisode && (
              <Badge color="red" variant="filled" size="sm">
                Now Playing
              </Badge>
            )}
          </Group>
          <Text size="sm" c="dimmed" lineClamp={2}>
            Join the adventure as our heroes face new challenges and discover
            hidden truths about their world.
          </Text>
        </Box>
      </Group>
    </Card>
  );
}
