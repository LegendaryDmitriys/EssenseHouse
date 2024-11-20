import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from "../api/api.ts";

interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAuth = accessToken !== null;
        setIsAuthenticated(isAuth);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${config.API_URL}auth/login/`, { email, password });
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            setIsAuthenticated(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Ошибка при авторизации:", error.response?.data || error.message);
            } else {
                console.error("Неизвестная ошибка:", error);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    };

    const refreshToken = async () => {
        try {
            const refresh = localStorage.getItem('refreshToken');
            if (!refresh) throw new Error("Refresh token отсутствует");

            const response = await axios.post(`${config.API_URL}auth/token/refresh/`, { refresh });
            localStorage.setItem('accessToken', response.data.access);
            console.log("Токен обновлен");
        } catch (error) {
            console.error("Ошибка обновления токена:", error);
            logout();
        }
    };


    useEffect(() => {
        const interval = setInterval(async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
                const isExpiringSoon = tokenPayload.exp * 1000 - Date.now() < 60000; // 1 минута до истечения
                if (isExpiringSoon) {
                    await refreshToken();
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, refreshToken }}>
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
