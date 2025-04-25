import Elysia, { Context } from "elysia";
import { auth } from "./providers/betterAuth";

export const AuthService = new Elysia({ name: "Service.Auth" })
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
