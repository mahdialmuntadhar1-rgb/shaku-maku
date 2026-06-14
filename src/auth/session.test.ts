import { describe, expect, it } from 'vitest';
import { clearSession, normalizeEmail, normalizeUser, readSession, writeSession, toUserProfile } from './session';

describe('session helpers', () => {
  it('normalizes email addresses', () => {
    expect(normalizeEmail('  USER@Example.COM  ')).toBe('user@example.com');
  });

  it('normalizes a valid raw user object', () => {
    const user = normalizeUser({
      id: '123',
      email: 'USER@example.com',
      name: 'Mahdi',
      role: 'admin'
    });

    expect(user).not.toBeNull();
    expect(user?.email).toBe('user@example.com');
    expect(user?.name).toBe('Mahdi');
    expect(user?.role).toBe('admin');
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

  it('converts SessionUser to UserProfile', () => {
    const sessionUser = {
      id: '123',
      email: 'user@example.com',
      name: 'Test User',
      displayName: 'Test Display',
      photoURL: 'https://example.com/photo.jpg',
      role: 'owner' as const,
      createdAt: '2024-01-01T00:00:00Z',
      onboarded: true,
      businessId: 'biz-123'
    };

    const profile = toUserProfile(sessionUser);

    expect(profile.uid).toBe('123');
    expect(profile.displayName).toBe('Test Display');
    expect(profile.email).toBe('user@example.com');
    expect(profile.photoURL).toBe('https://example.com/photo.jpg');
    expect(profile.role).toBe('owner');
    expect(profile.onboarded).toBe(true);
    expect(profile.businessId).toBe('biz-123');
  });

  it('handles missing optional fields in toUserProfile', () => {
    const sessionUser = {
      id: '123',
      email: 'user@example.com',
      name: 'Test User'
    };

    const profile = toUserProfile(sessionUser);

    expect(profile.uid).toBe('123');
    expect(profile.displayName).toBe('Test User');
    expect(profile.email).toBe('user@example.com');
    expect(profile.photoURL).toBe('');
    expect(profile.role).toBe('user');
    expect(profile.onboarded).toBe(false);
    expect(profile.businessId).toBeNull();
  });

  it('persists owner and business fields from backend', () => {
    const sessionUser = {
      id: '123',
      email: 'owner@example.com',
      name: 'Business Owner',
      role: 'owner' as const,
      user_type: 'business',
      businessId: 'biz-456'
    };

    const profile = toUserProfile(sessionUser);

    expect(profile.role).toBe('owner');
    expect(profile.businessId).toBe('biz-456');
  });
});
