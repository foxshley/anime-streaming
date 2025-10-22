import { sql } from "drizzle-orm";
import { db } from "../../src/db";

export async function truncateTables(tables: string[]) {
	if (tables.length === 0) return;

	const tableList = tables.map((t) => `"${t.replace(".", '"."')}"`).join(", ");
	const query = sql.raw(`TRUNCATE ${tableList} RESTART IDENTITY CASCADE;`);

	try {
		await db.execute(query);
		console.log(`🧼 Truncated tables: ${tables.join(", ")}`);
	} catch (err) {
		console.error("❌ Failed to truncate tables:", err);
		throw err;
	}
}
