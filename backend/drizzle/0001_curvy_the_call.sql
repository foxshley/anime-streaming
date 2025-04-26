CREATE SCHEMA "billing";
--> statement-breakpoint
CREATE SCHEMA "anime";
--> statement-breakpoint
CREATE SCHEMA "user_data";
--> statement-breakpoint
CREATE TABLE "billing"."subscriptions" (
	"subscription_id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_type" varchar(20) NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp,
	"payment_status" varchar(20) DEFAULT 'pending' NOT NULL,
	"recurring" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth"."user_subscription_status" (
	"user_id" text NOT NULL,
	"subscription_status" varchar(20) DEFAULT 'free' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "anime"."anime" (
	"anime_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"original_title" varchar(255) NOT NULL,
	"description" text,
	"cover_image_url" varchar(255),
	"banner_image_url" varchar(255),
	"release_year" smallint,
	"status" varchar(20) DEFAULT 'ongoing' NOT NULL,
	"total_episodes" integer DEFAULT 0 NOT NULL,
	"average_rating" numeric(3, 2) DEFAULT 0 NOT NULL,
	"age_rating" varchar(10),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "anime"."episodes" (
	"episode_id" serial PRIMARY KEY NOT NULL,
	"anime_id" integer NOT NULL,
	"episode_number" integer NOT NULL,
	"title" varchar(255),
	"duration_seconds" integer,
	"release_date" date,
	"video_url" varchar(255) NOT NULL,
	"thumbnail_url" varchar(255),
	"description" text,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "anime"."seasons" (
	"season_id" serial PRIMARY KEY NOT NULL,
	"anime_id" integer NOT NULL,
	"season_number" integer NOT NULL,
	"title" varchar(255),
	"year" smallint,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "user_data"."comments" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"episode_id" integer NOT NULL,
	"parent_comment_id" integer,
	"content" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"likes_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_data"."user_ratings" (
	"rating_id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"anime_id" integer NOT NULL,
	"score" integer NOT NULL,
	"review_text" text,
	"date_rated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_data"."user_watch_history" (
	"history_id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"episode_id" integer NOT NULL,
	"watch_progress_seconds" integer DEFAULT 0 NOT NULL,
	"last_watched_date" timestamp DEFAULT now() NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_data"."user_watchlist" (
	"watchlist_id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"anime_id" integer NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"priority" varchar(10) DEFAULT 'medium' NOT NULL,
	"status" varchar(20) DEFAULT 'plan_to_watch' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "billing"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."user_subscription_status" ADD CONSTRAINT "user_subscription_status_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "anime"."episodes" ADD CONSTRAINT "episodes_anime_id_anime_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"."anime"("anime_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "anime"."seasons" ADD CONSTRAINT "seasons_anime_id_anime_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"."anime"("anime_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."comments" ADD CONSTRAINT "comments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."comments" ADD CONSTRAINT "comments_episode_id_episodes_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "anime"."episodes"("episode_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."comments" ADD CONSTRAINT "comments_parent_comment_id_comments_comment_id_fk" FOREIGN KEY ("parent_comment_id") REFERENCES "user_data"."comments"("comment_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."user_ratings" ADD CONSTRAINT "user_ratings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."user_ratings" ADD CONSTRAINT "user_ratings_anime_id_anime_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"."anime"("anime_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."user_watch_history" ADD CONSTRAINT "user_watch_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."user_watch_history" ADD CONSTRAINT "user_watch_history_episode_id_episodes_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "anime"."episodes"("episode_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."user_watchlist" ADD CONSTRAINT "user_watchlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_data"."user_watchlist" ADD CONSTRAINT "user_watchlist_anime_id_anime_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"."anime"("anime_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_episode_number" ON "anime"."episodes" USING btree ("anime_id","episode_number");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_episodes_anime_id" ON "anime"."episodes" USING btree ("anime_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_season_number" ON "anime"."seasons" USING btree ("anime_id","season_number");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_comments_episode_id" ON "user_data"."comments" USING btree ("episode_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_comments_user_id" ON "user_data"."comments" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_comments_parent_id" ON "user_data"."comments" USING btree ("parent_comment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_anime_rating" ON "user_data"."user_ratings" USING btree ("user_id","anime_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_ratings_user_id" ON "user_data"."user_ratings" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_ratings_anime_id" ON "user_data"."user_ratings" USING btree ("anime_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_episode" ON "user_data"."user_watch_history" USING btree ("user_id","episode_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_watch_history_user_id" ON "user_data"."user_watch_history" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_anime" ON "user_data"."user_watchlist" USING btree ("user_id","anime_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_watchlist_user_id" ON "user_data"."user_watchlist" USING btree ("user_id");