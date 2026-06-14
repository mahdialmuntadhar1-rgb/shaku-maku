// Admin configuration. This only controls client UI visibility; the API must
// enforce the same whitelist before allowing admin mutations.
export const ADMIN_EMAILS = (
  import.meta.env.VITE_ADMIN_EMAILS || 'safaribosafar@gmail.com'
)
  .split(',')
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export const isAdmin = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
};
