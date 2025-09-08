import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { AuthService } from "./services/auth";
import { logger } from "./utils/logger";

const _app = new Elysia()
	.use(logger)
	.use(swagger())
	.onError(({ code, error, set }) => {
		switch (code) {
			case "NOT_FOUND":
				set.status = 404;

				return {
					status: "error",
					message: error.message,
				};
			case "INTERNAL_SERVER_ERROR":
				set.status = 500;

				return {
					status: "error",
					message: error.message,
				};

			case "VALIDATION":
				set.status = 422;

				return {
					status: "error",
					message: error.message,
				};
		}
	})
	.use(AuthService)
	.get("/", () => "Hello Elysia")
	.get("/test", () => {
		return {
			status: "success",
			message: "Hello Elysia",
		};
	})
	.listen(process.env.PORT ?? 4000);
