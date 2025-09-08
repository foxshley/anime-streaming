import {
	boolean,
	pgSchema,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { authSchema, user } from "./auth";

export const billingSchema = pgSchema("billing");

export const subscriptions = billingSchema.table("subscriptions", {
	subscriptionId: serial("subscription_id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	planType: varchar("plan_type", { length: 20 }).notNull(),
	startDate: timestamp("start_date").defaultNow().notNull(),
	endDate: timestamp("end_date"),
	paymentStatus: varchar("payment_status", { length: 20 })
		.default("pending")
		.notNull(),
	recurring: boolean("recurring").default(true).notNull(),
});

// User Subscription Status (View from billing to auth schema)
export const userSubscriptionStatus = authSchema.table(
	"user_subscription_status",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		subscriptionStatus: varchar("subscription_status", { length: 20 })
			.default("free")
			.notNull(),
	},
);
