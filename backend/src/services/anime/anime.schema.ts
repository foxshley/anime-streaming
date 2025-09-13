import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox";
import { t } from "elysia";
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

export const GetAnimeRequestSchema = t.Composite([
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
export const GetAnimeResponseSchema = ApiResponseList(AnimeListItemSchema);
export const GetSingleAnimeRequestSchema = ApiRequestByIdParams;
export const GetSingleAnimeResponseSchema = ApiResponseSingle(AnimeSchema);

export const PostAnimeRequestSchema = ApiRequestCreateBody(AnimeInsertSchema);
export const PostAnimeResponseSchema = ApiResponseSingle(AnimeSchema);

export const PatchAnimeRequestSchema = ApiRequestUpdateBody(AnimeUpdateSchema);
export const PatchAnimeResponseSchema = ApiResponseSingle(AnimeSchema);

export const DeleteAnimeRequestSchema = ApiRequestByIdParams;
export const DeleteAnimeResponseSchema = ApiResponseDelete;

export type AnimeType = typeof AnimeSchema.static;
export type AnimeInsertType = typeof AnimeInsertSchema.static;
export type AnimeUpdateType = typeof AnimeUpdateSchema.static;
export type AnimeListItem = typeof AnimeListItemSchema.static;
