import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle2, XCircle, Home } from 'lucide-react';
import {Order, OrderStatus} from "@/types/orders.ts";
import {formatDate} from "@/lib/utils.ts";

interface UserOrderCardProps {
    order: Order;
}

const UserOrderCard = ({ order }:UserOrderCardProps) => {
    const renderStatusBadge = (status: OrderStatus) => {
        switch(status) {
            case 'pending':
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Ожидает подтверждения
                    </Badge>
                );
            case 'approved':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Подтвержден
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Отклонен
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-base flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        {order.house_details.title}
                    </CardTitle>
                    {renderStatusBadge(order.status)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Дата заказа:</span>
                        <span className="font-medium">{formatDate(order.data_created)}</span>
                    </div>

                    {order.finishing_option && (
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Отделка:</span>
                            <span className="font-medium">{order.finishing_option.title}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Место строительства:</span>
                        <span className="font-medium">{order.construction_place}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserOrderCard;