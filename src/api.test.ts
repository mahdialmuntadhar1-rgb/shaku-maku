import { describe, expect, it, vi } from 'vitest';
import { authApi, requestPasswordReset } from './api';

const genericMessage = 'If the email exists, a reset link has been sent';

describe('frontend password reset API', () => {
  it('uses the generic forgot-password response without exposing a token', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ success: true, message: genericMessage })
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await authApi.forgotPassword('user@example.com');

    expect(response).toEqual({ message: genericMessage });
    expect('token' in response).toBe(false);
    expect(localStorage.getItem('password_reset_email')).toBe('user@example.com');
  });

  it('does not pass a forgot-password token through requestPasswordReset', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ success: true, message: genericMessage })
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await requestPasswordReset('user@example.com');

    expect(response).toEqual({ success: true, message: genericMessage });
    expect('token' in response).toBe(false);
  });
});
