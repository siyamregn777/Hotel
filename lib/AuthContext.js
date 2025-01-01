// src/lib/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data
        localStorage.setItem('token', token); // Store token
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user'); // Remove user data
        localStorage.removeItem('token'); // Remove token
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};