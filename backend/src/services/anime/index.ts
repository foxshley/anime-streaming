import { Elysia } from "elysia";
import {
	GetAnimeRequestSchema,
	GetAnimeResponseSchema,
	GetSingleAnimeErrorResponseSchema,
	GetSingleAnimeRequestSchema,
	GetSingleAnimeResponseSchema,
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
	);
