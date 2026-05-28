// API Client for Cloudflare Workers Backend
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://billboard3d-api.mahdialmuntadhar1.workers.dev';

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
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
    const response = await apiRequest<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, true);
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await apiRequest<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, true);
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  async logout(): Promise<void> {
    clearAuthToken();
    try {
      await apiRequest<void>('/api/auth/logout', { method: 'POST' }, true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getMe(): Promise<AuthResponse['user']> {
    return apiRequest<AuthResponse['user']>('/api/auth/me', {}, true);
  },

  async forgotPassword(email: string): Promise<{ token?: string; message: string }> {
    return apiRequest<{ token?: string; message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }, true);
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }, true);
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
  },

  clearCurrentUser(): void {
    localStorage.removeItem('current_user');
  }
};

// Maps frontend category chip IDs → DB category strings (exact DB values)
export const CATEGORY_DB_MAP: Record<string, string> = {
  restaurants_cafes: 'Restaurants & Cafes',
  hotels_hospitality: 'Hotels & Hospitality',
  health_medical_services: 'Health & Medical Services',
  fitness_gyms: 'Fitness & Gyms',
  education_training_centers: 'Education & Training Centers',
  real_estate: 'Real Estate',
  construction_contractors: 'Construction & Contractors',
  beauty_salons: 'Beauty & Salons',
  electronics_tech_shops: 'Electronics & Tech Shops',
  it_software_services: 'IT & Software Services',
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

    return apiRequest<any>(endpoint, {}, true);
  },

  async get(id: string): Promise<any> {
    return apiRequest<any>(`/api/businesses/${id}`, {}, true);
  }
};

// Posts API
export const postsApi = {
  async list(params?: { page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const queryString = queryParams.toString();
    const endpoint = `/api/feed/business-posts${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<any>(endpoint, {}, true);
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
    const response = await apiRequest<{ user: any; token: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, true);
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  async getStats(): Promise<any> {
    return apiRequest<any>('/api/admin/stats', {}, true);
  }
};
