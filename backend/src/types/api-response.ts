import { type TSchema, t } from "elysia";

export function ApiResponseSingle<T extends TSchema>(schema: T) {
	return t.Object({
		data: schema,
		meta: t.Optional(t.Object({})),
		links: t.Optional(t.Object({})),
		message: t.Optional(t.String()),
	});
}

export function ApiResponseList<T extends TSchema>(schema: T) {
	return t.Object({
		data: t.Array(schema),
		meta: t.Object({
			page: t.Number(),
			limit: t.Number(),
			totalItems: t.Number(),
			totalPages: t.Number(),
		}),
		links: t.Object({
			self: t.String(),
			next: t.Union([t.String(), t.Null()]),
			prev: t.Union([t.String(), t.Null()]),
			first: t.String(),
			last: t.String(),
		}),
		message: t.Optional(t.String()),
	});
}

export const ApiResponseDelete = t.Object({
	meta: t.Optional(t.Object({})),
	message: t.Optional(t.String()),
});

export const ApiErrorResponse = t.Object({
	errors: t.Array(
		t.Object({ status: t.Number(), title: t.String(), detail: t.String() }),
	),
});
