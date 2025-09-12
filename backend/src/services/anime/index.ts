import { Elysia } from "elysia";
import {
	DeleteAnimeErrorResponseSchema,
	DeleteAnimeRequestSchema,
	DeleteAnimeResponseSchema,
	GetAnimeRequestSchema,
	GetAnimeResponseSchema,
	GetSingleAnimeErrorResponseSchema,
	GetSingleAnimeRequestSchema,
	GetSingleAnimeResponseSchema,
	PatchAnimeErrorResponseSchema,
	PatchAnimeRequestSchema,
	PatchAnimeResponseSchema,
	PostAnimeErrorResponseSchema,
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
			const response = await Anime.getAnimeList(query);
			return response;
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
		async ({ params, set }) => {
			const response = await Anime.getAnimeById(params);
			if ("errors" in response) {
				set.status = 404;
				return response;
			}

			return response;
		},
		{
			params: GetSingleAnimeRequestSchema,
			response: {
				200: GetSingleAnimeResponseSchema,
				404: GetSingleAnimeErrorResponseSchema,
			},
			detail: {
				summary: "Get anime by ID",
				tags: ["Anime"],
			},
		},
	)
	.post(
		"/",
		async ({ body, set }) => {
			const response = await Anime.createAnime(body);

			if ("errors" in response) {
				set.status = response.errors[0]?.status || 500;
				return response;
			}

			set.status = 201;
			return response;
		},
		{
			body: PostAnimeRequestSchema,
			response: {
				201: PostAnimeResponseSchema,
				500: PostAnimeErrorResponseSchema,
			},
			detail: {
				summary: "Create a new anime",
				tags: ["Anime"],
			},
		},
	)
	.patch(
		"/:id",
		async ({ params, body, set }) => {
			const response = await Anime.updateAnime(params.id, body);

			if ("errors" in response) {
				set.status = response.errors[0]?.status || 500;
				return response;
			}

			return response;
		},
		{
			params: GetSingleAnimeRequestSchema,
			body: PatchAnimeRequestSchema,
			response: {
				200: PatchAnimeResponseSchema,
				500: PatchAnimeErrorResponseSchema,
			},
			detail: {
				summary: "Update an existing anime",
				tags: ["Anime"],
			},
		},
	)
	.delete(
		"/:id",
		async ({ params, set }) => {
			const response = await Anime.deleteAnime(params.id);
			if ("errors" in response) {
				set.status = response.errors[0]?.status || 500;
				return response;
			}

			return response;
		},
		{
			params: DeleteAnimeRequestSchema,
			response: {
				200: DeleteAnimeResponseSchema,
				404: DeleteAnimeErrorResponseSchema,
				500: DeleteAnimeErrorResponseSchema,
			},
			detail: {
				summary: "Delete an anime",
				tags: ["Anime"],
			},
		},
	);
