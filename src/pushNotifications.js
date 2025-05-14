import config from "./api/api.ts";

export async function initPush() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.ready;

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.log('Разрешение на уведомления не предоставлено');
            return;
        }

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BPSzZyM01ouj_pvEXeRRloM23YTmt81hkSOo7LfPtUrbjOpIBb80vEg38x3AoJRIrJRsTTfPuEYTxEJurrY0css'
        });

        await fetch(`${config.API_URL}mail/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
        });

        console.log('Успешная подписка:', subscription);
    } else {
        console.warn('Push-сообщения не поддерживаются');
    }
}