import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {Order, OrderStatus} from "@/types/orders.ts";
import {formatDate} from "@/lib/utils.ts";

interface OrdersTableProps {
    orders: Order[];
    onSelect: (order: Order) => void;
    selectedId?: number;
}

const OrdersTable = ({ orders, onSelect, selectedId }:OrdersTableProps) => {
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


    return (
        <div className="overflow-x-auto">
            {orders.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                    Заказы не найдены
                </div>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Дата</th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Заказчик</th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Дом</th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === order.id ? 'bg-gray-50' : ''}`}
                            onClick={() => onSelect(order)}
                        >
                            <td className="py-3 px-4">{formatDate(order.data_created)}</td>
                            <td className="py-3 px-4">
                                <div className="font-medium">{order.name}</div>
                                <div className="text-gray-500 text-xs">{order.phone}</div>
                            </td>
                            <td className="py-3 px-4">{order.house_details.title}</td>
                            <td className="py-3 px-4">{renderStatusBadge(order.status)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrdersTable;
