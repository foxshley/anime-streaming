import { type TSchema, t } from "elysia";

export const ApiRequestListQuery = t.Object({
	page: t.Optional(t.Number({ minimum: 1 })),
	limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
	sort_order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
});

export const ApiRequestByIdParams = t.Object({
	id: t.String(), // Or t.UUID() if using UUIDs
});

export function ApiRequestCreateBody<T extends TSchema>(schema: T) {
	return t.Object({
		data: schema,
	});
}

export function ApiRequestUpdateBody<T extends TSchema>(schema: T) {
	return t.Object({
		data: t.Partial(schema), // Partial for updates
	});
}
