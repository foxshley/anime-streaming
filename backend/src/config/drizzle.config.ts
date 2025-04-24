import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_PATH || "postgres://postgres@localhost:5432/anime_streaming"
  },
  schema: './src/db/schema'
});