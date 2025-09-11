import { createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { anime } from "../../db/schema/content";
import {
	ApiRequestByIdParams,
	ApiRequestListQuery,
} from "../../types/api-request";
import {
	ApiErrorResponse,
	ApiResponseList,
	ApiResponseSingle,
} from "../../types/api-response";

const AnimeSchema = createSelectSchema(anime);

// export const AnimeSchema = t.Object({
// 	animeId: t.Number(),
// 	title: t.String(),
// 	originalTitle: t.String(),
// 	description: t.Optional(t.String()),
// 	coverImageUrl: t.Optional(t.String()),
// 	bannerImageUrl: t.Optional(t.String()),
// 	release_year: t.Optional(t.Number()),
// 	status: t.String(),
// 	totalEpisodes: t.Number(),
// 	averageRating: t.Number(),
// 	ageRating: t.Optional(t.String()),
// 	createdAt: t.String(),
// 	updatedAt: t.String(),
// });

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

export type AnimeType = typeof AnimeSchema.static;
export type AnimeListItem = typeof AnimeListItemSchema.static;

export type GetAnimeRequest = typeof GetAnimeRequestSchema.static;
export type GetAnimeResponse = typeof GetAnimeResponseSchema.static;
export type GetSingleAnimeRequest = typeof GetSingleAnimeRequestSchema.static;
export type GetSingleAnimeResponse = typeof GetSingleAnimeResponseSchema.static;
export type GetSingleAnimeErrorResponse =
	typeof GetSingleAnimeErrorResponseSchema.static;
