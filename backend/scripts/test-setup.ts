#!/usr/bin/env bun

import { $ } from "bun";

async function main() {
  if (process.env.CI) {
    console.log("✅ CI detected – skipping Podman setup, Postgres is provided by GitHub Actions service");

    return;
  }

  console.log("🐘 Starting Postgres test container...");
  await $`podman compose -f ../compose.test.yml up -d`;

  console.log("⏳ Waiting for the database to be ready...");
  await $`bun run scripts/wait-for-db.ts`;

  console.log("📦 Running migrations...");
  await $`bun run migrate`;

  console.log("\n✅ Test environment ready!");
}

main().catch((err) => {
  console.error("❌ Error setting up test environment:", err);
  process.exit(1);
});