import Elysia, { Context } from "elysia";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../../db/providers/postgres";
import { account, session, user, verification } from "../../../db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification }
  }),
  emailAndPassword: {
    enabled: true
  },
})

const authHandler = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET", "OPTIONS"]
  // validate request method
  if(BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
      return auth.handler(context.request);
  } else {
      context.error(405)
  }
}

export const BetterAuthProvider = new Elysia({ name: "AuthProvider.BetterAuth" })
  .all("/api/auth/*", authHandler)
  .macro({
    auth: {
      async resolve({ error, request: { headers }}) {
        const session = await auth.api.getSession({ headers });
  
        if(!session) return error(401);
  
        return {
          user: session.user,
          session: session.session
        }
      }
    }
  });