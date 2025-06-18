import { useEffect } from "react";

const PENDING_REQUESTS_KEY = "pendingRequests";

type QueueItem = {
    endpoint: string;
    payload: Record<string, any>;
};

const saveToQueue = (endpoint: string, payload: Record<string, any>) => {
    const queue = getQueue();
    queue.push({ endpoint, payload });
    localStorage.setItem(PENDING_REQUESTS_KEY, JSON.stringify(queue));
};

const getQueue = (): QueueItem[] => {
    return JSON.parse(localStorage.getItem(PENDING_REQUESTS_KEY) || "[]");
};

const clearQueue = () => {
    localStorage.removeItem(PENDING_REQUESTS_KEY);
};

const sendFromQueue = async () => {
    const queue = getQueue();
    if (!queue.length) return;

    for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        try {
            const res = await fetch(item.endpoint, {
                method: "POST",
                body: JSON.stringify(item.payload),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error(`Ошибка отправки на ${item.endpoint}`);

            queue.splice(i, 1);
            i--;
        } catch (err) {
            console.error("Не удалось отправить из очереди:", err);
        }
    }

    localStorage.setItem(PENDING_REQUESTS_KEY, JSON.stringify(queue));
};

const handleOnline = () => {
    console.log("Сеть восстановлена. Отправляем очередь...");
    sendFromQueue();
};

export const useOfflineQueue = (onShowNotification?: (message: string) => void) => {
    useEffect(() => {
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    const sendRequest = async (
        endpoint: string,
        payload: Record<string, any>
    ): Promise<boolean> => {
        try {

            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const res = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(payload),
                headers,
            });

            if (!res.ok) throw new Error("Ошибка сервера");

            return true;
        } catch (error) {
            if (
                error instanceof TypeError &&
                (error.message.includes("Failed to fetch") ||
                    error.message.includes("NetworkError"))
            ) {
                console.warn("Нет подключения. Сохраняю в очередь.");
                saveToQueue(endpoint, payload);

                onShowNotification?.("Ваша заявка сохранена и будет отправлена, как только появится интернет.");
            } else {
                console.error("Ошибка запроса:", error);
                onShowNotification?.("Произошла ошибка при отправке формы.");
            }
            return false;
        }
    };

    return { sendRequest, sendFromQueue, getQueue, clearQueue };
};