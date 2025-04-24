import Elysia, { Context } from "elysia";
import { auth } from "./providers/betterAuth";

const authHandler = new Elysia().all("/api/auth/*", (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["GET", "POST"];

  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  }

  context.error(405);
})

export const authService = new Elysia().use(authHandler);