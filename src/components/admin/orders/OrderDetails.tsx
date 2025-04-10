import React, {useState} from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Phone, Mail, MapPin, Home, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {Order, OrderStatus} from "@/types/orders.ts";


interface OrderDetailsProps {
    order: Order;
    onUpdateStatus: (id: number, status: OrderStatus) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onUpdateStatus }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: ru });
        } catch (error) {
            return dateString;
        }
    };


    const getProgressValue = (status: OrderStatus) => {
        switch(status) {
            case 'pending': return 33;
            case 'approved': return 100;
            case 'rejected': return 100;
            default: return 0;
        }
    };


    const getProgressIndicatorClassName = (status: OrderStatus) => {
        switch(status) {
            case 'pending': return 'bg-yellow-500';
            case 'approved': return 'bg-green-500';
            case 'rejected': return 'bg-red-500';
            default: return '';
        }
    };

    const handleUpdateStatus = async (status: OrderStatus) => {
        setIsUpdating(true);
        try {
            await onUpdateStatus(order.id, status);
        } finally {
            setIsUpdating(false);
        }
    };


    const renderStatusBadge = (status: OrderStatus) => {
        switch(status) {
            case 'pending':
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Ожидает одобрения
                    </Badge>
                );
            case 'approved':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Одобрено
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Отклонено
                    </Badge>
                );
            default:
                return null;
        }
    };


    const renderStatusActions = () => {
        switch(order.status) {
            case 'pending':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => handleUpdateStatus('approved')}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            disabled={isUpdating}
                        >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Одобрить
                        </Button>
                        <Button
                            onClick={() => handleUpdateStatus('rejected')}
                            variant="destructive"
                            className="flex-1"
                            disabled={isUpdating}
                        >
                            <XCircle className="h-4 w-4 mr-1" />
                            Отклонить
                        </Button>
                    </div>
                );
            case 'approved':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => handleUpdateStatus('pending')}
                            variant="outline"
                            className="flex-1"
                            disabled={isUpdating}
                        >
                            Вернуть в ожидание
                        </Button>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => handleUpdateStatus('pending')}
                            variant="outline"
                            className="flex-1"
                            disabled={isUpdating}
                        >
                            Вернуть в ожидание
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle>Информация о заказе</CardTitle>
                    {renderStatusBadge(order.status)}
                </div>
                <Progress
                    value={getProgressValue(order.status)}
                    className="h-2 mt-2"
                />
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2 text-sm text-gray-500">Основная информация</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <div className="font-semibold">{order.name}</div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {order.phone}
                                </div>
                                {order.email && (
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Mail className="h-3 w-3 mr-1" />
                                        {order.email}
                                    </div>
                                )}
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500">Дата создания:</span> {formatDate(order.data_created)}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2 text-sm text-gray-500">Детали заказа</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-start">
                                <Home className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <div>
                                    <div className="font-medium">{order.house_details.title}</div>
                                    {order.finishingOption && (
                                        <div className="text-sm text-gray-600">
                                            Отделка: {order.finishingOption.title}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <div>
                                    <div className="font-medium">Место строительства</div>
                                    <div className="text-sm text-gray-600">{order.construction_place}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2 text-sm text-gray-500">Сообщение клиента</h3>
                        <div className="p-3 bg-gray-50 rounded-md text-gray-800 text-sm">
                            {order.message}
                        </div>
                    </div>

                    {order.latitude && order.longitude && (
                        <div>
                            <h3 className="font-medium mb-2 text-sm text-gray-500">Расположение на карте</h3>
                            <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
                                <div className="text-sm text-gray-500">
                                    Координаты: {order.latitude}, {order.longitude}
                                </div>
                            </div>
                        </div>
                    )}

                    {renderStatusActions()}
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderDetails;
