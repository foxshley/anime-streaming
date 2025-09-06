#!/usr/bin/env bun

import { $ } from "bun";

async function main() {
  if (process.env.CI) {
    console.log("✅ CI detected – skipping Podman teardown");

    return;
  }

  console.log("🐘 Stopping Postgres test container...");
  await $`podman compose -f ../compose.test.yml down -v`;

  console.log("✅ Test environment cleaned up!");
}

main().catch((err) => {
  console.error("❌ Error tearing down test environment:", err);
  process.exit(1);
});