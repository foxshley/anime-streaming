import { and, count, eq } from "drizzle-orm";
import { InternalServerError } from "elysia";
import { db } from "../db";
import { anime } from "../db/schema/content";
import type {
	AnimeInsertType,
	AnimeListItem,
	AnimeType,
	AnimeUpdateType,
} from "../services/anime/anime.schema";

async function countAll(status?: string): Promise<number> {
	const conditions = [];
	if (status) {
		conditions.push(eq(anime.status, status));
	}

	const result = await db
		.select({ count: count(anime.animeId) })
		.from(anime)
		.where(conditions.length ? and(...conditions) : undefined);

	return Number(result[0]?.count ?? 0);
}

async function findAll(
	limit: number,
	offset: number,
	status?: string,
): Promise<AnimeListItem[]> {
	try {
		const conditions = [];
		if (status) {
			conditions.push(eq(anime.status, status));
		}

		return db
			.select({
				animeId: anime.animeId,
				title: anime.title,
				originalTitle: anime.originalTitle,
				totalEpisodes: anime.totalEpisodes,
			})
			.from(anime)
			.where(conditions.length ? and(...conditions) : undefined)
			.limit(limit)
			.offset(offset);
	} catch (err) {
		throw new InternalServerError(`DB_ERROR: ${(err as Error).message}`);
	}
}

async function findById(id: number): Promise<AnimeType | null> {
	try {
		const result = await db
			.select()
			.from(anime)
			.where(eq(anime.animeId, id))
			.limit(1);

		return result[0] ?? null;
	} catch (err) {
		throw new InternalServerError(`DB_ERROR: ${(err as Error).message}`);
	}
}

async function create(data: AnimeInsertType): Promise<AnimeType> {
	try {
		const [newAnime] = await db.insert(anime).values(data).returning();

		return newAnime;
	} catch (err) {
		throw new InternalServerError(`DB_ERROR: ${(err as Error).message}`);
	}
}

async function update(
	id: number,
	data: AnimeUpdateType,
): Promise<AnimeType | null> {
	try {
		const [updatedAnime] = await db
			.update(anime)
			.set(data)
			.where(eq(anime.animeId, id))
			.returning();

		return updatedAnime ?? null;
	} catch (err) {
		throw new InternalServerError(`DB_ERROR: ${(err as Error).message}`);
	}
}

async function remove(id: number): Promise<boolean> {
	try {
		const deleted = await db
			.delete(anime)
			.where(eq(anime.animeId, id))
			.returning();

		return deleted.length > 0;
	} catch (err) {
		throw new InternalServerError(`DB_ERROR: ${(err as Error).message}`);
	}
}

export const AnimeRepository = {
	countAll,
	findAll,
	findById,
	create,
	update,
	remove,
};
