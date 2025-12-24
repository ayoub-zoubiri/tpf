import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/user');
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            setUser(user);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/register', { name, email, password });
            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            setUser(user);
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            // Extract specific validation errors if available
            const responseData = error.response?.data;
            let errorMessage = 'Registration failed';
            
            if (responseData?.errors) {
                // Get the first validation error message
                const firstErrorKey = Object.keys(responseData.errors)[0];
                if (firstErrorKey && responseData.errors[firstErrorKey][0]) {
                    errorMessage = responseData.errors[firstErrorKey][0];
                }
            } else if (responseData?.message) {
                errorMessage = responseData.message;
            }
            
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin: user?.role === 'admin' }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
