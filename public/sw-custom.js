self.addEventListener('push', (event) => {
    const data = event.data?.json();
    const title = data?.title || 'Новое уведомление';
    const options = {
        body: data?.body || 'У вас новое сообщение',
        icon: data?.icon || '/icons/icon-192x192.png',
        badge: data?.badge || '/icons/icon-192x192.png',
        data: data?.link || '/'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data)
    );
});