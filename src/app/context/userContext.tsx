// src/context/userContext.tsx
'use client';
import React, { createContext, useState, ReactNode } from 'react';

export interface User {
  username: string;
  isAuthenticated: boolean;
  role?: 'admin' | 'user'; 
}

export interface UserContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};