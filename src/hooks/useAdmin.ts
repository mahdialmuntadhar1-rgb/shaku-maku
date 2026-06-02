import { useState, useEffect } from 'react';
import { AUTH_CHANGE_EVENT, readSession } from '../auth/session';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const check = () => {
    const user = readSession()?.user;
    const nextIsAdmin = user?.role === 'admin';
    setIsAdmin(nextIsAdmin);
    setAdminEmail(nextIsAdmin ? user.email : '');
    setLoading(false);
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
