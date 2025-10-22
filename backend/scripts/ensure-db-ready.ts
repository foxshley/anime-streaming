import { $ } from "bun";

let isReady = false;

async function ensureDbReady() {
	if (isReady) return;
	isReady = true;

	console.log("🐘 Ensuring test database is ready...");

	// Optionally check if Postgres container is running
	const ps = await $`podman ps --filter name=test-db -q`.quiet();
	if (!ps.stdout.toString().trim()) {
		console.log("🚀 Starting test database...");
		await $`podman compose -f ../compose.test.yml up -d`;
		await $`bun run ./scripts/wait-for-db.ts`;
	}

	process.env.DATABASE_URL ||=
		"postgres://testuser:testpassword@localhost:5433/anime_streaming_test";

	// 🧠 Check if migration table exists
	const checkMigration =
		await $`podman exec anime-streaming-backend-test-db psql -U testuser -d anime_streaming_test -tAc "SELECT to_regclass('drizzle.__drizzle_migrations') AS EXISTS;"`;

	const hasMigration = checkMigration.stdout.toString().trim() !== "";

	if (!hasMigration) {
		console.log("📦 Running migrations...");
		await $`bun run migrate`;
	} else {
		console.log("✅ Database already migrated, skipping setup.");
	}

	console.log("✅ Database ready for tests.");
}

await ensureDbReady();
