import { Elysia } from "elysia";
import { authService } from "./services/auth";

const app = new Elysia().use(authService)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
