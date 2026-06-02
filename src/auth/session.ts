import type { UserProfile } from '../types';

export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'user';
export const AUTH_CHANGE_EVENT = 'shaku-maku-auth-change';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  photoURL?: string;
  role?: 'user' | 'owner' | 'admin';
  user_type?: string;
  createdAt?: string;
  onboarded?: boolean;
  businessId?: string | null;
  [key: string]: unknown;
}

export interface AuthSession {
  token: string;
  user: SessionUser;
}

export const normalizeEmail = (email?: string | null): string => (email || '').trim().toLowerCase();

const notifyAuthChange = (): void => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const normalizeUser = (raw: unknown): SessionUser | null => {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const source =
    'user' in raw && raw.user && typeof raw.user === 'object'
      ? (raw.user as Record<string, unknown>)
      : (raw as Record<string, unknown>);

  const email = normalizeEmail(String(source.email || ''));
  if (!email) {
    return null;
  }

  const backendRole =
    source.role === 'owner' || source.role === 'admin' || source.role === 'user'
      ? source.role
      : source.user_type === 'business'
        ? 'owner'
        : 'user';

  const displayName = String(source.displayName || source.name || email.split('@')[0]);

  return {
    ...source,
    id: String(source.id || source.uid || email),
    email,
    name: displayName,
    displayName,
    photoURL: String(source.photoURL || ''),
    role: backendRole
  };
};

export const toUserProfile = (user: SessionUser): UserProfile => ({
  uid: user.id,
  displayName: user.displayName || user.name || user.email.split('@')[0],
  photoURL: user.photoURL || '',
  email: user.email,
  createdAt: typeof user.createdAt === 'string' ? user.createdAt : new Date().toISOString(),
  role: user.role || 'user',
  onboarded: Boolean(user.onboarded),
  businessId: typeof user.businessId === 'string' ? user.businessId : null
});

export const readSession = (): AuthSession | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const savedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!token || !savedUser) {
    return null;
  }

  // Never restore dev-only local fallback sessions in production builds.
  if (!import.meta.env.DEV && token.startsWith('local_')) {
    clearSession();
    return null;
  }

  try {
    const user = normalizeUser(JSON.parse(savedUser));
    if (!user) {
      clearSession();
      return null;
    }

    return { token, user };
  } catch {
    clearSession();
    return null;
  }
};

export const writeSession = (token: string, rawUser: unknown): AuthSession | null => {
  const user = normalizeUser(rawUser);

  if (!token || !user) {
    return null;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  notifyAuthChange();

  return { token, user };
};

export const clearSession = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
  notifyAuthChange();
};
