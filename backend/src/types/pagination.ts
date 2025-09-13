import { t } from "elysia";

export const PaginationMetaSchema = t.Object({
	page: t.Number(),
	limit: t.Number(),
	totalItems: t.Number(),
	totalPages: t.Number(),
});

export const PaginationLinksSchema = t.Object({
	self: t.String(),
	next: t.Union([t.String(), t.Null()]),
	prev: t.Union([t.String(), t.Null()]),
	first: t.String(),
	last: t.String(),
});

export type PaginationMetaType = typeof PaginationMetaSchema.static;
export type PaginationLinksType = typeof PaginationLinksSchema.static;
