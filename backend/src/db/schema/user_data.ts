import { relations } from "drizzle-orm";
import {
	type AnyPgColumn,
	boolean,
	integer,
	pgSchema,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { subscriptions } from "./billing";
import { anime, episodes } from "./content";

export const userDataSchema = pgSchema("user_data");

export const userWatchHistory = userDataSchema.table(
	"user_watch_history",
	{
		historyId: serial("history_id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		episodeId: integer("episode_id")
			.notNull()
			.references(() => episodes.episodeId, { onDelete: "cascade" }),
		watchProgressSeconds: integer("watch_progress_seconds")
			.default(0)
			.notNull(),
		lastWatchedDate: timestamp("last_watched_date").defaultNow().notNull(),
		isCompleted: boolean("is_completed").default(false).notNull(),
	},
	(table) => [
		uniqueIndex("unique_user_episode").on(table.userId, table.episodeId),
		uniqueIndex("idx_watch_history_user_id").on(table.userId),
	],
);

export const userWatchlist = userDataSchema.table(
	"user_watchlist",
	{
		watchlistId: serial("watchlist_id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		animeId: integer("anime_id")
			.notNull()
			.references(() => anime.animeId, { onDelete: "cascade" }),
		dateAdded: timestamp("date_added").defaultNow().notNull(),
		priority: varchar("priority", { length: 10 }).default("medium").notNull(),
		status: varchar("status", { length: 20 })
			.default("plan_to_watch")
			.notNull(),
	},
	(table) => [
		uniqueIndex("unique_user_anime").on(table.userId, table.animeId),
		uniqueIndex("idx_watchlist_user_id").on(table.userId),
	],
);

export const userRatings = userDataSchema.table(
	"user_ratings",
	{
		ratingId: serial("rating_id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		animeId: integer("anime_id")
			.notNull()
			.references(() => anime.animeId, { onDelete: "cascade" }),
		score: integer("score").notNull(),
		reviewText: text("review_text"),
		dateRated: timestamp("date_rated").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("unique_user_anime_rating").on(table.userId, table.animeId),
		uniqueIndex("idx_ratings_user_id").on(table.userId),
		uniqueIndex("idx_ratings_anime_id").on(table.animeId),
	],
);

export const comments = userDataSchema.table(
	"comments",
	{
		commentId: serial("comment_id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		episodeId: integer("episode_id")
			.notNull()
			.references(() => episodes.episodeId, { onDelete: "cascade" }),
		parentCommentId: integer("parent_comment_id").references(
			(): AnyPgColumn => comments.commentId,
			{ onDelete: "cascade" },
		),
		content: text("content").notNull(),
		timestamp: timestamp("timestamp").defaultNow().notNull(),
		likesCount: integer("likes_count").default(0).notNull(),
	},
	(table) => [
		uniqueIndex("idx_comments_episode_id").on(table.episodeId),
		uniqueIndex("idx_comments_user_id").on(table.userId),
		uniqueIndex("idx_comments_parent_id").on(table.parentCommentId),
	],
);

// Relations
export const usersRelations = relations(user, ({ many }) => ({
	watchHistory: many(userWatchHistory),
	watchlist: many(userWatchlist),
	ratings: many(userRatings),
	comments: many(comments),
	subscriptions: many(subscriptions),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
	user: one(user, {
		fields: [comments.userId],
		references: [user.id],
	}),
	episode: one(episodes, {
		fields: [comments.episodeId],
		references: [episodes.episodeId],
	}),
	parentComment: one(comments, {
		fields: [comments.parentCommentId],
		references: [comments.commentId],
	}),
	replies: many(comments, { relationName: "comment_replies" }),
}));
