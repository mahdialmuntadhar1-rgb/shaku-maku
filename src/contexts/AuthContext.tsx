import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, requestPasswordReset, resetPassword as apiResetPassword, AuthResponse } from '../api';
import { AUTH_CHANGE_EVENT, readSession, SessionUser } from '../auth/session';

interface AuthContextType {
  user: SessionUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: any) => Promise<AuthResponse>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string; token?: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = () => {
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
    if (response.success) refreshSession();
    return response;
  };

  const register = async (userData: any): Promise<AuthResponse> => {
    const response = await authApi.register(userData);
    if (response.success) refreshSession();
    return response;
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string; token?: string }> => {
    try {
      const data = await requestPasswordReset(email);
      return {
        success: data.success !== false,
        message: data.message || 'Password reset instructions were sent.',
        token: data.token
      };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.error || 'Failed to send reset instructions' };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const data = await apiResetPassword(token, newPassword);
      return {
        success: data.success !== false,
        message: data.message || 'Password reset successful'
      };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.error || 'Failed to reset password' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
