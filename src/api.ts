// API Client for Cloudflare Workers Backend
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://shaku-maku-api.mahdialmuntadhar1.workers.dev';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

// Auth token helper
function getAuthToken(): string {
  return localStorage.getItem('auth_token') || '';
}

function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}

// Auth Types
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

function unwrap<T>(payload: T | ApiResponse<T>): T {
  if (payload && typeof payload === 'object' && 'success' in (payload as any)) {
    const response = payload as ApiResponse<T>;
    if (!response.success) {
      throw new Error(response.error || 'Request failed');
    }
    return response.data;
  }
  return payload as T;
}

// Generic API wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  returnFullResponse = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    (defaultOptions.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const text = await response.text();
    let message = `HTTP error! status: ${response.status}`;
    try {
      const json = JSON.parse(text);
      const errorText = typeof json.error === 'object' && json.error !== null
        ? json.error.message || JSON.stringify(json.error)
        : json.error;
      message = errorText || json.message || message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }

  const data = await response.json();
  
  if (returnFullResponse) {
    return data as T;
  }
  
  return (data as ApiResponse<T>).data as T;
}

// Auth API
export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest<ApiResponse<AuthResponse>>('/api/auth/login', {
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

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await apiRequest<ApiResponse<AuthResponse>>('/api/auth/register', {
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

  async logout(): Promise<void> {
    clearAuthToken();
    authApi.clearCurrentUser();
    emitAuthChanged();
    try {
      await apiRequest<void>('/api/auth/logout', { method: 'POST' }, true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getMe(): Promise<AuthResponse['user']> {
    const response = await apiRequest<ApiResponse<AuthResponse['user']>>('/api/auth/me', {}, true);
    return unwrap<AuthResponse['user']>(response);
  },

  async forgotPassword(email: string): Promise<{ token?: string; message: string }> {
    const response = await apiRequest<any>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }, true);
    if (response?.data) return response.data;
    return { token: response?.token, message: response?.message || 'Password reset requested' };
  },

  async resetPassword(email: string, token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiRequest<any>('/api/auth/reset-password', {
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
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setCurrentUser(user: AuthResponse['user']): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    emitAuthChanged();
  },

  clearCurrentUser(): void {
    localStorage.removeItem('current_user');
    emitAuthChanged();
  }
};

// Maps frontend category chip IDs → DB category strings (exact DB values)
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

// Businesses API
export const businessesApi = {
  async list(params?: { cursor?: string; page?: number; limit?: number; governorate?: string; category?: string; search?: string }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.append('cursor', params.cursor);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.governorate) queryParams.append('governorate', params.governorate);
    // Translate frontend chip ID to exact DB category string
    if (params?.category) {
      const dbCat = CATEGORY_DB_MAP[params.category] || params.category;
      queryParams.append('category', dbCat);
    }
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const endpoint = `/api/businesses${queryString ? `?${queryString}` : ''}`;

    const response = await apiRequest<ApiResponse<any[]>>(endpoint, {}, true);
    return unwrap<any[]>(response);
  },

  async get(id: string): Promise<any> {
    const response = await apiRequest<ApiResponse<any>>(`/api/businesses/${id}`, {}, true);
    return unwrap<any>(response);
  }
};

// Posts API
export const postsApi = {
  async list(params?: { page?: number; limit?: number; governorate?: string; category?: string; search?: string }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.governorate) queryParams.append('governorate', params.governorate);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const endpoint = `/api/feed/business-posts${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiRequest<ApiResponse<any[]>>(endpoint, {}, true);
    return unwrap<any[]>(response);
  },

  async create(post: any): Promise<any> {
    return apiRequest<any>('/api/feed/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  async like(postId: string): Promise<any> {
    return apiRequest<any>('/api/feed/posts/like', {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });
  }
};

// Admin API
export const adminApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest<ApiResponse<AuthResponse>>('/api/admin/login', {
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
    const response = await apiRequest<ApiResponse<any>>('/api/admin/stats', {}, true);
    return unwrap<any>(response);
  }
};
