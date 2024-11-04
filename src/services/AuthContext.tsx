import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from "../api/api.ts";

interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAuth = accessToken !== null;
        console.log("Проверка токена при инициализации:", { accessToken, isAuth });
        setIsAuthenticated(isAuth);
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    const login = async (email: string, password: string) => {
        console.log("Попытка входа:", { email, password });
        try {
            const response = await axios.post(`${config.API_URL}auth/login/`, { email, password });
            console.log("Успешный вход:", response.data);

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            setIsAuthenticated(true);
            console.log("Состояние аутентификации после входа:", { isAuthenticated: true });
        } catch (error) {
            console.error("Ошибка при авторизации:", error.response?.data || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
