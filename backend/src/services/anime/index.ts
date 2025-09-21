import { Elysia } from "elysia";
import { AnimeModel } from "./anime.schema";
import { Anime } from "./anime.service";

export const AnimeService = new Elysia({
	name: "Service.Anime",
	prefix: "/anime",
})
	.use(AnimeModel)
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
			query: "anime.get.req.query",
			response: "anime.get.res",
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
			params: "anime.get.id.req.params",
			response: "anime.get.id.res",
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
			body: "anime.post.req.body",
			response: "anime.post.res",
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
			params: "anime.patch.req.params",
			body: "anime.patch.req.body",
			response: "anime.patch.res",
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
			params: "anime.delete.req.params",
			response: "anime.delete.res",
			detail: {
				summary: "Delete an anime",
				tags: ["Anime"],
			},
		},
	);
