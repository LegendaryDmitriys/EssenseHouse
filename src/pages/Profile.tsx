
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Heart, User } from 'lucide-react';

const Profile = () => {
    const { user, logout, favorites } = useAuth();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Личный кабинет
                        </CardTitle>
                        <CardDescription>
                            {user?.email}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link to="/profile">
                                <User className="mr-2 h-4 w-4" />
                                Профиль
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link to="/profile/favorites">
                                <Heart className="mr-2 h-4 w-4" />
                                Избранное
                            </Link>
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

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Профиль</CardTitle>
                            <CardDescription>
                                Ваша личная информация
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm">{user?.email}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Избранные проекты</CardTitle>
                            <CardDescription>
                                Проекты, которые вы добавили в избранное
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {favorites.length > 0 ? (
                                <div className="space-y-4">
                                    {favorites.map((projectId) => (
                                        <div key={projectId} className="flex justify-between items-center p-4 border rounded-md">
                                            <span>Проект #{projectId}</span>
                                            <div>
                                                <Button variant="outline" size="sm" asChild className="mr-2">
                                                    <Link to={`/projects/${projectId}`}>
                                                        Просмотреть
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">У вас пока нет избранных проектов</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;