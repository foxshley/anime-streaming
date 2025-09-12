import { and, count, eq } from "drizzle-orm";
import { db } from "../db";
import { anime } from "../db/schema/content";
import type {
	AnimeInsertType,
	AnimeListItem,
	AnimeType,
	AnimeUpdateType,
} from "../services/anime/anime.schema";

export abstract class AnimeRepository {
	static async countAll(status?: string): Promise<number> {
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

	static async findAll(
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

	static async findById(id: number): Promise<AnimeType | null> {
		const result = await db
			.select()
			.from(anime)
			.where(eq(anime.animeId, id))
			.limit(1);

		return result[0] ?? null;
	}

	static async create(data: AnimeInsertType): Promise<AnimeType> {
		const [newAnime] = await db.insert(anime).values(data).returning();

		return newAnime;
	}

	static async update(
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

	static async delete(id: number): Promise<boolean> {
		const deleted = await db
			.delete(anime)
			.where(eq(anime.animeId, id))
			.returning();

		return deleted.length > 0;
	}
}
