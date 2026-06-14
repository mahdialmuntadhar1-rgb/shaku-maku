import { useState, useEffect } from 'react';
import { isAdmin as isAdminEmail } from '../config/admin';
import { authApi } from '../api';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (user?.email && isAdminEmail(user.email)) {
      setIsAdmin(true);
      setAdminEmail(user.email);
    }
    setLoading(false);
  }, []);

  return { isAdmin, adminEmail, loading };
};
