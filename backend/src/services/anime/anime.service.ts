import { AnimeRepository } from "../../repositories/anime.repository";
import type {
	GetAnimeRequest,
	GetAnimeResponse,
	GetSingleAnimeErrorResponse,
	GetSingleAnimeRequest,
	GetSingleAnimeResponse,
} from "./anime.schema";

// const fakeDb = new Array(1000).fill(0).map((_, i) => ({
// 	animeId: i + 1,
// 	title: `Anime #${i + 1}`,
// 	originalTitle: `Original Anime #${i + 1}`,
// 	description: `Description for anime ${i + 1}`,
// 	coverImageUrl: "",
// 	bannerImageUrl: "",
// 	release_year: 2000 + (i % 25),
// 	status: i % 2 ? "ongoing" : "completed",
// 	totalEpisodes: Math.floor(Math.random() * 200),
// 	averageRating: String((Math.random() * 5).toFixed(2)),
// 	ageRating: "PG-13",
// 	createdAt: new Date().toISOString(),
// 	updatedAt: new Date().toISOString(),
// }));

export abstract class Anime {
	static async getAnimeList(query: GetAnimeRequest): Promise<GetAnimeResponse> {
		const page = Number(query.page ?? 1);
		const limit = Math.min(Number(query.limit ?? 20), 100); // cap limit at 100
		const offset = (page - 1) * limit;

		// count total first
		const totalItems = await AnimeRepository.countAll(query.status);
		const totalPages = Math.ceil(totalItems / limit);

		// Fetch paginated rows
		const rows = await AnimeRepository.findAll(limit, offset, query.status);

		return {
			data: rows,
			meta: {
				page,
				limit,
				totalItems,
				totalPages,
			},
			links: {
				self: `/anime?page=${page}&limit=${limit}`,
				next:
					page < totalPages ? `/anime?page=${page + 1}&limit=${limit}` : null,
				prev: page > 1 ? `/anime?page=${page - 1}&limit=${limit}` : null,
				first: `/anime?page=1&limit=${limit}`,
				last: `/anime?page=${totalPages}&limit=${limit}`,
			},
			message: "Anime list fetched successfully",
		};
	}

	static async getAnimeById(
		params: GetSingleAnimeRequest,
	): Promise<GetSingleAnimeResponse | GetSingleAnimeErrorResponse> {
		const animeData = await AnimeRepository.findById(Number(params.id));

		if (!animeData) {
			return {
				errors: [
					{
						status: 404,
						title: "Not Found",
						detail: `Anime not found`,
					},
				],
			};
		}

		return {
			data: animeData,
			message: "Anime details fetched successfully",
		};
	}
}
