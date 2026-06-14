import axios from 'axios';
import { MOCK_BUSINESSES } from './mockData';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shaku-maku.mahdialmuntadhar1.workers.dev';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: any;
  error?: string;
  message?: string;
}

const normalizeApiUser = (user: any) => {
  if (!user) return null;
  const id = user.id ?? user.uid;
  if (!id || !user.email) return null;
  const email = String(user.email).trim().toLowerCase();
  return {
    ...user,
    id,
    email,
    name: user.name || user.displayName || email.split('@')[0]
  };
};

export const businessesApi = {
  getAll: async (params?: any) => {
    try {
      const response = await api.get('/businesses', { params });
      if (typeof response.data === 'string') {
        throw new Error('API returned HTML/text instead of business JSON');
      }
      return response.data;
    } catch (error: any) {
      if (!error.response || error.response.status === 404) {
        console.warn('Backend unavailable, using bundled business data');
        let filtered = [...MOCK_BUSINESSES];
        if (params?.governorate) {
          filtered = filtered.filter(b => b.governorate === params.governorate);
        }
        if (params?.category) {
          filtered = filtered.filter(b => b.category === params.category);
        }
        return { data: filtered, businesses: filtered, total: filtered.length };
      }
      throw error;
    }
  },
  list: async (params?: any) => businessesApi.getAll(params),
  getById: async (id: number | string) => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  },
  create: async (business: any) => {
    const response = await api.post('/businesses', business);
    return response.data;
  },
  update: async (id: number | string, business: any) => {
    const response = await api.put(`/businesses/${id}`, business);
    return response.data;
  },
  delete: async (id: number | string) => {
    const response = await api.delete(`/businesses/${id}`);
    return response.data;
  }
};

export const postsApi = {
  getAll: async () => {
    const response = await api.get('/posts');
    if (typeof response.data === 'string') {
      throw new Error('API returned HTML/text instead of posts JSON');
    }
    return response.data;
  },
  list: async () => postsApi.getAll(),
  getById: async (id: number | string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  create: async (post: any) => {
    const response = await api.post('/posts', post);
    return response.data;
  },
  update: async (id: number | string, post: any) => {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  },
  delete: async (id: number | string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  }
};

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', { email: email.trim().toLowerCase(), password });
      const user = normalizeApiUser(response.data.user || response.data.data);
      if (response.data.token && user) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, ...response.data, user };
      }
      return { success: false, error: response.data?.error || 'Login failed: invalid API response' };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  },
  register: async (userData: any): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', {
        email: String(userData.email || '').trim().toLowerCase(),
        password: userData.password,
        name: userData.name
      });
      const user = normalizeApiUser(response.data.user || response.data.data);
      if (response.data.token && user) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, ...response.data, user };
      }
      return { success: false, error: response.data?.error || 'Registration failed: invalid API response' };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr || !localStorage.getItem('auth_token')) return null;
    try {
      return normalizeApiUser(JSON.parse(userStr));
    } catch {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      return null;
    }
  },
  isAuthenticated: () => Boolean(localStorage.getItem('auth_token') && localStorage.getItem('user')),
  setCurrentUser: (user: any) => {
    const normalizedUser = normalizeApiUser(user);
    if (normalizedUser) localStorage.setItem('user', JSON.stringify(normalizedUser));
  },
  signup: async (userData: any) => authApi.register(userData)
};

export const requestPasswordReset = async (identifier: string) => {
  const response = await api.post('/auth/request-reset', { username: identifier.trim().toLowerCase() });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

export const getBusinesses = businessesApi.getAll;
export const login = authApi.login;
export const register = authApi.register;
export const logout = authApi.logout;

export default {
  api,
  authApi,
  businessesApi,
  postsApi,
  getBusinesses,
  login,
  register,
  logout,
  requestPasswordReset,
  resetPassword
};
