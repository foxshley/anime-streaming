import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox";
import { Elysia, t } from "elysia";
import { anime } from "../../db/schema/content";
import {
	ApiRequestByIdParams,
	ApiRequestCreateBody,
	ApiRequestListQuery,
	ApiRequestUpdateBody,
} from "../../types/api-request";
import {
	ApiResponseDelete,
	ApiResponseList,
	ApiResponseSingle,
} from "../../types/api-response";

const _animeSchema = createSelectSchema(anime);
const _animeInsertSchema = createInsertSchema(anime);
const _animeUpdateSchema = createUpdateSchema(anime);

const AnimeSchema = t.Omit(_animeSchema, ["createdAt", "updatedAt"]);
const AnimeInsertSchema = t.Omit(_animeInsertSchema, [
	"animeId",
	"createdAt",
	"updatedAt",
]);
const AnimeUpdateSchema = t.Omit(_animeUpdateSchema, [
	"animeId",
	"createdAt",
	"updatedAt",
]);

export const AnimeListItemSchema = t.Pick(AnimeSchema, [
	"animeId",
	"title",
	"originalTitle",
	"totalEpisodes",
]);

export const GetAnimeListReqQuerySchema = t.Composite([
	ApiRequestListQuery,
	t.Object({
		status: t.Optional(t.String({ maxLength: 20 })),
		release_year: t.Optional(t.Number({ minimum: 1900, maximum: 32767 })),
		sort_field: t.Optional(
			t.Union([
				t.Literal("title"),
				t.Literal("release_year"),
				t.Literal("averageRating"),
			]),
		),
	}),
]);

const GetAnimeListResSchema = ApiResponseList(AnimeListItemSchema);
const GetAnimeSingleReqParamsSchema = ApiRequestByIdParams;
const GetAnimeSingleResSchema = ApiResponseSingle(AnimeSchema);

const PostAnimeBodySchema = ApiRequestCreateBody(AnimeInsertSchema);
const PostAnimeResSchema = ApiResponseSingle(AnimeSchema);

const PatchAnimeReqParamsSchema = ApiRequestByIdParams;
const PatchAnimeBodySchema = ApiRequestUpdateBody(AnimeUpdateSchema);
const PatchAnimeResSchema = ApiResponseSingle(AnimeSchema);

const DeleteAnimeReqParamsSchema = ApiRequestByIdParams;
const DeleteAnimeResSchema = ApiResponseDelete;

export const AnimeModel = new Elysia().model({
	// GET /anime
	"anime.get.req.query": GetAnimeListReqQuerySchema,
	"anime.get.res": GetAnimeListResSchema,

	// GET /anime/:id
	"anime.get.id.req.params": GetAnimeSingleReqParamsSchema,
	"anime.get.id.res": GetAnimeSingleResSchema,

	// POST /anime
	"anime.post.req.body": PostAnimeBodySchema,
	"anime.post.res": PostAnimeResSchema,

	// PATCH /anime/:id
	"anime.patch.req.params": PatchAnimeReqParamsSchema,
	"anime.patch.req.body": PatchAnimeBodySchema,
	"anime.patch.res": PatchAnimeResSchema,

	// DELETE /anime/:id
	"anime.delete.req.params": DeleteAnimeReqParamsSchema,
	"anime.delete.res": DeleteAnimeResSchema,
});

export type AnimeType = typeof AnimeSchema.static;
export type AnimeInsertType = typeof AnimeInsertSchema.static;
export type AnimeUpdateType = typeof AnimeUpdateSchema.static;
export type AnimeListItem = typeof AnimeListItemSchema.static;
