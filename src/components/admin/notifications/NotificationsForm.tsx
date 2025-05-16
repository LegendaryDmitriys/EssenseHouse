import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import config from "@/api/api.ts";
import { Notification} from "@/types/notification.ts";


const NotificationsForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        title: '',
        body: '',
        icon: '',
        badge: '',
        link: '',
    });

    const sendNotification = async (data: Notification): Promise<{ status: string }> => {
        const response = await fetch(`${config.API_URL}mail/send-notification/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notification),
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправки уведомления');
        }

        return response.json();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNotification((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!notification.title || !notification.body) {
            toast({
                title: "Ошибка",
                description: "Заголовок и текст уведомления обязательны",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsLoading(true);
            await sendNotification(notification);
            toast({
                title: "Успех",
                description: "Уведомление успешно отправлено",
            });

            setNotification({
                title: '',
                body: '',
                icon: '',
                badge: '',
                link: '',
            });
        } catch (error) {
            toast({
                title: "Ошибка",
                description: "Не удалось отправить уведомление",
                variant: "destructive",
            });
            console.error("Ошибка при отправки уведомления:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Отправка уведомлений
                </CardTitle>
                <CardDescription>
                    Отправьте push-уведомление всем подписанным пользователям
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Заголовок *</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Новый дом в продаже"
                                value={notification.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="body">Текст уведомления *</Label>
                            <Textarea
                                id="body"
                                name="body"
                                placeholder="Ознакомьтесь с новым домом в нашем каталоге"
                                value={notification.body}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="link">Ссылка</Label>
                            <Input
                                id="link"
                                name="link"
                                placeholder="https://сайт/проекты/1"
                                value={notification.link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="icon">Иконка</Label>
                                <Input
                                    id="icon"
                                    name="icon"
                                    placeholder="/картинки/Иконка.png"
                                    value={notification.icon}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="badge">Значок</Label>
                                <Input
                                    id="badge"
                                    name="badge"
                                    placeholder="/картинки/Значок.png"
                                    value={notification.badge}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <CardFooter className="flex justify-end px-0 pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Отправка...' : 'Отправить уведомление'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default NotificationsForm;