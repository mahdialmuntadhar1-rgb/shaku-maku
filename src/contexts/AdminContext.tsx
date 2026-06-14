import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAdmin as isAdminEmail } from '../config/admin';

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
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const email = user.email || user.user?.email;
        setIsAdmin(Boolean(email && isAdminEmail(email)));
      } catch (e) {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  const setAdminByEmail = (email: string) => {
    setIsAdmin(isAdminEmail(email));
  };

  useEffect(() => {
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setAdminByEmail, checkAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
