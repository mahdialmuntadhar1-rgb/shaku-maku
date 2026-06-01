import { useState, useEffect } from 'react';
import { AUTH_CHANGE_EVENT, isAdminEmail, readSession } from '../auth/session';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const check = () => {
    const email = readSession()?.user.email || '';
    setIsAdmin(isAdminEmail(email));
    setAdminEmail(isAdminEmail(email) ? email : '');
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
