import { type TSchema, t } from "elysia";
import { PaginationLinksSchema, PaginationMetaSchema } from "./pagination";

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
		meta: PaginationMetaSchema,
		links: PaginationLinksSchema,
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
