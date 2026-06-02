import type { SessionUser } from '../auth/session';

export const isAdmin = (user?: Pick<SessionUser, 'role'> | null): boolean => user?.role === 'admin';
