import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import Elysia, { type Context } from "elysia";
import { db } from "../../../db/providers/postgres";
import { account, session, user, verification } from "../../../db/schema/auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { user, session, account, verification },
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async ({ token, user, url }) => {
			// Implement your email sending logic here
			console.log(
				`Send verification email to ${user.email} with token: ${token} and URL: ${url}`,
			);
		},
	},
});

const authHandler = (context: Context) => {
	const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET", "OPTIONS"];
	// validate request method
	if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
		return auth.handler(context.request);
	} else {
		context.status(405);
	}
};

export const BetterAuthProvider = new Elysia({
	name: "AuthProvider.BetterAuth",
})
	.all("/api/auth/*", authHandler)
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({ headers });

				if (!session) return status(401);

				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	});
