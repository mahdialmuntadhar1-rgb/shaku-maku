const API_BASE = 'https://nabda-bulk-whatsapp.mahdialmuntadhar1.workers.dev/api/shaku-auth';

export interface ShakuUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
  onboarded: boolean;
  businessId: string | null;
}

function getToken(): string | null {
  return localStorage.getItem('shaku_token');
}

export async function registerUser(email: string, password: string, displayName: string, role: string = 'user'): Promise<{ token: string; user: ShakuUser }> {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, display_name: displayName, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  localStorage.setItem('shaku_token', data.token);
  localStorage.setItem('shaku_user', JSON.stringify(data.user));
  return data;
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: ShakuUser }> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('shaku_token', data.token);
  localStorage.setItem('shaku_user', JSON.stringify(data.user));
  return data;
}

export async function getCurrentUser(): Promise<ShakuUser | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      localStorage.removeItem('shaku_token');
      localStorage.removeItem('shaku_user');
      return null;
    }
    const data = await res.json();
    localStorage.setItem('shaku_user', JSON.stringify(data.user));
    return data.user;
  } catch {
    return null;
  }
}

export async function requestPasswordReset(email: string): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE}/reset-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Reset request failed');
  return data;
}

export async function confirmPasswordReset(token: string, newPassword: string): Promise<void> {
  const res = await fetch(`${API_BASE}/reset-confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Password reset failed');
}

export function logoutUser(): void {
  localStorage.removeItem('shaku_token');
  localStorage.removeItem('shaku_user');
}

export function getStoredUser(): ShakuUser | null {
  const raw = localStorage.getItem('shaku_user');
  return raw ? JSON.parse(raw) : null;
}

export function getStoredToken(): string | null {
  return getToken();
}
