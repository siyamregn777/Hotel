'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// Define the structure of the decoded token
interface DecodedToken {
  userId: string; // Add userId to the token structure
  email: string;
  role: string;
  exp: number;
}

// Define the structure of the user state
interface User {
  userId: string | null; // Add userId to the user state
  email: string | null;
  isAuthenticated: boolean;
  role: string | null;
}

// Define the context properties
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void; // Logout function
}

// Create the UserContext
const UserContext = createContext<UserContextProps | undefined>(undefined);

// UserProvider component to wrap your application
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    userId: null, // Initialize userId
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
              userId: decoded.userId, // Extract userId from token
              email: decoded.email,
              isAuthenticated: true,
              role: decoded.role,
            });
            return;
          }
        }
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
    // Reset state if token is invalid or expired
    setUser({ userId: null, email: null, isAuthenticated: false, role: null });
  }, []);

  // Logout function to clear user state and token
  const logout = () => {
    localStorage.removeItem('token');
    setUser({ userId: null, email: null, isAuthenticated: false, role: null });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};