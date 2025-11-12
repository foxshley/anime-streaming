import { Box, Button, Container, Group, Text } from "@mantine/core";
import { ArrowLeft, Plus, Share2 } from "lucide-react";

interface WatchHeaderProps {
  title: string;
  season: string;
}

export function WatchHeader({ title, season }: WatchHeaderProps) {
  return (
    <Box
      bg="rgba(0, 0, 0, 0.95)"
      pos="sticky"
      top={0}
      style={{
        borderBottom: "1px solid #18181b",
        zIndex: 50,
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftSection={<ArrowLeft size={20} />}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "#18181b",
                  },
                },
              }}
            >
              Back
            </Button>
            <Box>
              <Text size="xl" c="white">
                {title}
              </Text>
              <Text size="sm" c="dimmed">
                {season}
              </Text>
            </Box>
          </Group>
          <Group>
            <Button
              variant="outline"
              color="gray"
              leftSection={<Share2 size={18} />}
            >
              Share
            </Button>
            <Button
              variant="filled"
              color="red"
              leftSection={<Plus size={18} />}
            >
              My List
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
