// API Client for Cloudflare Workers Backend
// Replaces Firebase with REST API calls

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://iraq-businesses-dashboard.mahdialmuntadhar1.workers.dev';

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Admin token helper
function getAdminToken(): string {
  return localStorage.getItem('admin_token') || '';
}

// Auth Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  };
  token: string;
}

// Generic API wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const token = localStorage.getItem('auth_token');
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json() as ApiResponse<T>;

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data.data as T;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Auth API - Real backend auth
export const authApi = {
  async login(credentials: LoginCredentials): Promise<any> {
    const result = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as any;
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('auth_user', JSON.stringify(result.user));
    }
    return result;
  },

  async signup(credentials: SignupCredentials): Promise<any> {
    const result = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as any;
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('auth_user', JSON.stringify(result.user));
    }
    return result;
  },

  async me(): Promise<any> {
    const token = this.getToken();
    if (!token) return null;
    return apiRequest('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  googleSignIn() {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  },

  async logout() {
    const token = this.getToken();
    if (token) {
      try {
        await apiRequest('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {}
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getUser(): any | null {
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Handle OAuth callback from URL params
  handleOAuthCallback(): { token: string; user: any } | null {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('auth_token');
    const userId = params.get('user_id');
    const email = params.get('email');
    const name = params.get('name');
    const avatar = params.get('avatar');

    if (token && userId) {
      const user = {
        id: userId,
        email: decodeURIComponent(email || ''),
        displayName: decodeURIComponent(name || ''),
        photoURL: decodeURIComponent(avatar || ''),
      };
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      window.history.replaceState({}, document.title, window.location.pathname);
      return { token, user };
    }
    return null;
  }
};

// Businesses API - Updated for Iraq Business Directory
export const businessesApi = {
  async list(params?: { governorate?: string; category?: string; city?: string; search?: string; limit?: number; offset?: number }) {
    const queryString = new URLSearchParams(params as any).toString();
    return apiRequest(`/api/businesses${queryString ? `?${queryString}` : ''}`);
  },

  async get(id: string) {
    return apiRequest(`/api/businesses/${id}`);
  },

  async create(business: any) {
    return apiRequest('/api/businesses', {
      method: 'POST',
      body: JSON.stringify(business),
    });
  },

  async update(id: string, business: any) {
    return apiRequest(`/api/admin/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(business),
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  async delete(id: string) {
    return apiRequest(`/api/admin/businesses/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  async like(id: string) {
    return apiRequest('/api/posts/like', {
      method: 'POST',
      body: JSON.stringify({ post_id: id }),
    });
  },

  async save(id: string) {
    return apiRequest('/api/posts/like', {
      method: 'POST',
      body: JSON.stringify({ post_id: id }),
    });
  },

  async claim(id: string) {
    console.warn('Claim not supported by Iraq backend');
    return Promise.reject(new Error('Not supported'));
  },
};

// Posts API - Updated for Iraq Business Directory
export const postsApi = {
  async list(params?: { governorate?: string; category?: string; page?: number; limit?: number }) {
    const queryString = new URLSearchParams(params as any).toString();
    return apiRequest(`/api/feed/business-posts${queryString ? `?${queryString}` : ''}`);
  },

  async create(post: any) {
    return apiRequest('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  async update(id: string, post: any) {
    return apiRequest(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  async delete(id: string) {
    return apiRequest(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  async like(postId: string, userId?: string) {
    return apiRequest('/api/posts/like', {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, user_id: userId || 'anonymous' }),
    });
  },

  async addComment(postId: string, comment: { text: string; username: string; user_id?: string }) {
    return apiRequest('/api/posts/comment', {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, text: comment.text, username: comment.username, user_id: comment.user_id || 'anonymous' }),
    });
  },

  async share(postId: string, platform: string, userId?: string) {
    return apiRequest('/api/posts/share', {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, platform, user_id: userId || 'anonymous' }),
    });
  },
};

// Metadata API - Updated for Iraq Business Directory
export const metadataApi = {
  async categories() {
    return apiRequest('/api/categories');
  },

  async governorates() {
    return apiRequest('/api/governorates');
  },

  async cities() {
    return apiRequest('/api/cities');
  },
};

// Hero Slides API
export const heroSlidesApi = {
  async list() {
    return apiRequest('/api/hero-slides');
  },
  async create(slide: any) {
    return apiRequest('/api/hero-slides', {
      method: 'POST',
      body: JSON.stringify(slide),
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },
  async update(id: string, slide: any) {
    return apiRequest(`/api/hero-slides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(slide),
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },
  async delete(id: string) {
    return apiRequest(`/api/hero-slides/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  }
};

// Banners API
export const bannersApi = {
  async list(position?: string) {
    const query = position ? `?position=${position}` : '';
    return apiRequest(`/api/banners${query}`);
  }
};

// Admin API
export const adminApi = {
  async login(credentials: { email: string; password: string }) {
    const result = await apiRequest('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as any;
    if (result.token) {
      localStorage.setItem('admin_token', result.token);
    }
    return result;
  },

  async getStats() {
    return apiRequest('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  async getComments() {
    return apiRequest('/api/admin/comments', {
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  async deleteComment(id: string) {
    return apiRequest(`/api/admin/comments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAdminToken()}` }
    });
  },

  logout() {
    localStorage.removeItem('admin_token');
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin_token');
  }
};

// Health check - Updated for Iraq Business Directory
export async function healthCheck(): Promise<{ status: string }> {
  return apiRequest('/api/health');
}
