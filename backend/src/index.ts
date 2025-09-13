import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { app } from "./app";
import { logger } from "./utils/logger";

const _server = new Elysia()
	.use(logger)
	.use(openapi())
	.use(app)
	.listen(process.env.PORT ?? 4000);
