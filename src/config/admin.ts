// Admin configuration
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export const isAdmin = (email: string): boolean => {
  return email === ADMIN_EMAIL;
};
