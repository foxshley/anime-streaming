import { Elysia } from "elysia";
import { AuthService } from "./services/auth";

const app = new Elysia().use(AuthService)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
