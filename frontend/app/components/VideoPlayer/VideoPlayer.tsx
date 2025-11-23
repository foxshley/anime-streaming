import { ActionIcon, Box, Group, Slider, Text } from "@mantine/core";
import {
	Loader2,
	Maximize,
	Pause,
	Play,
	RotateCcw,
	Settings,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useVideoPlayer } from "./useVideoPlayer";
import { VideoPlayerSettings } from "./VideoPlayerSettings";

interface VideoPlayerProps {
	videoUrl: string;
	posterUrl: string;
}

export function VideoPlayer({ videoUrl, posterUrl }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null!);
	const player = useVideoPlayer(videoRef);

	return (
		<Box
			pos="relative"
			w="100%"
			h="100vh"
			bg="black"
			onMouseEnter={() => player.setShowControls(true)}
			onMouseLeave={() =>
				player.setShowControls(player.isPlaying ? false : true)
			}
		>
			<video
				ref={videoRef}
				style={{
					width: "100%",
					height: "100vh",
					aspectRatio: "16/9",
					display: "block",
				}}
				poster={posterUrl}
				onClick={player.togglePlay}
			>
				<source src={videoUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* Buffering Spinner */}
			{player.isBuffering && (
				<Box
					pos="absolute"
					top="50%"
					left="50%"
					style={{
						transform: "translate(-50%, -50%)",
						pointerEvents: "none",
					}}
				>
					<Loader2
						size={48}
						color="white"
						style={{
							animation: "spin 1s linear infinite",
						}}
					/>
					<style>
						{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
					</style>
				</Box>
			)}

			{/* Replay Button Overlay */}
			{player.hasEnded && (
				<Box
					pos="absolute"
					top="50%"
					left="50%"
					style={{
						transform: "translate(-50%, -50%)",
						cursor: "pointer",
					}}
					onClick={player.handleReplay}
				>
					<Box
						style={{
							width: "80px",
							height: "80px",
							borderRadius: "50%",
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							transition: "background-color 200ms",
						}}
						className="hover:bg-black/90"
					>
						<RotateCcw size={40} color="white" />
					</Box>
				</Box>
			)}

			{/* Video controls */}
			<Box
				pos="absolute"
				bottom={0}
				left={0}
				right={0}
				p="md"
				style={{
					background:
						"linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)",
					transition: "opacity 300ms",
					opacity: player.showControls ? 1 : 0,
				}}
			>
				<Box mb="sm">
					<Slider
						value={player.currentTime}
						onChange={player.handleSeek}
						max={player.duration || 100}
						size="sm"
						color="red"
						styles={{
							track: { cursor: "pointer" },
							thumb: { display: "none" },
						}}
					/>
				</Box>

				{/* Action buttons */}
				<Group justify="space-between">
					<Group gap="xs">
						<ActionIcon
							variant="transparent"
							color="white"
							size="lg"
							onClick={player.togglePlay}
						>
							{player.isPlaying ? <Pause size={24} /> : <Play size={24} />}
						</ActionIcon>

						<ActionIcon
							variant="transparent"
							color="white"
							size="lg"
							onClick={() => player.skip(-player.SKIP_DURATION_SECONDS)}
						>
							<SkipBack size={20} />
						</ActionIcon>

						<ActionIcon
							variant="transparent"
							color="white"
							size="lg"
							onClick={() => player.skip(player.SKIP_DURATION_SECONDS)}
						>
							<SkipForward size={20} />
						</ActionIcon>

						<Group gap="xs" ml="sm">
							<ActionIcon
								variant="transparent"
								color="white"
								size="lg"
								onClick={player.toggleMute}
							>
								{player.isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
							</ActionIcon>
							<Box w={96}>
								<Slider
									value={player.isMuted ? 0 : player.volume}
									onChange={player.handleVolumeChange}
									max={1}
									step={player.VOLUME_CHANGE_STEP}
									size="sm"
									color="white"
									styles={{
										thumb: { display: "none" },
									}}
								/>
							</Box>
						</Group>

						<Text size="sm" c="white" ml="sm">
							{player.formatTime(player.currentTime)} /
							{player.formatTime(player.duration)}
						</Text>
					</Group>

					<Group gap="xs" ref={player.settingsRef}>
						<ActionIcon
							variant="transparent"
							color="white"
							size="lg"
							onClick={(e) => {
								player.setShowSettingsMenu(!player.showSettingsMenu);
								player.setSettingsView("main"); // Reset to main menu when opening
							}}
						>
							<Settings size={20} />
						</ActionIcon>

						{/* Settings Menu */}
						{player.showSettingsMenu && (
							<VideoPlayerSettings
								playbackRate={player.playbackRate}
								settingsView={player.settingsView}
								setSettingsView={player.setSettingsView}
								changePlaybackRate={player.changePlaybackRate}
							/>
						)}

						<ActionIcon
							variant="transparent"
							color="white"
							size="lg"
							onClick={player.toggleFullscreen}
						>
							<Maximize size={20} />
						</ActionIcon>
					</Group>
				</Group>
			</Box>
		</Box>
	);
}
