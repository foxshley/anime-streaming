import { seedAnime } from "./anime.seed";

async function main() {
  console.log("🌱 Seeding database...");
  await seedAnime();
  console.log("✅ Seeding complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
