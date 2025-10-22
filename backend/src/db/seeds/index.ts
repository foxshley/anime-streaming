import { seedAnime } from "./anime.seed";

async function main() {
	const args = process.argv.slice(2);
	console.log("🌱 Seeding database...");

	// If no args given, default to all
	const targets = args.length > 0 ? args : ["all"];

	for (const arg of targets) {
		switch (arg) {
			case "anime":
				console.log("- Seeding Anime");
				await seedAnime();
				break;

			// case "users":
			// console.log("- Seeding User");
			// await seedUsers();
			// break;

			// case "billing":
			// 	await seedBilling();
			// 	break;

			case "all":
				await seedAnime();
				// await seedUsers();
				// await seedBilling();
				break;

			default:
				console.error(`❌ Unknown seed type: ${arg}`);
				process.exitCode = 1;
		}
	}

	console.log("✅ Seeding complete!");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
