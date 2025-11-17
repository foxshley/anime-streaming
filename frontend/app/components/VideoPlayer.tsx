import { useState, useRef, useEffect } from "react";
import { ActionIcon, Group, Slider, Text, Box } from "@mantine/core";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  Settings,
  Loader2,
} from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
}

const SKIP_DURATION_SECONDS = 10;
const VOLUME_CHANGE_STEP = 0.1;

export function VideoPlayer({ videoUrl, posterUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [settingsView, setSettingsView] = useState<"main" | "speed">("main");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);
    const handlePlaying = () => setIsBuffering(false);

    const handleError = (e: Event) => {
      console.error("Video error: ", e);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("error", handleError);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);

    // Check if duration is already available to prevent racing condition
    if (video.duration) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("error", handleError);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const settingsMenu = settingsRef.current;

      // Only close if click is outside the menu
      if (showSettingsMenu && settingsMenu && !settingsMenu.contains(target)) {
        setShowSettingsMenu(false);
        setSettingsView("main");
      }
    };

    if (showSettingsMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettingsMenu]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      pos="relative"
      w="100%"
      h="100vh"
      bg="black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
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
        onClick={togglePlay}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Buffering Spinner */}
      {isBuffering && (
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
          opacity: showControls ? 1 : 0,
        }}
      >
        <Box mb="sm">
          <Slider
            value={currentTime}
            onChange={handleSeek}
            max={duration || 100}
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
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </ActionIcon>

            <ActionIcon
              variant="transparent"
              color="white"
              size="lg"
              onClick={() => skip(-SKIP_DURATION_SECONDS)}
            >
              <SkipBack size={20} />
            </ActionIcon>

            <ActionIcon
              variant="transparent"
              color="white"
              size="lg"
              onClick={() => skip(SKIP_DURATION_SECONDS)}
            >
              <SkipForward size={20} />
            </ActionIcon>

            <Group gap="xs" ml="sm">
              <ActionIcon
                variant="transparent"
                color="white"
                size="lg"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </ActionIcon>
              <Box w={96}>
                <Slider
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  max={1}
                  step={VOLUME_CHANGE_STEP}
                  size="sm"
                  color="white"
                  styles={{
                    thumb: { display: "none" },
                  }}
                />
              </Box>
            </Group>

            <Text size="sm" c="white" ml="sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </Group>

          <Group gap="xs" ref={settingsRef}>
            <ActionIcon
              variant="transparent"
              color="white"
              size="lg"
              onClick={(e) => {
                setShowSettingsMenu(!showSettingsMenu);
                setSettingsView("main"); // Reset to main menu when opening
              }}
            >
              <Settings size={20} />
            </ActionIcon>

            {/* Settings Menu */}
            {showSettingsMenu && (
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
                {/* TODO: Quality selector submenu */}
                {settingsView === "main" ? (
                  // Main Settings Menu
                  <Box>
                    <Box
                      onClick={(e) => setSettingsView("speed")}
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

                    {/*<Box
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
                    </Box>*/}
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
                        onClick={(e) => {
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
                        <Text
                          size="sm"
                          c="white"
                          fw={playbackRate === rate ? 600 : 400}
                        >
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
            )}

            <ActionIcon
              variant="transparent"
              color="white"
              size="lg"
              onClick={toggleFullscreen}
            >
              <Maximize size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>
    </Box>
  );
}
