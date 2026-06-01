import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AUTH_CHANGE_EVENT, isAdminEmail, readSession } from '../auth/session';

interface AdminContextType {
  isAdmin: boolean;
  setAdminByEmail: (email: string) => void;
  checkAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = () => {
    setIsAdmin(isAdminEmail(readSession()?.user.email));
  };

  const setAdminByEmail = (email: string) => {
    setIsAdmin(isAdminEmail(email));
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

  return (
    <AdminContext.Provider value={{ isAdmin, setAdminByEmail, checkAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
