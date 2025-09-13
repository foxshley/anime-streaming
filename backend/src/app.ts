import { Elysia } from "elysia";
import { AnimeService } from "./services/anime";
import { AuthService } from "./services/auth";

export const app = new Elysia()
	.onError(({ code, error, set }) => {
		switch (code) {
			case "NOT_FOUND":
				set.status = 404;

				return {
					errors: [
						{
							status: set.status,
							title: "Not Found",
							detail: `The requested resource was not found.`,
						},
					],
				};
			case "VALIDATION":
				set.status = 422;

				return {
					errors: [
						{
							status: set.status,
							title: "Validation Error",
							detail: JSON.parse(error.message),
						},
					],
				};

			case "INTERNAL_SERVER_ERROR":
				set.status = 500;

				return {
					errors: [
						{
							status: set.status,
							title: "Internal Server Error",
							detail: `An unexpected error occurred on the server.\n${error.message}`,
						},
					],
				};

			case "UNKNOWN":
				set.status = 520;

				return {
					errors: [
						{
							status: set.status,
							title: "Unknown Error",
							detail: `An unknown error occurred on the server.\n${error.message}`,
						},
					],
				};
		}
	})
	.use(AuthService)
	.use(AnimeService)
	.get("/", () => "Hello Elysia")