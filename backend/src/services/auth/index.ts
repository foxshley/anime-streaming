import Elysia, { Context } from "elysia";
import { BetterAuthProvider } from "./providers/betterAuth";

export const AuthService = new Elysia({ name: "Service.Auth" })
  .use(BetterAuthProvider);
