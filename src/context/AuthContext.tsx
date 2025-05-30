import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import config from "@/api/api.ts";
import { initPush } from '../pushNotifications';
import { User } from "@/types/user.ts";

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
    setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<string[]>([]);
    const navigate = useNavigate();



    function parseJwt(token: string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    }

    const refreshToken = async () => {
        const refresh = localStorage.getItem('refreshToken');
        if (!refresh) throw new Error("Нет refresh токена");

        const response = await fetch(`${config.API_URL}auth/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
        });

        if (!response.ok) {
            throw new Error("Не удалось обновить токен");
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        return data.access;
    };

    const fetchAndSetUser = async (accessToken: string) => {
        const payload = parseJwt(accessToken);
        const userId = payload?.user_id;
        if (!userId) return;

        const response = await fetch(`${config.API_URL}auth/users/me/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) throw new Error("Ошибка загрузки пользователя");

        const userData = await response.json();

        const userObj: User = {
            email: userData.email,
            isAdmin: userData.is_admin,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone_number: userData.phone_number,
        };
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedFavorites = localStorage.getItem('favorites');

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        if (storedToken) {
            fetchAndSetUser(storedToken).catch(console.error).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            try {
                const payload = parseJwt(token);
                const exp = payload?.exp;

                if (exp && Date.now() / 1000 > exp - 60) {
                    await refreshToken();
                }
            } catch (err) {
                console.error("Ошибка обновления токена", err);
                logout();
            }
        };

        checkAndRefreshToken();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            try {
                const payload = parseJwt(token);
                const exp = payload?.exp;

                if (exp && Date.now() / 1000 > exp - 60) {
                    await refreshToken();
                }
            } catch {
                logout();
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

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
                throw new Error(error.detail || 'Ошибка авторизации');
            }

            const data = await response.json();

            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            await fetchAndSetUser(data.access);
            await initPush();

            toast({ title: "Успешный вход", description: "Вы успешно вошли в систему" });
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
                throw new Error(Object.values(error).flat().join(', ') || 'Ошибка регистрации');
            }

            const data = await response.json();

            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            await fetchAndSetUser(data.access);

            toast({ title: "Регистрация успешна", description: "Вы успешно зарегистрировались и вошли в систему" });
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
        toast({ title: "Выход выполнен", description: "Вы успешно вышли из системы" });
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
            toast({ title: "Добавлено в избранное", description: "Проект успешно добавлен в избранное" });
        }
    };

    const removeFromFavorites = (projectId: string) => {
        const newFavorites = favorites.filter(id => id !== projectId);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        toast({ title: "Удалено из избранного", description: "Проект успешно удален из избранного" });
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.isAdmin ?? false;

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
            favorites,
            setUser,
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
