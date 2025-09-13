import { Elysia } from "elysia";
import {
	DeleteAnimeRequestSchema,
	DeleteAnimeResponseSchema,
	GetAnimeRequestSchema,
	GetAnimeResponseSchema,
	GetSingleAnimeRequestSchema,
	GetSingleAnimeResponseSchema,
	PatchAnimeRequestSchema,
	PatchAnimeResponseSchema,
	PostAnimeRequestSchema,
	PostAnimeResponseSchema,
} from "./anime.schema";
import { Anime } from "./anime.service";

export const AnimeService = new Elysia({
	name: "Service.Anime",
	prefix: "/anime",
})
	.get(
		"/",
		async ({ query }) => {
			const page = Number(query.page ?? 1);
			const limit = Number(query.limit ?? 20);

			const { data, meta } = await Anime.getAnimeList(
				page,
				limit,
				query.status,
			);

			return {
				data,
				meta,
				links: {
					self: `/anime?page=${meta.page}&limit=${meta.limit}`,
					next:
						meta.page < meta.totalPages
							? `/anime?page=${meta.page + 1}&limit=${meta.limit}`
							: null,
					prev:
						meta.page > 1
							? `/anime?page=${meta.page - 1}&limit=${meta.limit}`
							: null,
					first: `/anime?page=1&limit=${meta.limit}`,
					last: `/anime?page=${meta.totalPages}&limit=${meta.limit}`,
				},
				message: "Anime list fetched successfully",
			};
		},
		{
			query: GetAnimeRequestSchema,
			response: GetAnimeResponseSchema,
			detail: {
				summary: "Paginated list of anime",
				tags: ["Anime"],
			},
		},
	)
	.get(
		"/:id",
		async ({ params }) => {
			const data = await Anime.getAnimeById(Number(params.id));

			return {
				data,
				message: "Anime details fetched successfully",
			};
		},
		{
			params: GetSingleAnimeRequestSchema,
			response: GetSingleAnimeResponseSchema,
			detail: {
				summary: "Get anime by ID",
				tags: ["Anime"],
			},
		},
	)
	.post(
		"/",
		async ({ body, set }) => {
			const data = await Anime.createAnime(body.data);

			set.status = 201;
			return {
				data,
				message: "Anime created successfully",
			};
		},
		{
			body: PostAnimeRequestSchema,
			response: PostAnimeResponseSchema,
			detail: {
				summary: "Create a new anime",
				tags: ["Anime"],
			},
		},
	)
	.patch(
		"/:id",
		async ({ params, body }) => {
			const data = await Anime.updateAnime(Number(params.id), body.data);

			return {
				data,
				message: "Anime updated successfully",
			};
		},
		{
			params: GetSingleAnimeRequestSchema,
			body: PatchAnimeRequestSchema,
			response: PatchAnimeResponseSchema,
			detail: {
				summary: "Update an existing anime",
				tags: ["Anime"],
			},
		},
	)
	.delete(
		"/:id",
		async ({ params }) => {
			await Anime.deleteAnime(Number(params.id));

			return {
				message: "Anime deleted successfully",
			};
		},
		{
			params: DeleteAnimeRequestSchema,
			response: DeleteAnimeResponseSchema,
			detail: {
				summary: "Delete an anime",
				tags: ["Anime"],
			},
		},
	);
