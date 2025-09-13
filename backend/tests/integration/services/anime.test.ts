import { describe, expect, it } from "bun:test";
import { app } from "../../../src/app";

describe("Anime Service", () => {
	it("GET /anime/", async () => {
		const response = await app
			.handle(new Request("http://localhost/anime/"))
			.then((res) => res.json());

		expect(response.data).toBeInstanceOf(Array);
		expect(response.data.length).toBeGreaterThan(0);
		expect(response.meta).toBeDefined();
		expect(response.links).toBeDefined();
		expect(response.message).toBe("Anime list fetched successfully");
	});

	it("GET /anime/:id", async () => {
		const response = await app
			.handle(new Request("http://localhost/anime/1"))
			.then((res) => res.json());

		expect(response.data).toBeInstanceOf(Object);
		expect(response.data.animeId).toBe(1);
		expect(response.message).toBe("Anime details fetched successfully");
	});

	it("GET /anime/:id - Not Found", async () => {
		// Mock the repository methods
		const response = await app
			.handle(new Request("http://localhost/anime/9999"))
			.then((res) => res.json());

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

		const response = await app
			.handle(
				new Request("http://localhost/anime/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: newAnimeData }),
				}),
			)
			.then((res) => res.json());

		expect(response.data).toBeInstanceOf(Object);
		expect(response.data.title).toBe("Date A Live");
		expect(response.message).toBe("Anime created successfully");
	});

	it("POST /anime/ - Validation Error", async () => {
		const newAnimeData = {
			title: 2342432,
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

		const response = await app
			.handle(
				new Request("http://localhost/anime/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: newAnimeData }),
				}),
			)
			.then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(422);
		expect(response.errors[0].title).toBe("Validation Error");
	});

	it("PATCH /anime/:id", async () => {
		const updateData = {
			title: "Date A Live II",
			totalEpisodes: 24,
		};

		const response = await app
			.handle(
				new Request("http://localhost/anime/3", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: updateData }),
				}),
			)
			.then((res) => res.json());

		expect(response.data).toBeInstanceOf(Object);
		expect(response.data.title).toBe("Date A Live II");
		expect(response.data.totalEpisodes).toBe(24);
		expect(response.message).toBe("Anime updated successfully");
	});

	it("PATCH /anime/:id - Not Found", async () => {
		const updateData = {
			title: "Non-Existent Anime",
		};

		const response = await app
			.handle(
				new Request("http://localhost/anime/9999", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: updateData }),
				}),
			)
			.then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(404);
		expect(response.errors[0].title).toBe("Not Found");
	});

	it("PATCH /anime/:id - Validation Error", async () => {
		const updateData = {
			title: 2342432,
		};

		const response = await app
			.handle(
				new Request("http://localhost/anime/3", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: updateData }),
				}),
			)
			.then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(422);
		expect(response.errors[0].title).toBe("Validation Error");
	});

	it("DELETE /anime/:id", async () => {
		const response = await app
			.handle(
				new Request("http://localhost/anime/3", {
					method: "DELETE",
				}),
			)
			.then((res) => res.json());

		expect(response.message).toBe("Anime deleted successfully");
	});

	it("DELETE /anime/:id - Not Found", async () => {
		const response = await app
			.handle(
				new Request("http://localhost/anime/9999", {
					method: "DELETE",
				}),
			)
			.then((res) => res.json());

		expect(response.errors).toBeInstanceOf(Array);
		expect(response.errors[0].status).toBe(404);
		expect(response.errors[0].title).toBe("Not Found");
	});
});
