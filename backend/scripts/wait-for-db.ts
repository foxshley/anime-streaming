import { spawn } from "child_process";

function waitForDb(retries = 15, delayMs = 1000): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempt = 0;

    const check = () => {
      attempt++;
      const proc = spawn("podman", [
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
        "anime_streaming_test"
      ]);

      proc.on("exit", (code) => {
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