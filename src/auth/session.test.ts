import { describe, expect, it } from 'vitest';
import { clearSession, normalizeEmail, normalizeUser, readSession, writeSession } from './session';

describe('session helpers', () => {
  it('normalizes email addresses', () => {
    expect(normalizeEmail('  USER@Example.COM  ')).toBe('user@example.com');
  });

  it('normalizes a valid raw user object without trusting cached admin role', () => {
    const user = normalizeUser({
      id: '123',
      email: 'USER@example.com',
      name: 'Mahdi',
      role: 'admin'
    });

    expect(user).not.toBeNull();
    expect(user?.email).toBe('user@example.com');
    expect(user?.name).toBe('Mahdi');
    expect(user?.role).toBe('user');
  });

  it('does not promote a user to admin based on email alone', () => {
    const user = normalizeUser({
      id: '123',
      email: 'former-admin@example.com',
      name: 'Regular User'
    });

    expect(user?.role).toBe('user');
  });

  it('writes and reads a session', () => {
    const session = writeSession('token-1', {
      id: '123',
      email: 'user@example.com',
      name: 'Test User'
    });

    expect(session).not.toBeNull();
    expect(readSession()?.token).toBe('token-1');
    expect(readSession()?.user.email).toBe('user@example.com');
  });

  it('clears a session', () => {
    writeSession('token-1', {
      id: '123',
      email: 'user@example.com',
      name: 'Test User'
    });

    clearSession();
    expect(readSession()).toBeNull();
  });
});
