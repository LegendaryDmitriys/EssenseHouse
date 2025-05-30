import React, {useState} from 'react';
import { Phone, Mail, MapPin, Home, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {Order, OrderStatus} from "@/types/order.ts";
import {Map, Placemark, YMaps, ZoomControl} from "@pbe/react-yandex-maps";
import {formatDate} from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";


interface OrderDetailsProps {
    order: Order;
    onUpdateStatus: (id: number, status: OrderStatus) => void;
}

const OrderDetails = ({ order, onUpdateStatus } :OrderDetailsProps) => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6173]);
    const [mapZoom, setMapZoom] = useState(2);
    const [isUpdating, setIsUpdating] = useState(false);

    const getProgressValue = (status: OrderStatus) => {
        switch(status) {
            case 'pending': return 33;
            case 'approved': return 100;
            case 'rejected': return 100;
            default: return 0;
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
                    <StatusBadge status={order.status} context="order"/>
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
                                <div className="font-semibold">{order.first_name} {order.last_name}</div>
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
                                    {order.finishing_option && (
                                        <div className="text-sm text-gray-600">
                                            Отделка: {order.finishing_option.title}
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
                        <div className="bg-gray-100 rounded-md h-[300px]">
                            <YMaps>
                                <Map
                                    defaultState={{
                                        center: mapCenter,
                                        zoom: mapZoom,
                                        controls: []
                                    }}
                                    width="100%"
                                    height="100%"
                                    options={{
                                        suppressMapOpenBlock: true
                                    }}
                                >
                                    <ZoomControl options={{position: {right: 10, top: 10}}}/>
                                    <Placemark
                                        geometry={[order.latitude, order.longitude]}
                                    />
                                </Map>
                            </YMaps>
                        </div>
                    )}

                    {renderStatusActions()}
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderDetails;
