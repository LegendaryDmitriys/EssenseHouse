
import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {ConstructionStatus, PurchasedHouse} from "@/types/purchasedHouse.ts";
import {formatDate} from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

interface PurchasedHousesTableProps {
    houses: PurchasedHouse[];
    onSelect: (house: PurchasedHouse) => void;
    selectedId?: number;
}

const PurchasedHousesTable = ({ houses, onSelect, selectedId }: PurchasedHousesTableProps) => {

    return (
        <div className="overflow-x-auto">
            {houses.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                    Объекты не найдены
                </div>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Дата покупки</th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Покупатель</th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Дом</th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {houses.map((house) => (
                        <tr
                            key={house.id}
                            className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === house.id ? 'bg-gray-50' : ''}`}
                            onClick={() => onSelect(house)}
                        >
                            <td className="py-3 px-4">{formatDate(house.purchase_date)}</td>
                            <td className="py-3 px-4">
                                <div className="font-medium">{house.buyer_name}</div>
                                <div className="text-gray-500 text-xs">{house.buyer_phone}</div>
                            </td>
                            <td className="py-3 px-4">{house.house.title}</td>
                            <td className="py-3 px-4"><StatusBadge status={house.construction_status} context="purchasedHouse"/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PurchasedHousesTable;
