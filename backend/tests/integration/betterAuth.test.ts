import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { AuthService } from "../../src/services/auth";
import { db } from "../../src/db/providers/postgres";
import { faker } from '@faker-js/faker';
import { capturedToken, lastEmail } from "../setup-email-mock";

async function invoke(method: string, path: string, body?: any) {
  const init: RequestInit = { method }
  if (body !== undefined) {
    init.headers = { 'Content-Type': 'application/json' }
    init.body = JSON.stringify(body)
  }

  return AuthService.handle(new Request(`http://test${path}`, init))
}

describe("BetterAuth Integration Tests", () => {
  beforeAll(async () => {
    await db.execute(`TRUNCATE TABLE "auth"."account", "auth"."session", "auth"."user", "auth"."verification" CASCADE`);
  });

  it("should sign up a new user", async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password()
    };

    const res = await invoke("POST", "/api/auth/sign-up/email", user);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty("user");
    expect(data.user).toHaveProperty("email", user.email.toLowerCase());
    expect(data.user).toHaveProperty("name", user.name);
  });

  it("should not sign up with existing email", async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password()
    };

    const firstAttemptRes = await invoke("POST", "/api/auth/sign-up/email", user);
    expect(firstAttemptRes.status).toBe(200);

    const secondAttemptRes = await invoke("POST", "/api/auth/sign-up/email", user);
    expect(secondAttemptRes.status).toBe(422);
  });

  it("should verify email", async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password()
    };

    const res = await invoke("POST", "/api/auth/sign-up/email", user);
    expect(res.status).toBe(200);

    const token = capturedToken;
   
    const verify = await invoke("GET", `/api/auth/verify-email?token=${token}`);
    expect(verify.status).toBe(200);
  });

  it("should sign in existing user", async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password()
    };

    const res = await invoke("POST", "/api/auth/sign-up/email", user);
    expect(res.status).toBe(200);

    const token = capturedToken;
    const verify = await invoke("GET", `/api/auth/verify-email?token=${token}`);
    expect(verify.status).toBe(200);

    const credentials = {      
      email: user.email,
      password: user.password
    };

    const login = await invoke("POST", "/api/auth/sign-in/email", credentials);
    expect(login.status).toBe(200);

    const loginData = await login.json();
    
    expect(loginData.token).toBeDefined();
    expect(loginData).toHaveProperty("user");
  });
});