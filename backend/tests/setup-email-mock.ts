import { auth } from "../src/services/auth/providers/betterAuth";

let capturedToken: string | null = null;

// override BetterAuth's sendVerificationEmail
auth.options.emailVerification.sendVerificationEmail = async ({ token, user }) => {
  capturedToken = token;
};

export { capturedToken };