'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// Define the structure of the decoded token
interface DecodedToken {
  email: string;
  role: string; // Add role to the token structure
  exp: number;
}

// Define the structure of the user state
interface User {
  email: string | null;
  isAuthenticated: boolean;
  role: string | null; // Add role to the user state
}

// Define the context properties
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void; // Logout function
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    email: null,
    isAuthenticated: false,
    role: null,
  });

  // Effect to check for a token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token) as DecodedToken | null;
        if (decoded) {
          const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
          if (!isExpired) {
            setUser({
              email: decoded.email,
              isAuthenticated: true,
              role: decoded.role, // Extract role from token
            });
            return;
          }
        }
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
    // Reset state if token is invalid or expired
    setUser({ email: null, isAuthenticated: false, role: null });
  }, []);

  // Logout function to clear user state and token
  const logout = () => {
    localStorage.removeItem('token');
    setUser({ email: null, isAuthenticated: false, role: null });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
