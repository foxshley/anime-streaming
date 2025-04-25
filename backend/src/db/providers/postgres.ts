import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

const client = new SQL(process.env.DB_PATH || "postgres://postgres@localhost:5432/anime_streaming");
export const db = drizzle(client);