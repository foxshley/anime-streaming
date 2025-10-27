import {
	Badge,
	Box,
	Button,
	Container,
	Group,
	Image,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { Info, Play } from "lucide-react";

export function Hero() {
	return (
		<Box
			style={{
				position: "relative",
				minHeight: "100vh",
				display: "flex",
				alignItems: "flex-end",
				justifyContent: "flex-start",
				overflow: "hidden",
				paddingTop: "80px", // Space for navbar - this will now work with minHeight
			}}
		>
			{/* Background Image */}
			<Box
				style={{
					position: "absolute",
					inset: 0,
				}}
			>
				<Image
					src="https://images.unsplash.com/photo-1695747003335-ac77eeea43c2"
					alt="Featured Anime"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
				{/* Gradient Overlays */}
				<Box
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
					}}
				/>
				<Box
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%, transparent 100%)",
					}}
				/>
			</Box>

			{/* Content */}
			<Box
				style={{
					position: "relative",
					zIndex: 10,
					width: "100%",
					paddingBottom: "4rem",
				}}
			>
				<Box
					pt="xl"
					style={{
						maxWidth: "42rem",
						paddingLeft: "var(--mantine-spacing-md)",
						paddingRight: "var(--mantine-spacing-md)",
						root: {
							"@media (min-width: 768px)": {
								paddingTop: 0,
							},
						},
					}}
					mx="md"
					className="hero-content"
				>
					<Box mb="md">
						<Badge
							size="lg"
							variant="light"
							color="red"
							style={{
								backgroundColor: "rgba(220, 38, 38, 0.2)",
								color: "#fca5a5",
								borderColor: "rgba(220, 38, 38, 0.3)",
							}}
						>
							Featured
						</Badge>
					</Box>
					<Title
						order={1}
						size="3.5rem"
						fw={700}
						c="white"
						mb="lg"
						style={{
							lineHeight: 1.2,
						}}
					>
						Demon Slayer
					</Title>
					<Group gap="sm" mb="xl">
						<Badge
							variant="outline"
							size="md"
							style={{
								borderColor: "rgba(34, 197, 94, 0.3)",
								color: "#86efac",
							}}
						>
							TV-MA
						</Badge>
						<Badge
							variant="outline"
							size="md"
							style={{
								borderColor: "rgba(156, 163, 175, 1)",
								color: "#d1d5db",
							}}
						>
							2023
						</Badge>
						<Badge
							variant="outline"
							size="md"
							style={{
								borderColor: "rgba(156, 163, 175, 1)",
								color: "#d1d5db",
							}}
						>
							Action • Anime • Adventure
						</Badge>
					</Group>
					<Text
						size="lg"
						c="white"
						opacity={0.9}
						mb="xl"
						style={{
							lineHeight: 1.7,
						}}
					>
						Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars
						who wears a boar's head, and Zenitsu Agatsuma, a scared boy who
						reveals his true power when he sleeps, boards the Infinity Train.
					</Text>
					<Group gap="md">
						<Tooltip label="Start watching now" position="bottom">
							<Button
								size="lg"
								leftSection={<Play size={20} fill="currentColor" />}
								style={{
									backgroundColor: "white",
									color: "black",
									paddingLeft: "2rem",
									paddingRight: "2rem",
								}}
							>
								Play
							</Button>
						</Tooltip>
						<Tooltip label="View details and cast" position="bottom">
							<Button
								size="lg"
								variant="default"
								leftSection={<Info size={20} />}
								style={{
									backgroundColor: "rgba(75, 85, 99, 0.7)",
									color: "white",
									paddingLeft: "2rem",
									paddingRight: "2rem",
									border: "none",
								}}
							>
								More Info
							</Button>
						</Tooltip>
					</Group>
				</Box>
			</Box>
		</Box>
	);
}
