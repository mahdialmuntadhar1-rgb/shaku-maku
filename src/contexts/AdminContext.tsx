import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AUTH_CHANGE_EVENT, readSession } from '../auth/session';
import { authApi } from '../api';

interface AdminContextType {
  isAdmin: boolean;
  setAdminByEmail: (email: string) => void;
  checkAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }

  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = (): void => {
    const session = readSession();
    if (!session) {
      setIsAdmin(false);
      return;
    }

    authApi.getMe()
      .then((user) => {
        setIsAdmin(user?.role === 'admin' || Number((user as any)?.is_admin || 0) === 1);
      })
      .catch(() => {
        setIsAdmin(false);
      });
  };

  const setAdminByEmail = (_email: string): void => {
    const session = readSession();
    setIsAdmin(session?.user.role === 'admin' || Number(session?.user.is_admin || 0) === 1);
  };

  useEffect(() => {
    checkAdmin();

    window.addEventListener('storage', checkAdmin);
    window.addEventListener(AUTH_CHANGE_EVENT, checkAdmin);

    return () => {
      window.removeEventListener('storage', checkAdmin);
      window.removeEventListener(AUTH_CHANGE_EVENT, checkAdmin);
    };
  }, []);

  const value = useMemo<AdminContextType>(
    () => ({
      isAdmin,
      setAdminByEmail,
      checkAdmin
    }),
    [isAdmin]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
