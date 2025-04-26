import { relations } from "drizzle-orm";
import { date, decimal, integer, pgSchema, serial, smallint, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { comments, userRatings, userWatchHistory, userWatchlist } from "./user_data";

export const contentSchema = pgSchema("anime");

export const anime = contentSchema.table("anime", {
  animeId: serial('anime_id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  originalTitle: varchar('original_title', { length: 255}).notNull(),
  description: text('description'),
  coverImageUrl: varchar('cover_image_url', { length: 255}),
  bannerImageUrl: varchar('banner_image_url', { length: 255}),
  release_year: smallint('release_year'),
  status: varchar('status', { length: 20}).default('ongoing').notNull(),
  totalEpisodes: integer('total_episodes').default(0).notNull(),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default(0).notNull(),
  ageRating: varchar('age_rating', { length: 10 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const episodes = contentSchema.table('episodes', {
  episodeId: serial('episode_id').primaryKey(),
  animeId: integer('anime_id').notNull().references(() => anime.animeId, { onDelete: 'cascade' }),
  episodeNumber: integer('episode_number').notNull(),
  title: varchar('title', { length: 255 }),
  durationSeconds: integer('duration_seconds'),
  releaseDate: date('release_date'),
  videoUrl: varchar('video_url', { length: 255 }).notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 255 }),
  description: text('description'),
  viewCount: integer('view_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
    uniqueIndex('unique_episode_number').on(table.animeId, table.episodeNumber),
    uniqueIndex('idx_episodes_anime_id').on(table.animeId),
]);

export const seasons = contentSchema.table('seasons', {
  seasonId: serial('season_id').primaryKey(),
  animeId: integer('anime_id').notNull().references(() => anime.animeId, { onDelete: 'cascade' }),
  seasonNumber: integer('season_number').notNull(),
  title: varchar('title', { length: 255 }),
  year: smallint('year'),
  description: text('description'),
}, (table) => [
    uniqueIndex('unique_season_number').on(table.animeId, table.seasonNumber),
]);

export const animeRelations = relations(anime, ({ many }) => ({
  episodes: many(episodes),
  watchlist: many(userWatchlist),
  ratings: many(userRatings),
  seasons: many(seasons),
}));

export const episodesRelations = relations(episodes, ({ one, many }) => ({
  anime: one(anime, {
    fields: [episodes.animeId],
    references: [anime.animeId],
  }),
  watchHistory: many(userWatchHistory),
  comments: many(comments),
}));