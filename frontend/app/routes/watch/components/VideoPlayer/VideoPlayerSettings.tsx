import { Box, Group, Text } from "@mantine/core";

interface VideoPlayerSettingsProps {
	playbackRate: number;
	settingsView: "main" | "speed";
	setSettingsView: (view: "main" | "speed") => void;
	changePlaybackRate: (rate: number) => void;
}

export function VideoPlayerSettings({
	playbackRate,
	settingsView,
	setSettingsView,
	changePlaybackRate,
}: VideoPlayerSettingsProps) {
	return (
		<Box
			pos="absolute"
			bottom="100%"
			right={0}
			mb="xs"
			bg="rgba(0,0,0,0.95)"
			style={{
				borderRadius: "8px",
				minWidth: "200px",
				overflow: "hidden",
			}}
		>
			{settingsView === "main" ? (
				// Main Settings Menu
				<Box>
					<Box
						onClick={() => setSettingsView("speed")}
						px="md"
						py="sm"
						style={{
							cursor: "pointer",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
						className="hover:bg-white/10"
					>
						<Text size="sm" c="white">
							Playback speed
						</Text>
						<Group gap="xs">
							<Text size="sm" c="gray">
								{playbackRate === 1 ? "Normal" : `${playbackRate}x`}
							</Text>
							<Text size="sm" c="gray">
								›
							</Text>
						</Group>
					</Box>

					{/* Uncomment when implementing quality selector
          <Box
            px="md"
            py="sm"
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="hover:bg-white/10"
          >
            <Text size="sm" c="white">
              Quality
            </Text>
            <Group gap="xs">
              <Text size="sm" c="gray">
                Auto
              </Text>
              <Text size="sm" c="gray">
                ›
              </Text>
            </Group>
          </Box>
          */}
				</Box>
			) : (
				// Speed Submenu
				<Box>
					{/* Back button */}
					<Box
						onClick={() => setSettingsView("main")}
						px="md"
						py="sm"
						style={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							gap: "8px",
							borderBottom: "1px solid rgba(255,255,255,0.1)",
						}}
						className="hover:bg-white/10"
					>
						<Text size="sm" c="gray">
							‹
						</Text>
						<Text size="sm" c="white">
							Playback speed
						</Text>
					</Box>

					{/* Speed options */}
					{[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
						<Box
							key={rate}
							onClick={() => {
								changePlaybackRate(rate);
								setSettingsView("main");
							}}
							px="md"
							py="sm"
							style={{
								cursor: "pointer",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								backgroundColor:
									playbackRate === rate
										? "rgba(255,255,255,0.15)"
										: "transparent",
							}}
							className="hover:bg-white/10"
						>
							<Text size="sm" c="white" fw={playbackRate === rate ? 600 : 400}>
								{rate === 1 ? "Normal" : `${rate}`}
							</Text>
							{playbackRate === rate && (
								<Text size="sm" c="white">
									✓
								</Text>
							)}
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
}
