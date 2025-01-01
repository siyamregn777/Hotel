'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  email: string;
  exp: number;
}

interface User {
  email: string | null;
  isAuthenticated: boolean;
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ email: null, isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token and type it as DecodedToken
        const decoded = jwt.decode(token) as DecodedToken | null;

        if (decoded) {
          const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;

          if (!isExpired) {
            setUser({ email: decoded.email, isAuthenticated: true });
            return;
          }
        }
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
    setUser({ email: null, isAuthenticated: false });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
