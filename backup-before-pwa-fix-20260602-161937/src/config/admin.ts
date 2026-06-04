import { getAdminEmails, isAdminEmail } from '../auth/session';

export const ADMIN_EMAIL = 'safaribosafar@gmail.com';
export const ADMIN_EMAILS = getAdminEmails();

export const isAdmin = (email: string): boolean => isAdminEmail(email);
