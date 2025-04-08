
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import config from "@/api/api.ts";

interface User {
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    addToFavorites: (projectId: string) => void;
    removeFromFavorites: (projectId: string) => void;
    favorites: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('accessToken');
        const storedFavorites = localStorage.getItem('favorites');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);

            const response = await fetch(`${config.API_URL}auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Login failed');
            }

            const data = await response.json();

            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            const userObj = { email };
            localStorage.setItem('user', JSON.stringify(userObj));

            setUser(userObj);
            toast({
                title: "Успешный вход",
                description: "Вы успешно вошли в систему",
            });

            navigate('/profile');
        } catch (error) {
            toast({
                title: "Ошибка входа",
                description: error instanceof Error ? error.message : "Произошла ошибка при входе",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        try {
            setLoading(true);

            const response = await fetch(`${config.API_URL}auth/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(Object.values(error).flat().join(', ') || 'Registration failed');
            }

            const data = await response.json();


            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            const userObj = { email };
            localStorage.setItem('user', JSON.stringify(userObj));

            setUser(userObj);
            toast({
                title: "Регистрация успешна",
                description: "Вы успешно зарегистрировались и вошли в систему",
            });

            navigate('/');
        } catch (error) {
            toast({
                title: "Ошибка регистрации",
                description: error instanceof Error ? error.message : "Произошла ошибка при регистрации",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        setUser(null);
        toast({
            title: "Выход выполнен",
            description: "Вы успешно вышли из системы",
        });

        navigate('/');
    };

    const addToFavorites = (projectId: string) => {
        if (!user) {
            toast({
                title: "Требуется авторизация",
                description: "Для добавления в избранное необходимо войти в систему",
                variant: "destructive"
            });
            navigate('/login');
            return;
        }

        if (!favorites.includes(projectId)) {
            const newFavorites = [...favorites, projectId];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            toast({
                title: "Добавлено в избранное",
                description: "Проект успешно добавлен в избранное",
            });
        }
    };

    const removeFromFavorites = (projectId: string) => {
        const newFavorites = favorites.filter(id => id !== projectId);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        toast({
            title: "Удалено из избранного",
            description: "Проект успешно удален из избранного",
        });
    };

    const isAuthenticated = !!user;
    const isAdmin = isAuthenticated;

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isAdmin,
            loading,
            login,
            register,
            logout,
            addToFavorites,
            removeFromFavorites,
            favorites
        }}>
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