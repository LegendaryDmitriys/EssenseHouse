
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {Bell, Mail} from 'lucide-react';
import Layout from "@/components/admin/dashboard/Layout.tsx";
import React from "react";
import NotificationsForm from "@/components/admin/notifications/NotificationsForm.tsx";

const AdminNotifications = () => {
    return (
        <Layout>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Уведомления</h1>
                        <p className="text-muted-foreground">
                            Отправляйте уведомления всем пользователям приложения
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="push" className="w-full">
                    <TabsList>
                        <TabsTrigger value="push" className="flex items-center gap-1">
                            <Bell size={16} />
                            Push-уведомления
                        </TabsTrigger>
                        <TabsTrigger value="mail" className="flex items-center gap-1">
                            <Mail size={16}/>
                            Email-уведомления
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="push" className="mt-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardContent className="pt-6">
                                    <NotificationsForm />
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="text-lg font-semibold mb-2">Информация</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Push-уведомления отправляются всем пользователям, которые подписались на уведомления.
                                            Для создания уведомления необходимо заполнить обязательные поля: заголовок и текст.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="mail" className="mt-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardContent className="pt-6">
                                    <NotificationsForm />
                                </CardContent>
                            </Card>
                            <div className="space-y-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="text-lg font-semibold mb-2">Информация</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Email-уведомления отправляются всем пользователям, которые были зарегистрированы в системе.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default AdminNotifications;

