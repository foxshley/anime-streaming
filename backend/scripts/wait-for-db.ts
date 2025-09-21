async function waitForDb(retries = 15, delayMs = 1000): Promise<void> {
	let attempt = 0;

	return new Promise((resolve, reject) => {
		const check = () => {
			attempt++;

			const proc = Bun.spawn({
				cmd: [
					"podman",
					"exec",
					"anime-streaming-backend-test-db",
					"pg_isready",
					"-h",
					"localhost",
					"-p",
					"5432",
					"-U",
					"testuser",
					"-d",
					"anime_streaming_test",
				],
				stdout: "ignore",
				stderr: "ignore",
			});

			proc.exited.then((code) => {
				if (code === 0) {
					console.log("✅ Database is ready!");
					resolve();
				} else if (attempt >= retries) {
					reject(new Error("❌ Database not ready after multiple attempts"));
				} else {
					console.log(`⏳ Waiting for DB... (${attempt}/${retries})`);
					setTimeout(check, delayMs);
				}
			});
		};

		check();
	});
}

await waitForDb();

export {};
