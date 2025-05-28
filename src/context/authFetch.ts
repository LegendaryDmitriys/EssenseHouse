import config from "@/api/api";

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

export const authFetch = async (input: RequestInfo, init: RequestInit = {}, retry = true): Promise<Response> => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        ...init.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        'Content-Type': 'application/json',
    };

    const response = await fetch(input, { ...init, headers });

    if (response.status === 401 && retry) {
        try {
            const newAccess = await refreshToken();
            const retryHeaders = {
                ...init.headers,
                Authorization: `Bearer ${newAccess}`,
                'Content-Type': 'application/json',
            };

            return fetch(input, { ...init, headers: retryHeaders });
        } catch (err) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            throw err;
        }
    }

    return response;
};
