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
});
