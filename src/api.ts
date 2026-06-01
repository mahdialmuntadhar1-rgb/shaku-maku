import axios from 'axios';
import { clearSession, normalizeEmail, normalizeUser, readSession, writeSession } from './auth/session';

const DEFAULT_API_URL = 'https://iraq-businesses-dashboard.mahdialmuntadhar1.workers.dev/api';
const rawApiUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  },
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = readSession()?.token;
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

const isBackendUnavailable = (error: any) =>
  !error.response || error.response.status === 404 || error.code === 'ERR_NETWORK';

const createLocalSession = (email: string, name?: string, message = 'Local session created while backend auth is unavailable'): AuthResponse => {
  const cleanEmail = normalizeEmail(email);
  const user = normalizeUser({
    id: `local-${cleanEmail}`,
    email: cleanEmail,
    name: name || cleanEmail.split('@')[0],
    user_type: 'explorer'
  });
  const token = `local_${Date.now()}`;
  const session = user ? writeSession(token, user) : null;
  return session
    ? { success: true, user: session.user, token: session.token, message }
    : { success: false, error: 'Unable to create local session' };
};

export const businessesApi = {
  getAll: async (params?: any) => {
    try {
      const response = await api.get('/businesses', { params });
      return response.data;
    } catch (error: any) {
      if (isBackendUnavailable(error)) {
        console.warn('Backend unavailable, using mock data');
        const { MOCK_BUSINESSES } = await import('./mockData');
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
    try {
      const response = await api.get('/feed/business-posts');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        try {
          const response = await api.get('/posts');
          return response.data;
        } catch (fallbackError: any) {
          if (isBackendUnavailable(fallbackError)) return { data: [], posts: [] };
          throw fallbackError;
        }
      }
      if (isBackendUnavailable(error)) return { data: [], posts: [] };
      throw error;
    }
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
  delete: async (id: number | string, adminEmail?: string) => {
    const response = await api.delete(`/posts/${id}`, {
      data: adminEmail ? { adminEmail } : undefined
    });
    return response.data;
  }
};

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', { email: normalizeEmail(email), password });
      const token = response.data.token;
      const user = normalizeUser(response.data.user || response.data.data || response.data);
      if (token && user) {
        writeSession(token, user);
        return { success: true, ...response.data, user, token };
      }
      return { success: false, error: response.data.error || response.data.message || 'Login response did not include a valid session' };
    } catch (error: any) {
      if (isBackendUnavailable(error)) {
        return createLocalSession(email, undefined, 'Local login because backend auth route is unavailable');
      }
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  },
  register: async (userData: any): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', {
        ...userData,
        email: normalizeEmail(userData.email)
      });
      const token = response.data.token;
      const user = normalizeUser(response.data.user || response.data.data || response.data);
      if (token && user) {
        writeSession(token, user);
        return { success: true, ...response.data, user, token };
      }
      return { success: false, error: response.data.error || response.data.message || 'Registration response did not include a valid session' };
    } catch (error: any) {
      if (isBackendUnavailable(error)) {
        return createLocalSession(userData.email, userData.name, 'Local account created because backend auth route is unavailable');
      }
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  },
  logout: () => {
    clearSession();
  },
  getCurrentUser: () => readSession()?.user || null,
  isAuthenticated: () => !!readSession(),
  setCurrentUser: (user: any) => {
    const token = readSession()?.token || `local_${Date.now()}`;
    writeSession(token, user);
  },
  signup: async (userData: any) => authApi.register(userData)
};

export const requestPasswordReset = async (identifier: string) => {
  const cleanIdentifier = normalizeEmail(identifier);
  try {
    const response = await api.post('/auth/forgot-password', { email: cleanIdentifier, username: cleanIdentifier });
    return response.data;
  } catch (error: any) {
    if (error.response?.status !== 404) throw error;
    const response = await api.post('/auth/request-reset', { username: cleanIdentifier });
    return response.data;
  }
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
