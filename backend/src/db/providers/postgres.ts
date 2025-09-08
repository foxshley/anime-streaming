import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL must be set");
}

const client = new SQL(process.env.DATABASE_URL);
export const db = drizzle(client);
