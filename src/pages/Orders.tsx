import React, {useEffect, useState} from 'react';
import { Search, Filter, Clock, CheckCircle2, XCircle, Plus, ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import Layout from '@/components/admin/dashboard/Layout.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import OrdersTable from '@/components/admin/orders/OrdersTable';
import OrderDetails from '@/components/admin/orders/OrderDetails';
import NewOrderDialog from '@/components/admin/orders/NewOrderDialog';
import {Order, OrderStatus} from "@/types/orders.ts";
import config from "@/api/api.ts";
import {FinishingOption, House} from "@/types/house.ts";



const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [houses, setHouses] = useState<House[]>([]);
    const [finishingOptions, setFinishingOptions] = useState<FinishingOption[]>([]);
    const [loadingHouses, setLoadingHouses] = useState(true);
    const [loadingFinishingOptions, setLoadingFinishingOptions] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
    const { toast } = useToast();


    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${config.API_URL}/orders`)
                if (!response.ok){
                    throw new Error(`HTTP ошибка, Статус: ${response.status}`)
                }
                const result = await response.json();
                setOrders(result)
            }
            catch (err){
                setError(err instanceof Error ? err.message : "Неизвестная ошибка")
            }
            finally {
                setLoading(false)
            }
        }
        fetchOrders();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedHouses, fetchedFinishingOptions] = await Promise.all([
                    fetchHouses(),
                    fetchFinishingOptions()
                ]);
                setHouses(fetchedHouses);
                setFinishingOptions(fetchedFinishingOptions);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoadingHouses(false);
                setLoadingFinishingOptions(false);
            }
        };

        fetchData();
    }, []);

    const updateOrderStatus = async (id: number, status: OrderStatus) => {
        try {
            const response = await fetch(`${config.API_URL}/order/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating order status:', error);
            throw error;
        }
    };


    const handleUpdateStatus = async (id: number, status: OrderStatus) => {
        try {
            const updatedOrder = await updateOrderStatus(id, status);

            setOrders(
                orders.map(order =>
                    order.id === Number(id)
                        ? { ...order, status }
                        : order
                )
            );

            if (selectedOrder?.id === id) {
                setSelectedOrder({
                    ...selectedOrder,
                    status
                });
            }

            toast({
                title: "Статус обновлен",
                description: `Статус заказа изменен на "${getStatusText(status)}"`,
            });
        } catch (error) {
            toast({
                title: "Ошибка обновления",
                description: "Не удалось обновить статус заказа",
                variant: "destructive",
            });
        }
    };

    const createOrder = async (orderData: Omit<Order, 'id' | 'data_created' | 'status'>): Promise<Order> => {
        try {
            const response = await fetch(`${config.API_URL}orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            console.log(orderData)
            if (!response.ok) {
                throw new Error('Не удалось создать заказ');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
            throw error;
        }
    };

    const handleCreateOrder = async (newOrderData: Omit<Order, 'id' | 'data_created' | 'status'>) => {
        try {
            const newOrder = await createOrder(newOrderData);
            setOrders([newOrder, ...orders]);
            setIsNewOrderOpen(false);

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


    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.construction_place.toLowerCase().includes(search.toLowerCase()) ||
            (order.email && order.email.toLowerCase().includes(search.toLowerCase())) ||
            order.house_details.title.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    const sortedOrders = [...filteredOrders].sort((a, b) => {
        let comparison = 0;

        switch(sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'house':
                comparison = a.house_details.title.localeCompare(b.house_details.title);
                break;
            case 'date':
            default:
                comparison = new Date(a.data_created).getTime() - new Date(b.data_created).getTime();
                break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });


    const getStatusText = (status: OrderStatus): string => {
        switch(status) {
            case 'pending': return 'Ожидает одобрения';
            case 'approved': return 'Одобрено';
            case 'rejected': return 'Отклонено';
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


    const fetchHouses = async (): Promise<House[]> => {
        try {
            const response = await fetch(`${config.API_URL}/houses`);
            if (!response.ok) {
                throw new Error('Не удалось получить дома');
            }
            const result = await response.json();

            return result.results.map((house: House) => ({
                id: house.id,
                title: house.title
            }));
        } catch (error) {
            console.error('Ошибка получения домов:', error);
            return [];
        }
    };

    const fetchFinishingOptions = async (): Promise<FinishingOption[]> => {
        try {
            const response = await fetch(`${config.API_URL}/finishing-options`);
            if (!response.ok) {
                throw new Error('Failed to fetch finishing options');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching finishing options:', error);
            throw error;
        }
    };

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Заказы</h1>
                <p className="text-gray-600 mt-1">
                    Управление заказами на строительство домов
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3">
                    <Card className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="relative w-full sm:w-96">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Поиск заказов..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => setIsNewOrderOpen(true)}
                                    className="bg-construction-blue-600 hover:bg-construction-blue-700"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Новый заказ
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
                                    <ToggleGroupItem value="pending">Ожидающие</ToggleGroupItem>
                                    <ToggleGroupItem value="approved">Одобренные</ToggleGroupItem>
                                    <ToggleGroupItem value="rejected">Отклоненные</ToggleGroupItem>
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
                                    <ToggleGroupItem value="name" className="flex items-center">
                                        Имя
                                        {sortBy === 'name' && (
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

                        <OrdersTable
                            orders={sortedOrders}
                            onSelect={setSelectedOrder}
                            selectedId={selectedOrder?.id}
                        />
                    </Card>
                </div>

                <div className="w-full lg:w-1/3">
                    {selectedOrder ? (
                        <OrderDetails
                            order={selectedOrder}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ) : (
                        <Card className="p-6 h-96 flex flex-col items-center justify-center text-center text-gray-500">
                            <MapPin size={48} className="mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium mb-2">Выберите заказ</h3>
                            <p>Выберите заказ из списка слева, чтобы просмотреть подробности</p>
                        </Card>
                    )}
                </div>
            </div>

            {loadingHouses || loadingFinishingOptions ? (
                <p>Загрузка данных...</p>
            ) : (
                <NewOrderDialog
                    isOpen={isNewOrderOpen}
                    onClose={() => setIsNewOrderOpen(false)}
                    onCreate={handleCreateOrder}
                    houses={houses}
                    finishing_option={finishingOptions}
                />
            )}
        </Layout>
    );
};

export default Orders;
