import React, {useEffect, useState} from 'react';
import { Search, Filter, Home, CheckCircle2, Clock, AlertCircle, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import Layout from '@/components/admin/dashboard/Layout.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import PurchasedHousesTable from "@/components/admin/purhased/PurchasedHousesTable.tsx";
import PurchasedHouseDetails from "@/components/admin/purhased/PurchasedHouseDetails.tsx";
import config from "@/api/api.ts";
import {ConstructionStatus, PurchasedHouse} from "@/types/purchasedHouse.ts";




const PurchasedHouses = () => {
    const [purchasedHouses, setPurchasedHouses] = useState<PurchasedHouse[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedHouse, setSelectedHouse] = useState<PurchasedHouse | null>(null);
    const [isNewHouseOpen, setIsNewHouseOpen] = useState(false);
    const [selectedPurchasedHouse, setSelectedPurchasedHouse] = useState<PurchasedHouse | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchPurchasedHouses = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${config.API_URL}purchase/`)
                if (!response.ok){
                    throw new Error(`HTTP ошибка, Статус ${response.status}`)
                }
                const result = await response.json();
                setPurchasedHouses(result)
            }
            catch (err){
                setError(err instanceof Error ? err.message : "Неизвестная ошибка")
            }
            finally {
                setLoading(false)
            }
        }
        fetchPurchasedHouses();
    }, []);


    console.log(purchasedHouses)


    const createPurchasedHouse = async (purchaseData: Omit<PurchasedHouse, 'id' | 'data_created' | 'status'>): Promise<PurchasedHouse> => {
        try {
            const response = await fetch(`${config.API_URL}purchase/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(purchaseData),
            });
            console.log(purchaseData)
            if (!response.ok) {
                throw new Error('Не удалось cоздать');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при создании :', error);
            throw error;
        }
    };

    const handleCreatePurchasedHouse = async (newPurchaseData: Omit<PurchasedHouse, 'id' | 'data_created' | 'status'>) => {
        try {
            const newPurchase = await createPurchasedHouse(newPurchaseData);
            setPurchasedHouses([newPurchase, ...purchasedHouses]);
            setIsNewHouseOpen(false);

            toast({
                title: "Заказ создан",
                description: "Новый заказ успешно добавлен в систему",
            });
        } catch (error) {
            toast({
                title: "Ошибка создания",
                description: "Не удалось создать заказ",
                variant: "destructive",
            });
        }
    };


    const updatePurchasedStatus = async (id: number, construction_status: ConstructionStatus) => {
        try {
            const response = await fetch(`${config.API_URL}purchase/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ construction_status }),
            });
            if (!response.ok) {
                throw new Error('Не удалось обновить статус заказа');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка обновления статуса заказа:', error);
            throw error;
        }
    };

    const handleUpdateStatus = async (id: number, construction_status: ConstructionStatus) => {
        try {
            const updatedOrder = await updatePurchasedStatus(id, construction_status);

            setPurchasedHouses(
                purchasedHouses.map(order =>
                    order.id === Number(id)
                        ? { ...order, construction_status }
                        : order
                )
            );

            if (selectedPurchasedHouse?.id === id) {
                setSelectedPurchasedHouse({
                    ...selectedPurchasedHouse,
                    construction_status
                });
            }

            toast({
                title: "Статус обновлен",
                description: `Статус заказа изменен на "${getStatusText(construction_status)}"`,
            });
        } catch (error) {
            toast({
                title: "Ошибка обновления",
                description: "Не удалось обновить статус заказа",
                variant: "destructive",
            });
        }
    };

    const filteredHouses = purchasedHouses.filter(house => {
        const matchesSearch =
            house.buyer_name.toLowerCase().includes(search.toLowerCase()) ||
            (house.address && house.address.toLowerCase().includes(search.toLowerCase())) ||
            house.buyer_email.toLowerCase().includes(search.toLowerCase()) ||
            house.house.title.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'all' || house.construction_status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const sortedHouses = [...filteredHouses].sort((a, b) => {
        let comparison = 0;

        switch(sortBy) {
            case 'buyer':
                comparison = a.buyer_name.localeCompare(b.buyer_name);
                break;
            case 'house':
                comparison = a.house.title.localeCompare(b.house.title);
                break;
            case 'date':
            default:
                comparison = new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime();
                break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const getStatusText = (status: ConstructionStatus): string => {
        switch(status) {
            case 'not_started': return 'Не начато';
            case 'in_progress': return 'В процессе';
            case 'completed': return 'Построен';
            default: return '';
        }
    };


    const handleSortChange = (value: string) => {
        if (value === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(value);
            setSortOrder('desc');
        }
    };

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Строительство</h1>
                <p className="text-gray-600 mt-1">
                    Управление объектами строительства и отслеживание статуса работ
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3">
                    <Card className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="relative w-full sm:w-96">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Поиск объектов..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => setIsNewHouseOpen(true)}
                                    className="bg-construction-blue-600 hover:bg-construction-blue-700"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Добавить объект
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <span className="text-sm font-medium text-gray-500 mr-2">Статус:</span>
                                <ToggleGroup
                                    type="single"
                                    value={statusFilter}
                                    onValueChange={(value) => value && setStatusFilter(value)}
                                >
                                    <ToggleGroupItem value="all">Все</ToggleGroupItem>
                                    <ToggleGroupItem value="not_started">Не начато</ToggleGroupItem>
                                    <ToggleGroupItem value="in_progress">В процессе</ToggleGroupItem>
                                    <ToggleGroupItem value="completed">Построен</ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-500 mr-2">Сортировка:</span>
                                <ToggleGroup
                                    type="single"
                                    value={sortBy}
                                    onValueChange={(value) => value && handleSortChange(value)}
                                >
                                    <ToggleGroupItem value="date" className="flex items-center">
                                        Дата
                                        {sortBy === 'date' && (
                                            sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                                        )}
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="buyer" className="flex items-center">
                                        Покупатель
                                        {sortBy === 'buyer' && (
                                            sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                                        )}
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="house" className="flex items-center">
                                        Дом
                                        {sortBy === 'house' && (
                                            sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                                        )}
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </div>

                        <PurchasedHousesTable
                            houses={sortedHouses}
                            onSelect={setSelectedHouse}
                            selectedId={selectedHouse?.id}
                        />
                    </Card>
                </div>


                <div className="w-full lg:w-1/3">
                    {selectedHouse ? (
                        <PurchasedHouseDetails
                            house={selectedHouse}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ) : (
                        <Card className="p-6 h-96 flex flex-col items-center justify-center text-center text-gray-500">
                            <Home size={48} className="mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium mb-2">Выберите объект</h3>
                            <p>Выберите объект из списка слева, чтобы просмотреть подробности</p>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PurchasedHouses;
