const RAW_API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://shaku-maku.mahdialmuntadhar1.workers.dev';
const RAW_API_BASE_URL_STRING = String(RAW_API_BASE_URL).trim();

export const API_BASE_URL =
  RAW_API_BASE_URL_STRING === '/api'
    ? ''
    : RAW_API_BASE_URL_STRING.replace(/\/+$/, '').replace(/\/api$/i, '');
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  token: string;
}

function emitAuthChanged(): void {
  window.dispatchEvent(new CustomEvent('auth-changed'));
}

function getAuthToken(): string {
  return localStorage.getItem('auth_token') || '';
}

function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}

function unwrap<T>(payload: T | ApiResponse<T>): T {
  if (payload && typeof payload === 'object' && 'success' in (payload as any)) {
    const response = payload as ApiResponse<T>;
    if (!response.success) {
      throw new Error(response.error || response.message || 'Request failed');
    }
    return response.data;
  }
  return payload as T;
}

export function getApiErrorMessage(error: any): string {
  if (!error) return 'Request failed';
  if (typeof error === 'string') return error;
  if (typeof error.message === 'string' && error.message.trim()) return error.message;
  if (typeof error?.response?.data?.error === 'string') return error.response.data.error;
  if (typeof error?.response?.data?.message === 'string') return error.response.data.message;
  return 'Request failed';
}

function toApiEndpoint(endpoint: string): string {
  if (endpoint.startsWith('/api/')) return endpoint;
  if (endpoint.startsWith('/')) return `/api${endpoint}`;
  return `/api/${endpoint}`;
}

function encodeQueryParams(params?: Record<string, unknown>): string {
  if (!params) return '';
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    query.append(key, String(value));
  });
  const out = query.toString();
  return out ? `?${out}` : '';
}

async function parseJsonOrText(res: Response): Promise<any> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}, returnFullResponse = false): Promise<T> {
  const url = `${API_BASE_URL}${toApiEndpoint(endpoint)}`;
  const token = getAuthToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await parseJsonOrText(response);
  if (!response.ok) {
    const message =
      (typeof data === 'object' && data && (data.error || data.message)) ||
      `HTTP error! status: ${response.status}`;
    const err: any = new Error(String(message));
    err.response = { status: response.status, data };
    throw err;
  }

  if (returnFullResponse) {
    return data as T;
  }

  return (data as ApiResponse<T>).data as T;
}

async function rawRequest<T>(
  method: string,
  endpoint: string,
  payload?: unknown,
  params?: Record<string, unknown>
): Promise<{ status: number; data: T }> {
  const url = `${API_BASE_URL}${toApiEndpoint(endpoint)}${encodeQueryParams(params)}`;
  const token = getAuthToken();

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });

  const data = await parseJsonOrText(response);
  if (!response.ok) {
    const message =
      (typeof data === 'object' && data && (data.error || data.message)) ||
      `HTTP error! status: ${response.status}`;
    const err: any = new Error(String(message));
    err.response = { status: response.status, data };
    throw err;
  }

  return { status: response.status, data: data as T };
}

export const api = {
  get(endpoint: string, config?: { params?: Record<string, unknown> }) {
    return rawRequest<any>('GET', endpoint, undefined, config?.params);
  },
  options(endpoint: string, config?: { params?: Record<string, unknown> }) {
    return rawRequest<any>('OPTIONS', endpoint, undefined, config?.params);
  },
  post(endpoint: string, payload?: unknown, config?: { params?: Record<string, unknown> }) {
    return rawRequest<any>('POST', endpoint, payload, config?.params);
  },
  put(endpoint: string, payload?: unknown, config?: { params?: Record<string, unknown> }) {
    return rawRequest<any>('PUT', endpoint, payload, config?.params);
  },
  patch(endpoint: string, payload?: unknown, config?: { params?: Record<string, unknown> }) {
    return rawRequest<any>('PATCH', endpoint, payload, config?.params);
  },
  delete(endpoint: string, config?: { params?: Record<string, unknown> }) {
    return rawRequest<any>('DELETE', endpoint, undefined, config?.params);
  },
};

export const authApi = {
  async login(credentials: LoginCredentials | string, password?: string): Promise<AuthResponse> {
    const payload: LoginCredentials =
      typeof credentials === 'string'
        ? { email: credentials, password: String(password || '') }
        : credentials;

    const response = await apiRequest<ApiResponse<AuthResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, true);

    const data = unwrap<AuthResponse>(response);
    if (data.token) {
      setAuthToken(data.token);
      authApi.setCurrentUser(data.user);
    }
    return data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await apiRequest<ApiResponse<AuthResponse>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, true);

    const data = unwrap<AuthResponse>(response);
    if (data.token) {
      setAuthToken(data.token);
      authApi.setCurrentUser(data.user);
    }
    return data;
  },

  async register(credentials: SignupCredentials): Promise<AuthResponse> {
    return authApi.signup(credentials);
  },

  async logout(): Promise<void> {
    clearAuthToken();
    authApi.clearCurrentUser();
    emitAuthChanged();
    try {
      await apiRequest<void>('/auth/logout', { method: 'POST' }, true);
    } catch {
      // Best effort
    }
  },

  async getMe(): Promise<AuthResponse['user']> {
    const response = await apiRequest<ApiResponse<AuthResponse['user']>>('/auth/me', {}, true);
    return unwrap<AuthResponse['user']>(response);
  },

  async forgotPassword(email: string): Promise<{ message: string; emailSent?: boolean }> {
    localStorage.setItem('password_reset_email', email);
    const response = await apiRequest<any>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }, true);

    const data = response?.data || response || {};
    return {
      message: data.message || response?.message || 'If the email exists, a reset link has been sent',
      emailSent: data.emailSent
    };
  },

  async resetPassword(email: string, token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiRequest<any>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, token, newPassword }),
    }, true);
    if (response?.data) return response.data;
    return { message: response?.message || 'Password updated successfully' };
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  },

  getCurrentUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('current_user') || localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      localStorage.removeItem('current_user');
      localStorage.removeItem('user');
      return null;
    }
  },

  setCurrentUser(user: AuthResponse['user']): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
    emitAuthChanged();
  },

  clearCurrentUser(): void {
    localStorage.removeItem('current_user');
    localStorage.removeItem('user');
    emitAuthChanged();
  },
};

export const CATEGORY_DB_MAP: Record<string, string> = {
  restaurant: 'Restaurants',
  cafe_bakery: 'Cafés & Bakeries',
  supermarket: 'Supermarkets',
  mall: 'Malls & Shopping',
  pharmacy: 'Pharmacies',
  hospital: 'Hospitals',
  clinic: 'Clinics',
  doctor: 'Doctors',
  dentist: 'Dentists',
  salon: 'Beauty Salons',
  gym: 'Fitness & Gyms',
  hotel: 'Hotels & Hospitality',
  education: 'Education & Training Centers',
  real_estate: 'Real Estate',
  construction: 'Construction & Contractors',
  electronics: 'Electronics & Tech Shops',
  it_software: 'IT & Software Services',
};

export const businessesApi = {
  async list(params?: { cursor?: string; page?: number; limit?: number; governorate?: string; category?: string; search?: string }): Promise<any[]> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.append('cursor', params.cursor);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.governorate) queryParams.append('governorate', params.governorate);
    if (params?.category) queryParams.append('category', CATEGORY_DB_MAP[params.category] || params.category);
    if (params?.search) queryParams.append('search', params.search);

    const endpoint = `/businesses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiRequest<ApiResponse<any[]>>(endpoint, {}, true);
    return unwrap<any[]>(response);
  },

  async get(id: string): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>(`/businesses/${id}`, {}, true);
    return unwrap<any>(response);
  },

  async create(payload: any): Promise<any> {
    const mapped: Record<string, unknown> = {
      name_ar: payload?.name_ar ?? payload?.name ?? '',
      name_ku: payload?.name_ku ?? payload?.name ?? '',
      name_en: payload?.name_en ?? payload?.name ?? '',
      description_ar: payload?.description_ar ?? payload?.description ?? null,
      description_ku: payload?.description_ku ?? payload?.description ?? null,
      description_en: payload?.description_en ?? payload?.description ?? null,
      address_ar: payload?.address_ar ?? payload?.address ?? null,
      address_ku: payload?.address_ku ?? payload?.address ?? null,
      address_en: payload?.address_en ?? payload?.address ?? null,
      phone_number: payload?.phone_number ?? payload?.phone ?? null,
      category: payload?.category ?? null,
      governorate: payload?.governorate ?? null,
      image: payload?.image ?? null,
      avatar: payload?.avatar ?? null,
      is_verified: payload?.is_verified ?? 0,
      map_coords_x: payload?.map_coords_x ?? null,
      map_coords_y: payload?.map_coords_y ?? null,
    };

    return apiRequest<any>(`/businesses`, {
      method: 'POST',
      body: JSON.stringify(mapped),
    }, true);
  },

  async update(id: string, payload: any): Promise<any> {
    const mapped: Record<string, unknown> = {
      ...(payload?.name ? { name_ar: payload.name, name_ku: payload.name, name_en: payload.name } : {}),
      ...(payload?.description ? { description_ar: payload.description, description_ku: payload.description, description_en: payload.description } : {}),
      ...(payload?.address ? { address_ar: payload.address, address_ku: payload.address, address_en: payload.address } : {}),
      ...(payload?.phone ? { phone_number: payload.phone } : {}),
      ...(payload?.category ? { category: payload.category } : {}),
      ...(payload?.governorate ? { governorate: payload.governorate } : {}),
    };
    return apiRequest<any>(`/businesses/${id}`, { method: 'PATCH', body: JSON.stringify(mapped) }, true);
  },

  async delete(id: string): Promise<any> {
    return apiRequest<any>(`/businesses/${id}`, { method: 'DELETE' }, true);
  },
};

export const postsApi = {
  async list(params?: { page?: number; limit?: number; governorate?: string; category?: string; search?: string }): Promise<any[]> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.governorate) queryParams.append('governorate', params.governorate);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);

    const endpoint = `/feed/business-posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiRequest<ApiResponse<any[]>>(endpoint, {}, true);
    return unwrap<any[]>(response);
  },

  async create(post: any): Promise<any> {
    return apiRequest<any>('/feed/posts', { method: 'POST', body: JSON.stringify(post) }, true);
  },

  async like(postId: string | number): Promise<any> {
    return apiRequest<any>('/feed/posts/like', {
      method: 'POST',
      body: JSON.stringify({ postId }),
    }, true);
  },

  async getComments(postId: string | number): Promise<any[]> {
    const response = await apiRequest<ApiResponse<any[]>>(`/feed/posts/${postId}/comments`, {}, true);
    return unwrap<any[]>(response);
  },

  async createComment(postId: string | number, text: string): Promise<any> {
    return apiRequest<any>(`/feed/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    }, true);
  },

  async share(postId: string | number): Promise<any> {
    return apiRequest<any>(`/feed/posts/${postId}/share`, { method: 'POST' }, true);
  },

  async update(id: string, payload: any): Promise<any> {
    const mapped: Record<string, unknown> = {};
    if (typeof payload?.caption === 'string') {
      mapped.caption_ar = payload.caption;
      mapped.caption_ku = payload.caption;
      mapped.caption_en = payload.caption;
    }
    if (payload?.governorate !== undefined) mapped.governorate = payload.governorate;
    if (payload?.category !== undefined) mapped.category = payload.category;
    if (payload?.media_url !== undefined) mapped.media_url = payload.media_url;
    if (payload?.video_url !== undefined) mapped.video_url = payload.video_url;
    if (payload?.promotion_badge_ar !== undefined) mapped.promotion_badge_ar = payload.promotion_badge_ar;
    if (payload?.promotion_badge_ku !== undefined) mapped.promotion_badge_ku = payload.promotion_badge_ku;
    if (payload?.promotion_badge_en !== undefined) mapped.promotion_badge_en = payload.promotion_badge_en;

    if (Object.keys(mapped).length === 0) {
      throw new Error('No supported post fields to update');
    }

    return apiRequest<any>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(mapped),
    }, true);
  },

  async delete(id: string | number): Promise<any> {
    return apiRequest<any>(`/posts/${id}`, { method: 'DELETE' }, true);
  }
};

export const heroSlidesApi = {
  async list(): Promise<any[]> {
    const response = await apiRequest<ApiResponse<any[]>>('/hero-slides', {}, true);
    return unwrap<any[]>(response);
  },

  async create(slide: any): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>('/hero-slides', {
      method: 'POST',
      body: JSON.stringify(slide),
    }, true);
    return unwrap<any>(response);
  },

  async update(id: string, payload: any): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>(`/hero-slides/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, true);
    return unwrap<any>(response);
  },

  async delete(id: string): Promise<any> {
    return apiRequest<any>(`/hero-slides/${id}`, {
      method: 'DELETE',
    }, true);
  },
};

export const businessSubmissionsApi = {
  async create(payload: any): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>('/business-submissions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, true);
    return unwrap<any>(response);
  },

  async list(status = 'pending'): Promise<any[]> {
    const response = await apiRequest<ApiResponse<any[]>>(`/business-submissions?status=${encodeURIComponent(status)}`, {}, true);
    return unwrap<any[]>(response);
  },

  async approve(id: string): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>(`/business-submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'approved' }),
    }, true);
    return unwrap<any>(response);
  },

  async reject(id: string): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>(`/business-submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'rejected' }),
    }, true);
    return unwrap<any>(response);
  },
};

export const adminApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest<ApiResponse<AuthResponse>>('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, true);

    const data = unwrap<AuthResponse>(response);
    if (data.token) {
      setAuthToken(data.token);
      authApi.setCurrentUser(data.user);
    }
    return data;
  },

  async getStats(): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>('/admin/stats', {}, true);
    return unwrap<any>(response);
  },
};

export async function requestPasswordReset(email: string): Promise<{ success?: boolean; message: string }> {
  const response = await authApi.forgotPassword(email);
  return { success: true, message: response.message };
}

export async function resetPassword(token: string, newPassword: string, email?: string): Promise<{ success: boolean; message: string }> {
  const resolvedEmail = email || localStorage.getItem('password_reset_email') || '';
  const response = await authApi.resetPassword(resolvedEmail, token, newPassword);
  return { success: true, message: response.message };
}

export async function getBusinesses(params?: { page?: number; limit?: number; governorate?: string; category?: string; search?: string }): Promise<any> {
  const businesses = await businessesApi.list(params);
  return { businesses, total: businesses.length, data: businesses };
}



