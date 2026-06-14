import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, authApi } from '../api';

interface User {
  id: number | string;
  email: string;
  name: string;
  user_type?: string;
  role?: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const result = await authApi.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (userData: any): Promise<AuthResponse> => {
    const result = await authApi.register(userData);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string; token?: string }> => {
    try {
      const response = await api.post('/auth/request-reset', { username: email.trim().toLowerCase() });
      const data = response.data;
      return {
        success: response.status === 200 || data.success,
        message: data.message || 'Password reset instructions were sent if this account exists.',
        token: data.token
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Password reset is unavailable. Please try again later.'
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      const data = response.data;
      return {
        success: response.status === 200 || data.success,
        message: data.message || 'Password reset successful'
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Password reset failed. Please try again.'
      };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
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
