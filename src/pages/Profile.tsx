import React, { useState, useEffect } from 'react';
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
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { LogOut, Heart, User, Package } from 'lucide-react';
import UserOrderCard from '@/components/profile/UserOrderCard';
import { Skeleton } from '@/components/ui/skeleton';
import {Order} from "@/types/orders.ts";
import config from "@/api/api.ts";


const Profile = () => {
    const { user, logout, favorites } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) {
                setOrders([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`${config.API_URL}orders/by-email/?email=${encodeURIComponent(user.email)}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Не удалось загрузить заказы');
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка при загрузке заказов:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

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
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Профиль</TabsTrigger>
                        <TabsTrigger value="orders">Мои заказы</TabsTrigger>
                        <TabsTrigger value="favorites">Избранное</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Профиль</CardTitle>
                                <CardDescription>Ваша личная информация</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm">{user?.email}</p>
                                </div>
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
                                ) : error ? (
                                    <div className="text-destructive text-center py-4">{error}</div>
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