import Elysia from "elysia";

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

export const BetterAuthProvider = new Elysia({ name: "AuthProvider.BetterAuth" })
  .mount(auth.handler)
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