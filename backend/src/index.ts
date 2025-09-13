import { openapi } from "@elysiajs/openapi";
import { logger } from "./utils/logger";
import { app } from "./app";
import { Elysia } from "elysia";

const _server = new Elysia()
	.use(logger)
	.use(openapi())
	.use(app)
	.listen(process.env.PORT ?? 4000);
