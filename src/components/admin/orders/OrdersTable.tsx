import React from 'react';
import {Order} from "@/types/orders.ts";
import {formatDate} from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

interface OrdersTableProps {
    orders: Order[];
    onSelect: (order: Order) => void;
    selectedId?: number;
}

const OrdersTable = ({ orders, onSelect, selectedId }:OrdersTableProps) => {
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
                            <td className="py-3 px-4"><StatusBadge status={order.status} context="order"/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrdersTable;
