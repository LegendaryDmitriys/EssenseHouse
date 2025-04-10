
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {ConstructionStatus, PurchasedHouse} from "@/types/purchasedHouse.ts";

interface PurchasedHousesTableProps {
    houses: PurchasedHouse[];
    onSelect: (house: PurchasedHouse) => void;
    selectedId?: number;
}

const PurchasedHousesTable: React.FC<PurchasedHousesTableProps> = ({ houses, onSelect, selectedId }) => {
    const renderStatusBadge = (status: ConstructionStatus) => {
        switch(status) {
            case 'not_started':
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Не начато
                    </Badge>
                );
            case 'in_progress':
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        В процессе
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Построен
                    </Badge>
                );
            default:
                return null;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';

        try {
            return format(new Date(dateString), 'dd MMM yyyy', { locale: ru });
        } catch (error) {
            return dateString;
        }
    };

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
                            <td className="py-3 px-4">{renderStatusBadge(house.construction_status)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PurchasedHousesTable;
