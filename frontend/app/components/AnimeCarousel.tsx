import { ActionIcon, Box, ScrollArea, Title, Tooltip } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { AnimeCard } from "./AnimeCard";

interface AnimeItem {
	id: string;
	title: string;
	image: string;
	rating?: string;
	year?: string;
	episodes?: string;
}

interface AnimeCarouselProps {
	title: string;
	items: AnimeItem[];
}

export function AnimeCarousel({ title, items }: AnimeCarouselProps) {
	const viewportRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (viewportRef.current) {
			const scrollAmount = 320;
			const newScrollLeft =
				viewportRef.current.scrollLeft +
				(direction === "right" ? scrollAmount : -scrollAmount);
			viewportRef.current.scrollTo({
				left: newScrollLeft,
				behavior: "smooth",
			});
		}
	};

	return (
		<Box px={{ base: "md", md: 64 }} mb="xl">
			<Title order={2} c="white" mb="md">
				{title}
			</Title>

			<Box
				pos="relative"
				className="carousel-container"
				style={{
					position: "relative",
				}}
			>
				{/* Left Scroll Button */}
				<Tooltip label="Previous" position="right">
					<ActionIcon
						variant="subtle"
						size="lg"
						className="scroll-button-left"
						onClick={() => scroll("left")}
						style={{
							position: "absolute",
							left: 0,
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 10,
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							color: "white",
							opacity: 0,
							transition: "opacity 0.2s",
						}}
					>
						<ChevronLeft size={24} />
					</ActionIcon>
				</Tooltip>

				{/* Scrollable Content */}
				<ScrollArea
					viewportRef={viewportRef}
					type="never"
					style={{
						width: "100%",
					}}
				>
					<Box
						style={{
							display: "flex",
							gap: "1rem",
						}}
					>
						{items.map((item) => (
							<Box
								key={item.id}
								style={{
									flexShrink: 0,
									width: "320px",
								}}
							>
								<AnimeCard
									title={item.title}
									image={item.image}
									rating={item.rating}
									year={item.year}
									episodes={item.episodes}
								/>
							</Box>
						))}
					</Box>
				</ScrollArea>

				{/* Right Scroll Button */}
				<Tooltip label="Next" position="left">
					<ActionIcon
						variant="subtle"
						size="lg"
						className="scroll-button-right"
						onClick={() => scroll("right")}
						style={{
							position: "absolute",
							right: 0,
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 10,
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							color: "white",
							opacity: 0,
							transition: "opacity 0.2s",
						}}
					>
						<ChevronRight size={24} />
					</ActionIcon>
				</Tooltip>
			</Box>

			<style>{`
        .carousel-container:hover .scroll-button-left,
        .carousel-container:hover .scroll-button-right {
          opacity: 1 !important;
        }
        
        .scroll-button-left:hover,
        .scroll-button-right:hover {
          background-color: rgba(0, 0, 0, 0.7) !important;
        }
      `}</style>
		</Box>
	);
}
