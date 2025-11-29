import { type RefObject, useEffect, useRef, useState } from "react";

const SKIP_DURATION_SECONDS = 10;
const VOLUME_CHANGE_STEP = 0.1;

export function useVideoPlayer(videoRef: RefObject<HTMLVideoElement>) {
	const settingsRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [hasEnded, setHasEnded] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isBuffering, setIsBuffering] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);
	const [settingsView, setSettingsView] = useState<"main" | "speed">("main");

	// Video event listeners
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const updateTime = () => setCurrentTime(video.currentTime);
		const updateDuration = () => setDuration(video.duration);
		const handleWaiting = () => setIsBuffering(true);
		const handleCanPlay = () => setIsBuffering(false);
		const handlePlaying = () => setIsBuffering(false);
		const handleEnded = () => {
			setIsPlaying(false);
			setHasEnded(true);
			setShowControls(true);
		};
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
		video.addEventListener("ended", handleEnded);

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
			video.removeEventListener("ended", handleEnded);
		};
	}, [videoRef]);

	// Settings menu click outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			const settingsMenu = settingsRef.current;

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

	const handleReplay = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.play();
			setIsPlaying(true);
			setHasEnded(false);
		}
	};

	const togglePlay = () => {
		if (!videoRef.current) return;

		if (hasEnded) {
			handleReplay();
		} else if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
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

	return {
		// Refs
		settingsRef,

		// State
		isPlaying,
		hasEnded,
		currentTime,
		duration,
		playbackRate,
		volume,
		isMuted,
		isBuffering,
		showControls,
		showSettingsMenu,
		settingsView,

		// State setters
		setShowControls,
		setShowSettingsMenu,
		setSettingsView,

		// Handlers
		togglePlay,
		handleSeek,
		handleReplay,
		handleVolumeChange,
		toggleMute,
		toggleFullscreen,
		skip,
		changePlaybackRate,
		formatTime,

		// Constants
		SKIP_DURATION_SECONDS,
		VOLUME_CHANGE_STEP,
	};
}
