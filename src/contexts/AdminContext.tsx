import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AUTH_CHANGE_EVENT, readSession } from '../auth/session';

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
    setIsAdmin(readSession()?.user.role === 'admin');
  };

  const setAdminByEmail = (email: string): void => {
    const session = readSession();
    setIsAdmin(Boolean(email && session?.user.email === email && session.user.role === 'admin'));
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
