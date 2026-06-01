import axios from 'axios';
import { clearSession, isAdminEmail, normalizeEmail, normalizeUser, readSession, writeSession } from './auth/session';

const DEFAULT_API_URL = 'https://iraq-businesses-dashboard.mahdialmuntadhar1.workers.dev/api';
const rawApiUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

const allowLocalAuthFallback =
  import.meta.env.DEV || import.meta.env.VITE_ALLOW_LOCAL_AUTH_FALLBACK === 'true';

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
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Record<string, unknown>;
  error?: string;
  message?: string;
}

interface ApiListResponse<T> {
  data?: T[];
  businesses?: T[];
  posts?: T[];
  total?: number;
  success?: boolean;
  message?: string;
}

const isBackendUnavailable = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return !error.response || error.response.status === 404 || error.code === 'ERR_NETWORK';
};

const requireAdminMutation = (action: string) => {
  const email = readSession()?.user.email;
  if (!isAdminEmail(email)) {
    throw new Error(`Admin authorization required for ${action}.`);
  }
};

const createLocalSession = (email: string, name?: string): AuthResponse => {
  if (!allowLocalAuthFallback) {
    return {
      success: false,
      error: 'Authentication backend is unavailable and local fallback is disabled.'
    };
  }

  const cleanEmail = normalizeEmail(email);

  const user = normalizeUser({
    id: `local-${cleanEmail}`,
    email: cleanEmail,
    name: name || cleanEmail.split('@')[0],
    user_type: 'explorer'
  });

  if (!user) {
    return { success: false, error: 'Unable to create local session' };
  }

  const token = `local_${Date.now()}`;
  const session = writeSession(token, user);

  return session
    ? {
        success: true,
        user: session.user,
        token: session.token,
        message: 'Local session created because backend auth is unavailable.'
      }
    : { success: false, error: 'Unable to persist local session' };
};

const unwrapList = <T>(payload: ApiListResponse<T> | undefined, ...keys: Array<keyof ApiListResponse<T>>): T[] => {
  if (!payload) {
    return [];
  }

  for (const key of keys) {
    const value = payload[key];
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
};

export const businessesApi = {
  getAll: async <T = unknown>(params?: Record<string, unknown>): Promise<ApiListResponse<T>> => {
    try {
      const response = await api.get<ApiListResponse<T>>('/businesses', { params });
      return response.data;
    } catch (error) {
      if (!isBackendUnavailable(error)) {
        throw error;
      }

      console.warn('Businesses backend unavailable, using mock data');
      const { MOCK_BUSINESSES } = await import('./mockData');
      let filtered = [...MOCK_BUSINESSES];

      if (typeof params?.governorate === 'string') {
        filtered = filtered.filter((business) => business.governorate === params.governorate);
      }

      if (typeof params?.category === 'string') {
        filtered = filtered.filter((business) => business.category === params.category);
      }

      return {
        data: filtered as T[],
        businesses: filtered as T[],
        total: filtered.length
      };
    }
  },

  list: async <T = unknown>(params?: Record<string, unknown>): Promise<ApiListResponse<T>> =>
    businessesApi.getAll<T>(params),

  getById: async <T = unknown>(id: number | string): Promise<T> => {
    const response = await api.get<T>(`/businesses/${id}`);
    return response.data;
  },

  create: async <T = unknown>(business: Record<string, unknown>): Promise<T> => {
    requireAdminMutation('business create');
    const response = await api.post<T>('/businesses', business);
    return response.data;
  },

  update: async <T = unknown>(id: number | string, business: Record<string, unknown>): Promise<T> => {
    requireAdminMutation('business update');
    const response = await api.put<T>(`/businesses/${id}`, business);
    return response.data;
  },

  delete: async <T = unknown>(id: number | string): Promise<T> => {
    requireAdminMutation('business delete');
    const response = await api.delete<T>(`/businesses/${id}`);
    return response.data;
  }
};

export const postsApi = {
  getAll: async <T = unknown>(params?: Record<string, unknown>): Promise<ApiListResponse<T>> => {
    try {
      const response = await api.get<ApiListResponse<T>>('/feed/business-posts', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        try {
          const fallbackResponse = await api.get<ApiListResponse<T>>('/posts', { params });
          return fallbackResponse.data;
        } catch (fallbackError) {
          if (!isBackendUnavailable(fallbackError)) {
            throw fallbackError;
          }
          return { data: [], posts: [] };
        }
      }

      if (isBackendUnavailable(error)) {
        return { data: [], posts: [] };
      }

      throw error;
    }
  },
  list: async <T = unknown>(params?: Record<string, unknown>): Promise<ApiListResponse<T>> =>
    postsApi.getAll<T>(params),

  getById: async <T = unknown>(id: number | string): Promise<T> => {
    const response = await api.get<T>(`/posts/${id}`);
    return response.data;
  },

  create: async <T = unknown>(post: Record<string, unknown>): Promise<T> => {
    const response = await api.post<T>('/posts', post);
    return response.data;
  },

  update: async <T = unknown>(id: number | string, post: Record<string, unknown>): Promise<T> => {
    requireAdminMutation('post update');
    const response = await api.put<T>(`/posts/${id}`, post);
    return response.data;
  },

  delete: async <T = unknown>(id: number | string, adminEmail?: string): Promise<T> => {
    requireAdminMutation('post delete');
    const response = await api.delete<T>(`/posts/${id}`, {
      data: adminEmail ? { adminEmail } : undefined
    });
    return response.data;
  }
};

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', {
        email: normalizeEmail(email),
        password
      });

      const token = response.data.token;
      const user = normalizeUser(response.data.user || response.data.data || response.data);

      if (token && user) {
        writeSession(token, user);
        return { success: true, ...response.data, user, token };
      }

      return {
        success: false,
        error: response.data.error || response.data.message || 'Login response did not include a valid session.'
      };
    } catch (error) {
      if (isBackendUnavailable(error)) {
        return createLocalSession(email);
      }

      return {
        success: false,
        error: axios.isAxiosError(error) ? error.response?.data?.error || 'Login failed' : 'Login failed'
      };
    }
  },

  register: async (userData: Record<string, unknown>): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', {
        ...userData,
        email: normalizeEmail(String(userData.email || ''))
      });

      const token = response.data.token;
      const user = normalizeUser(response.data.user || response.data.data || response.data);

      if (token && user) {
        writeSession(token, user);
        return { success: true, ...response.data, user, token };
      }

      return {
        success: false,
        error:
          response.data.error || response.data.message || 'Registration response did not include a valid session.'
      };
    } catch (error) {
      if (isBackendUnavailable(error)) {
        return createLocalSession(String(userData.email || ''), String(userData.name || ''));
      }

      return {
        success: false,
        error: axios.isAxiosError(error)
          ? error.response?.data?.error || 'Registration failed'
          : 'Registration failed'
      };
    }
  },

  logout: (): void => {
    clearSession();
  },

  getCurrentUser: () => readSession()?.user || null,
  isAuthenticated: () => Boolean(readSession()),

  setCurrentUser: (user: Record<string, unknown>): void => {
    const token = readSession()?.token || `local_${Date.now()}`;
    writeSession(token, user);
  },

  signup: async (userData: Record<string, unknown>): Promise<AuthResponse> => authApi.register(userData)
};

export const requestPasswordReset = async (identifier: string): Promise<Record<string, unknown>> => {
  const cleanIdentifier = normalizeEmail(identifier);

  try {
    const response = await api.post('/auth/forgot-password', {
      email: cleanIdentifier,
      username: cleanIdentifier
    });
    return response.data;
  } catch (error) {
    if (!(axios.isAxiosError(error) && error.response?.status === 404)) {
      throw error;
    }

    const response = await api.post('/auth/request-reset', {
      username: cleanIdentifier
    });

    return response.data;
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<Record<string, unknown>> => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

export const getBusinesses = businessesApi.getAll;
export const login = authApi.login;
export const register = authApi.register;
export const logout = authApi.logout;

export const selectors = {
  unwrapBusinesses: <T = unknown>(payload: ApiListResponse<T>): T[] => unwrapList(payload, 'data', 'businesses'),
  unwrapPosts: <T = unknown>(payload: ApiListResponse<T>): T[] => unwrapList(payload, 'data', 'posts')
};

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
  resetPassword,
  selectors
};
