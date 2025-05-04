
import React, {useState} from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Phone, Mail, MapPin, Home, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {ConstructionStatus, PurchasedHouse} from "@/types/purchasedHouse.ts";
import {Map, Placemark, YMaps, ZoomControl} from "@pbe/react-yandex-maps";
import {formatDate} from "@/lib/utils.ts";


interface PurchasedHouseDetailsProps {
    house: PurchasedHouse;
    onUpdateStatus: (id: number, construction_status: ConstructionStatus) => void;
}

const PurchasedHouseDetails = ({ house, onUpdateStatus }:PurchasedHouseDetailsProps) => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6173]);
    const [mapZoom, setMapZoom] = useState(2);



    const getProgressValue = (construction_status: ConstructionStatus) => {
        switch(construction_status) {
            case 'not_started': return 0;
            case 'in_progress': return 50;
            case 'completed': return 100;
            default: return 0;
        }
    };


    const renderStatusBadge = (construction_status: ConstructionStatus) => {
        switch(construction_status) {
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

    const renderStatusActions = () => {
        switch(house.construction_status) {
            case 'not_started':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => onUpdateStatus(house.id, 'in_progress')}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            <Clock className="h-4 w-4 mr-1" />
                            Начать строительство
                        </Button>
                    </div>
                );
            case 'in_progress':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => onUpdateStatus(house.id, 'completed')}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Завершить строительство
                        </Button>
                        <Button
                            onClick={() => onUpdateStatus(house.id, 'not_started')}
                            variant="outline"
                            className="flex-1"
                        >
                            Вернуть в статус "Не начато"
                        </Button>
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => onUpdateStatus(house.id, 'in_progress')}
                            variant="outline"
                            className="flex-1"
                        >
                            Вернуть в статус "В процессе"
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
                    <CardTitle>Информация об объекте</CardTitle>
                    {renderStatusBadge(house.construction_status)}
                </div>
                <Progress
                    value={getProgressValue(house.construction_status)}
                    className="h-2 mt-2"
                />
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2 text-sm text-gray-500">Информация о доме</h3>
                        <div className="flex items-start">
                            <Home className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                            <div>
                                <div className="font-medium">{house.house.title}</div>
                                <div className="text-sm text-gray-600">
                                    Дата покупки: {formatDate(house.purchase_date)}
                                </div>
                                {house.completed_date && (
                                    <div className="text-sm text-gray-600">
                                        Дата завершения: {formatDate(house.completed_date)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2 text-sm text-gray-500">Информация о покупателе</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <div className="font-semibold">{house.buyer_name}</div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {house.buyer_phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {house.buyer_email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2 text-sm text-gray-500">Место строительства</h3>
                        <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                            <div>
                                <div className="font-medium">Адрес</div>
                                <div className="text-sm text-gray-600">{house.address || 'Не указан'}</div>
                            </div>
                        </div>
                    </div>
                    {house.latitude && house.longitude && (
                        <div>
                            <h3 className="font-medium mb-2 text-sm text-gray-500">Расположение на карте</h3>
                            <div className="text-sm text-gray-600 mb-2">
                                Координаты: {house.latitude}, {house.longitude}
                            </div>
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
                                            geometry={[house.latitude, house.longitude]}
                                        />
                                    </Map>
                                </YMaps>
                            </div>
                        </div>
                    )}

                    {renderStatusActions()}
                </div>
            </CardContent>
        </Card>
    );
};

export default PurchasedHouseDetails;
