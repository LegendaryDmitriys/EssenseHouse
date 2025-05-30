import React, {useEffect, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent
} from '@/components/ui/tabs';
import { LogOut, Heart, User, Package } from 'lucide-react';
import UserOrderCard from '@/components/profile/UserOrderCard';
import { Skeleton } from '@/components/ui/skeleton';
import {Order} from "@/types/order.ts";
import config from "@/api/api.ts";
import {useQuery} from "@tanstack/react-query";
import {toast} from "@/hooks/use-toast.ts";


const Profile = () => {
    const { user, setUser, logout, favorites } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                phone_number: user.phone_number || '',
            });
        }
    }, [user]);

    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone_number: user?.phone_number || '',
    });


    const handleSave = async () => {
        try {
            const response = await fetch(`${config.API_URL}auth/users/me/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при сохранении профиля');
            }

            const updatedUser = await response.json();

            setUser({
                email: updatedUser.email,
                isAdmin: updatedUser.is_admin,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                phone_number: updatedUser.phone_number,
            });

            toast({ title: "Профиль обновлён", description: "Данные успешно сохранены" });

        } catch (error) {
            console.error(error);
            alert('Не удалось сохранить изменения');
        }
    };

    const isChanged = useMemo(() => {
        return (
            formData.first_name !== user?.first_name ||
            formData.last_name !== user?.last_name ||
            formData.phone_number !== user?.phone_number
        );
    }, [formData, user]);

    const { data: orders = [], isLoading, isError, error } = useQuery<Order[], Error>({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            if (!user?.email) return []

            const response = await fetch(
                `${config.API_URL}orders/by-email/?email=${encodeURIComponent(user.email)}`
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Не удалось загрузить заказы')
            }

            return await response.json()
        },
        enabled: !!user?.email,
        retry: 1,
    })

    return (
        <div className="container mx-auto px-4 py-32">
            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Личный кабинет
                        </CardTitle>
                        <CardDescription>{user?.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            variant={activeTab === 'profile' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('profile')}
                        >
                            <User className="mr-2 h-4 w-4" />
                            Профиль
                        </Button>
                        <Button
                            variant={activeTab === 'orders' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('orders')}
                        >
                            <Package className="mr-2 h-4 w-4" />
                            Мои заказы
                        </Button>
                        <Button
                            variant={activeTab === 'favorites' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('favorites')}
                        >
                            <Heart className="mr-2 h-4 w-4" />
                            Избранное
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full mt-8 border-destructive text-destructive hover:bg-destructive/10"
                            onClick={logout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Выйти
                        </Button>
                    </CardContent>
                </Card>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsContent value="profile" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Профиль</CardTitle>
                                <CardDescription>Редактируйте свою личную информацию</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Имя</label>
                                        <input
                                            className="w-full border rounded-md p-2 mt-1"
                                            value={formData.first_name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, first_name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Фамилия</label>
                                        <input
                                            className="w-full border rounded-md p-2 mt-1"
                                            value={formData.last_name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, last_name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Телефон</label>
                                        <input
                                            className="w-full border rounded-md p-2 mt-1"
                                            value={formData.phone_number}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone_number: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <input
                                            className="w-full border rounded-md p-2 mt-1 bg-gray-100"
                                            value={user?.email || ''}
                                            disabled
                                        />
                                    </div>
                                </div>

                                {isChanged && (
                                    <Button onClick={handleSave} className="mt-4">
                                        Сохранить изменения
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="orders" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Мои заказы</CardTitle>
                                <CardDescription>История ваших заказов на строительство домов</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-32 w-full" />
                                        <Skeleton className="h-32 w-full" />
                                    </div>
                                ) : isError ? (
                                    <div className="text-destructive text-center py-4">{error.message}</div>
                                ) : orders.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {orders.map((order) => (
                                            <UserOrderCard key={order.id} order={order} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>У вас пока нет заказов</p>
                                        <Button variant="outline" className="mt-4" asChild>
                                            <Link to="/projects">Перейти к проектам домов</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="favorites" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Избранные проекты</CardTitle>
                                <CardDescription>Проекты, которые вы добавили в избранное</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {favorites.length > 0 ? (
                                    <div className="space-y-4">
                                        {favorites.map((projectId) => (
                                            <div key={projectId} className="flex justify-between items-center p-4 border rounded-md">
                                                <span>Проект #{projectId}</span>
                                                <div>
                                                    <Button variant="outline" size="sm" asChild className="mr-2">
                                                        <Link to={`/projects/${projectId}`}>Просмотреть</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>У вас пока нет избранных проектов</p>
                                        <Button variant="outline" className="mt-4" asChild>
                                            <Link to="/projects">Перейти к проектам домов</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;