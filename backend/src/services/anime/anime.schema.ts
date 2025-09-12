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
	ApiErrorResponse,
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
export const GetSingleAnimeErrorResponseSchema = ApiErrorResponse;

export const PostAnimeRequestSchema = ApiRequestCreateBody(AnimeInsertSchema);
export const PostAnimeResponseSchema = ApiResponseSingle(AnimeSchema);
export const PostAnimeErrorResponseSchema = ApiErrorResponse;

export const PatchAnimeRequestSchema = ApiRequestUpdateBody(AnimeUpdateSchema);
export const PatchAnimeResponseSchema = ApiResponseSingle(AnimeSchema);
export const PatchAnimeErrorResponseSchema = ApiErrorResponse;

export const DeleteAnimeRequestSchema = ApiRequestByIdParams;
export const DeleteAnimeResponseSchema = ApiResponseDelete;
export const DeleteAnimeErrorResponseSchema = ApiErrorResponse;

export type AnimeType = typeof AnimeSchema.static;
export type AnimeInsertType = typeof AnimeInsertSchema.static;
export type AnimeUpdateType = typeof AnimeUpdateSchema.static;
export type AnimeListItem = typeof AnimeListItemSchema.static;

export type GetAnimeRequest = typeof GetAnimeRequestSchema.static;
export type GetAnimeResponse = typeof GetAnimeResponseSchema.static;
export type GetSingleAnimeRequest = typeof GetSingleAnimeRequestSchema.static;
export type GetSingleAnimeResponse = typeof GetSingleAnimeResponseSchema.static;
export type GetSingleAnimeErrorResponse =
	typeof GetSingleAnimeErrorResponseSchema.static;

export type PostAnimeRequest = typeof PostAnimeRequestSchema.static;
export type PostAnimeResponse = typeof PostAnimeResponseSchema.static;
export type PostAnimeErrorResponse = typeof PostAnimeErrorResponseSchema.static;

export type PatchAnimeRequest = typeof PatchAnimeRequestSchema.static;
export type PatchAnimeResponse = typeof PatchAnimeResponseSchema.static;
export type PatchAnimeErrorResponse =
	typeof PatchAnimeErrorResponseSchema.static;

export type DeleteAnimeRequest = typeof DeleteAnimeRequestSchema.static;
export type DeleteAnimeResponse = typeof DeleteAnimeResponseSchema.static;
export type DeleteAnimeErrorResponse =
	typeof DeleteAnimeErrorResponseSchema.static;
