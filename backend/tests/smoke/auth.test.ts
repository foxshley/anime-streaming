/**
 * test/routes.test.ts
 *
 * Smoke tests for BetterAuth’s built‑in routes in ElysiaJS.
 * These tests only verify that the endpoints are mounted and return
 * the correct HTTP status codes for invalid or missing payloads,
 * without touching the database or full sign-up workflow.
 *
 * Run with:
 *   bun test
 */

import { describe, it, expect } from 'bun:test'
import { AuthService } from '../../src/services/auth'

// Helper to invoke the in-memory handler
async function invoke(method: string, path: string, body?: any) {
  const init: RequestInit = { method }
  if (body !== undefined) {
    init.headers = { 'Content-Type': 'application/json' }
    init.body = JSON.stringify(body)
  }
  return AuthService.handle(new Request(`http://test${path}`, init))
}

describe('BetterAuth built-in routes', () => {
  it('POST /api/auth/sign-up/email with no body → 400 Bad Request', async () => {
    const res = await invoke('POST', '/api/auth/sign-up/email')
    expect(res.status).toBe(400)
  })

  it('Unknown route → 404 Not Found', async () => {
    const res = await invoke('POST', '/api/auth/does-not-exist')
    expect(res.status).toBe(404)
  })

  it('GET /api/auth/verify-email without token → 400 Bad Request', async () => {
    const res = await invoke('GET', '/api/auth/verify-email')
    expect(res.status).toBe(400)
  })
})