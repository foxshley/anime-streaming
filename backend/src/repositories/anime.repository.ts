import { and, count, eq } from "drizzle-orm";
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
}

async function findById(id: number): Promise<AnimeType | null> {
	const result = await db
		.select()
		.from(anime)
		.where(eq(anime.animeId, id))
		.limit(1);

	return result[0] ?? null;
}

async function create(data: AnimeInsertType): Promise<AnimeType> {
	const [newAnime] = await db.insert(anime).values(data).returning();

	return newAnime;
}

async function update(
	id: number,
	data: AnimeUpdateType,
): Promise<AnimeType | null> {
	const [updatedAnime] = await db
		.update(anime)
		.set(data)
		.where(eq(anime.animeId, id))
		.returning();

	return updatedAnime ?? null;
}

async function remove(id: number): Promise<boolean> {
	const deleted = await db
		.delete(anime)
		.where(eq(anime.animeId, id))
		.returning();

	return deleted.length > 0;
}

export const AnimeRepository = {
	countAll,
	findAll,
	findById,
	create,
	update,
	remove,
};
