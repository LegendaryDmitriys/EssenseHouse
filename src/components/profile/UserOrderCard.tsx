import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';
import { Order } from "@/types/order.ts";
import { formatDate } from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

interface UserOrderCardProps {
    order: Order;
}

const UserOrderCard = ({ order }: UserOrderCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <CardTitle className="text-base flex items-center gap-1 break-words">
                        <Home className="h-4 w-4" />
                        {order.house_details.title}
                    </CardTitle>
                    <div className="sm:ml-auto">
                        <StatusBadge status={order.status} context="order" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3 text-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-muted-foreground">Дата заказа:</span>
                        <span className="font-medium">{formatDate(order.data_created)}</span>
                    </div>

                    {order.finishing_option_details  && (
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-muted-foreground">Отделка:</span>
                            <span className="font-medium">{order.finishing_option_details.title}</span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-muted-foreground">Место строительства:</span>
                        <span className="font-medium break-words">{order.construction_place}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserOrderCard;
