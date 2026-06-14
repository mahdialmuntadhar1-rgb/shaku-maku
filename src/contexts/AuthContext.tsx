import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthResponse, authApi, requestPasswordReset, resetPassword as apiResetPassword } from '../api';
import { AUTH_CHANGE_EVENT, clearSession, readSession, writeSession, SessionUser } from '../auth/session';

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  [key: string]: unknown;
}

interface PasswordResetResponse {
  success: boolean;
  message: string;
}

interface AuthContextType {
  user: SessionUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: RegisterPayload) => Promise<AuthResponse>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<PasswordResetResponse>;
  resetPassword: (token: string, newPassword: string) => Promise<PasswordResetResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = (): void => {
    setUser(readSession()?.user || null);
  };

  useEffect(() => {
    refreshSession();
    setLoading(false);

    window.addEventListener('storage', refreshSession);
    window.addEventListener(AUTH_CHANGE_EVENT, refreshSession);

    return () => {
      window.removeEventListener('storage', refreshSession);
      window.removeEventListener(AUTH_CHANGE_EVENT, refreshSession);
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await authApi.login(email, password);
    
    // Sync complete profile from backend after successful login
    try {
      const me = await authApi.getMe();
      writeSession(response.token, me);
      refreshSession();
    } catch (error) {
      // If /auth/me fails, still use the login response
      refreshSession();
    }

    return response;
  };

  const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
    const response = await authApi.register(userData);
    
    // Sync complete profile from backend after successful registration
    try {
      const me = await authApi.getMe();
      writeSession(response.token, me);
      refreshSession();
    } catch (error) {
      // If /auth/me fails, still use the register response
      refreshSession();
    }

    return response;
  };

  const logout = (): void => {
    authApi.logout();
    clearSession();
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<PasswordResetResponse> => {
    try {
      const data = await requestPasswordReset(email);

      return {
        success: data.success !== false,
        message: String(data.message || 'Password reset instructions were sent.')
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to send reset instructions'
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<PasswordResetResponse> => {
    try {
      const data = await apiResetPassword(token, newPassword);

      return {
        success: data.success !== false,
        message: String(data.message || 'Password reset successful')
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to reset password'
      };
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword
    }),
    [loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
