import { describe, expect, it, spyOn } from "bun:test";
import { AnimeRepository } from "../../../src/repositories/anime.repository";
import { AnimeService } from "../../../src/services/anime";

describe("Anime Service", () => {
	it("GET /anime/", async () => {
		const animeData = [
			{
				animeId: 1,
				title: "Neon Genesis Evangelion",
				originalTitle: "新世紀エヴァンゲリオン",
				totalEpisodes: 26,
			},
			{
				animeId: 2,
				title: "Cowboy Bebop",
				originalTitle: "カウボーイビバップ",
				totalEpisodes: 26,
			},
		];

		// Mock the repository methods
		spyOn(AnimeRepository, "countAll").mockResolvedValueOnce(animeData.length);
		spyOn(AnimeRepository, "findAll").mockResolvedValueOnce(animeData);

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/"),
		).then((res) => res.json());

		expect(response.data).toBeInstanceOf(Array);
		expect(response.data.length).toBe(2);
		expect(response.meta).toBeDefined();
		expect(response.links).toBeDefined();
		expect(response.message).toBe("Anime list fetched successfully");
	});

	it("GET /anime/:id", async () => {
		const animeData = {
			animeId: 1,
			title: "Neon Genesis Evangelion",
			originalTitle: "新世紀エヴァンゲリオン",
			description: "A story about teenagers piloting giant robots.",
			coverImageUrl: "",
			bannerImageUrl: "",
			release_year: 1995,
			status: "completed",
			totalEpisodes: 26,
			averageRating: "4.5",
			ageRating: "PG-13",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Mock the repository methods
		spyOn(AnimeRepository, "findById").mockResolvedValueOnce(animeData);

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/1"),
		).then((res) => res.json());

		expect(response.data).toBeInstanceOf(Object);
		expect(response.data.animeId).toBe(1);
		expect(response.message).toBe("Anime details fetched successfully");
	});

	it("GET /anime/:id - Not Found", async () => {
		// Mock the repository methods
		spyOn(AnimeRepository, "findById").mockResolvedValueOnce(null);

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/9999"),
		).then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(404);
		expect(response.errors[0].title).toBe("Not Found");
	});

	it("POST /anime/", async () => {
		const newAnimeData = {
			title: "Date A Live",
			originalTitle: "デート・ア・ライブ",
			description: "A story about dating spirits to save the world.",
			coverImageUrl: "",
			bannerImageUrl: "",
			release_year: 2013,
			status: "ongoing",
			totalEpisodes: 12,
			averageRating: "4.0",
			ageRating: "PG-13",
		};

		// Mock the repository methods
		spyOn(AnimeRepository, "create").mockResolvedValueOnce({
			animeId: 3,
			...newAnimeData,
		});

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: newAnimeData }),
			}),
		).then((res) => res.json());

		expect(response.data).toBeInstanceOf(Object);
		expect(response.data.title).toBe("Date A Live");
		expect(response.message).toBe("Anime created successfully");
	});

	it("PATCH /anime/:id", async () => {
		const animeData = {
			animeId: 3,
			title: "Date A Live",
			originalTitle: "デート・ア・ライブ",
			description: "A story about dating spirits to save the world.",
			coverImageUrl: "",
			bannerImageUrl: "",
			release_year: 2013,
			status: "ongoing",
			totalEpisodes: 12,
			averageRating: "4.0",
			ageRating: "PG-13",
		};

		const updateData = {
			title: "Date A Live II",
			totalEpisodes: 24,
		};

		// Mock the repository methods
		spyOn(AnimeRepository, "update").mockResolvedValueOnce({
			...animeData,
			...updateData,
		});

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/3", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: updateData }),
			}),
		).then((res) => res.json());

		expect(response.data).toBeInstanceOf(Object);
		expect(response.data.title).toBe("Date A Live II");
		expect(response.data.totalEpisodes).toBe(24);
		expect(response.message).toBe("Anime updated successfully");
	});

	it('PATCH /anime/:id - Not Found', async () => {
		const updateData = {
			title: "Non-Existent Anime",
		};

		// Mock the repository methods
		spyOn(AnimeRepository, "update").mockResolvedValueOnce(null);

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/9999", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: updateData }),
			}),
		).then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(404);
		expect(response.errors[0].title).toBe("Not Found");
	});

	it("DELETE /anime/:id", async () => {
		// Mock the repository methods
		spyOn(AnimeRepository, "delete").mockResolvedValueOnce(true);

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/3", {
				method: "DELETE",
			}),
		).then((res) => res.json());

		expect(response.message).toBe("Anime deleted successfully");
	});

	it("DELETE /anime/:id - Not Found", async () => {
		// Mock the repository methods
		spyOn(AnimeRepository, "delete").mockResolvedValueOnce(false);

		const response = await AnimeService.handle(
			new Request("http://localhost/anime/9999", {
				method: "DELETE",
			}),
		).then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(404);
		expect(response.errors[0].title).toBe("Not Found");
	});
});
