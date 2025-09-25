import { NotFoundError } from "elysia";
import { AnimeRepository } from "../../repositories/anime.repository";
import type { PaginationMetaType } from "../../types/pagination";
import type {
	AnimeInsertType,
	AnimeListItemType,
	AnimeType,
	AnimeUpdateType,
} from "./anime.schema";

async function getAnimeList(
	page: number,
	limit: number,
	status?: string,
): Promise<{ data: AnimeListItemType[]; meta: PaginationMetaType }> {
	const safePage = Math.max(page || 1, 1);
	const safeLimit = Math.min(limit || 20, 100);
	const offset = (safePage - 1) * safeLimit;

	const totalItems = await AnimeRepository.countAll(status);
	const totalPages = Math.ceil(totalItems / safeLimit);

	const data = await AnimeRepository.findAll(safeLimit, offset, status);

	return {
		data,
		meta: { page: safePage, limit: safeLimit, totalItems, totalPages },
	};
}

async function getAnimeById(id: number): Promise<AnimeType> {
	const anime = await AnimeRepository.findById(id);
	if (!anime) throw new NotFoundError("Anime not found");

	return anime;
}

async function createAnime(data: AnimeInsertType): Promise<AnimeType> {
	const newAnime = await AnimeRepository.create(data);

	return newAnime;
}

async function updateAnime(
	id: number,
	data: AnimeUpdateType,
): Promise<AnimeType> {
	const anime = await AnimeRepository.update(id, data);
	if (!anime) throw new NotFoundError("Anime not found");

	return anime;
}

async function deleteAnime(id: number): Promise<boolean> {
	const deleted = await AnimeRepository.remove(id);
	if (!deleted) throw new NotFoundError("Anime not found");

	return deleted;
}

export const Anime = {
	getAnimeList,
	getAnimeById,
	createAnime,
	updateAnime,
	deleteAnime,
};
