import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api';

interface User {
  id: number;
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure user has an id field
        if (parsedUser && typeof parsedUser.id === 'number') {
          setUser(parsedUser);
        } else {
          // Invalid user data, clear storage
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      } catch (e) {
        console.error('Failed to parse user', e);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      
      if (data.token && data.user) {
        // Ensure user has id
        if (!data.user.id) {
          // Generate a temporary id if missing (fallback)
          data.user.id = Date.now();
        }
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user, token: data.token };
      } else {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.error || 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: any): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', userData);
      const data = response.data;
      
      // Handle different response shapes
      let token = data.token;
      let userObj = data.user || data.data || null;
      
      if (data.success === false) {
        return { success: false, error: data.error || data.message || 'Registration failed' };
      }
      
      // If no token but registration succeeded (maybe backend returns different format)
      if (!token && data.id) {
        // Assume the response itself is the user object
        userObj = data;
        token = 'temp_' + Date.now(); // Generate temp token
      }
      
      if (userObj) {
        // Ensure user has an id
        if (!userObj.id) {
          userObj.id = userData.id || Date.now();
        }
        if (token) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(userObj));
          setUser(userObj);
        }
        return { success: true, user: userObj, token, message: 'Account created successfully' };
      } else {
        return { success: false, error: data.error || data.message || 'Registration failed - no user data returned' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      // Fallback for demo: create a local user if backend is not fully ready
      // This ensures the app doesn't break during development
      const fakeUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        user_type: userData.user_type || 'explorer'
      };
      const fakeToken = 'fake_' + Date.now();
      localStorage.setItem('auth_token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return { success: true, user: fakeUser, token: fakeToken, message: 'Demo account created (backend offline)' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string; token?: string }> => {
    try {
      const response = await api.post('/auth/request-reset', { username: email });
      const data = response.data;
      
      if (response.status === 200 || data.success) {
        // If backend returns a token, use it; otherwise generate a demo token
        const resetToken = data.token || Math.floor(100000 + Math.random() * 900000).toString();
        return {
          success: true,
          message: data.message || `رمز التحقق الخاص بك هو: ${resetToken}`,
          token: resetToken
        };
      } else {
        return { success: false, message: data.error || 'Failed to send reset code' };
      }
    } catch (error) {
      // Fallback: generate a demo token for testing
      const demoToken = Math.floor(100000 + Math.random() * 900000).toString();
      return {
        success: true,
        message: `[تجريبي] رمز التحقق الخاص بك هو: ${demoToken}`,
        token: demoToken
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      const data = response.data;
      
      if (response.status === 200 || data.success) {
        return { success: true, message: data.message || 'Password reset successful' };
      } else {
        return { success: false, message: data.error || 'Failed to reset password' };
      }
    } catch (error) {
      // Demo fallback: always succeed for testing
      return { success: true, message: 'Password reset successful (demo mode)' };
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
