import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shaku-maku-api.mahdialmuntadhar1.workers.dev';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ===== TYPES =====
export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: any;
  error?: string;
  message?: string;
}

// ===== BUSINESS API with fallback to mock data on 404 =====
export const businessesApi = {
  getAll: async (params?: any) => {
    try {
      const response = await api.get('/businesses', { params });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('Backend not found, using mock data');
        const { MOCK_BUSINESSES } = await import('./mockData');
        let filtered = [...MOCK_BUSINESSES];
        if (params?.governorate) {
          filtered = filtered.filter(b => b.governorate === params.governorate);
        }
        if (params?.category) {
          filtered = filtered.filter(b => b.category === params.category);
        }
        return { businesses: filtered, total: filtered.length };
      }
      throw error;
    }
  },
  list: async (params?: any) => {
    return businessesApi.getAll(params);
  },
  getById: async (id: number) => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  },
  create: async (business: any) => {
    const response = await api.post('/businesses', business);
    return response.data;
  },
  update: async (id: number, business: any) => {
    const response = await api.put(`/businesses/${id}`, business);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/businesses/${id}`);
    return response.data;
  }
};

// ===== POSTS API =====
export const postsApi = {
  getAll: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  list: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  create: async (post: any) => {
    const response = await api.post('/posts', post);
    return response.data;
  },
  update: async (id: number, post: any) => {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  },
  delete: async (id: number, adminEmail?: string) => {
    const response = await api.delete(`/posts/${id}`, {
      data: adminEmail ? { adminEmail } : undefined
    });
    return response.data;
  }
};

// ===== AUTH API =====
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return { success: true, ...response.data };
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Demo mode: create a fake user
        const fakeUser = { id: Date.now(), email, name: email.split('@')[0] };
        const fakeToken = 'demo_' + Date.now();
        localStorage.setItem('auth_token', fakeToken);
        localStorage.setItem('user', JSON.stringify(fakeUser));
        return { success: true, user: fakeUser, token: fakeToken, message: 'Demo login (backend offline)' };
      }
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  },
  register: async (userData: any): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return { success: true, ...response.data };
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Demo mode: create a fake user
        const fakeUser = { id: Date.now(), email: userData.email, name: userData.name || userData.email };
        const fakeToken = 'demo_' + Date.now();
        localStorage.setItem('auth_token', fakeToken);
        localStorage.setItem('user', JSON.stringify(fakeUser));
        return { success: true, user: fakeUser, token: fakeToken, message: 'Demo account created (backend offline)' };
      }
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
  setCurrentUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  signup: async (userData: any) => {
    return authApi.register(userData);
  }
};

// ===== PASSWORD RESET =====
export const requestPasswordReset = async (identifier: string) => {
  const response = await api.post('/auth/request-reset', { username: identifier });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// ===== LEGACY EXPORTS =====
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
