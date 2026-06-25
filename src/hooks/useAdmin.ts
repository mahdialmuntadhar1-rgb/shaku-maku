import { useState, useEffect } from 'react';
import { AUTH_CHANGE_EVENT, readSession } from '../auth/session';
import { authApi } from '../api';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const check = () => {
    const session = readSession();
    if (!session) {
      setIsAdmin(false);
      setAdminEmail('');
      setLoading(false);
      return;
    }

    authApi.getMe()
      .then((user) => {
        const nextIsAdmin = user?.role === 'admin' || Number((user as any)?.is_admin || 0) === 1;
        setIsAdmin(nextIsAdmin);
        setAdminEmail(nextIsAdmin ? String(user.email || '') : '');
      })
      .catch(() => {
        setIsAdmin(false);
        setAdminEmail('');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    check();
    window.addEventListener('storage', check);
    window.addEventListener(AUTH_CHANGE_EVENT, check);
    return () => {
      window.removeEventListener('storage', check);
      window.removeEventListener(AUTH_CHANGE_EVENT, check);
    };
  }, []);

  return { isAdmin, adminEmail, loading };
};
