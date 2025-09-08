#!/usr/bin/env bun

import { $ } from "bun";

async function checkCommand(cmd: string) {
	try {
		const process = await $`${cmd} --version`.quiet();
		return process.exitCode === 0;
	} catch {
		return false;
	}
}

const hasDocker = await checkCommand("docker");
const hasPodman = await checkCommand("podman");

if (!hasDocker && !hasPodman) {
	console.error(
		"❌ Neither Docker nor Podman is installed. Please install one to run the test environment.",
	);
	process.exit(1);
}

console.log(`✅ Using ${hasDocker ? "Docker" : "Podman"} for test environment`);

try {
	console.log("🐘 Starting test environment...");
	await $`bun run test:setup`;

	console.log("🚀 Running tests...");
	await $`bun run test:unit && bun run test:integration`;

	console.log("✅ All tests passed!");
} finally {
	console.log("🧼 Cleaning up test environment...");
	await $`bun run test:teardown`;
}
