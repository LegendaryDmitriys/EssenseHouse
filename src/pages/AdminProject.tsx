import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
    Home,
    Plus,
    Search,
    Edit,
    Trash2,
    ChevronRight
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { House, PaginatedHouses } from "@/types/house";
import Layout from "@/components/admin/dashboard/Layout.tsx";
import config from "@/api/api.ts";
import debounce from "lodash.debounce";
import HouseForm from "@/components/admin/projects/HouseForm.tsx";

const AdminProjects = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const pageSize = 6;

    const queryClient = useQueryClient();

    const debouncedSetSearchTerm = useCallback(
        debounce((value) => {
            setSearchTerm(value);
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSetSearchTerm(value);
    };


    const { data: paginatedData, isLoading } = useQuery<PaginatedHouses>({
        queryKey: ["houses", currentPage, searchTerm],
        queryFn: async () => {
            let url = `${config.API_URL}houses/?page=${currentPage}&page_size=${pageSize}`;
            if (searchTerm) {
                url += `&title=${searchTerm}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Ошибка соединения");
            }
            return response.json();
        },
    });

    const deleteHouseMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${config.API_URL}houses/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
                }
            });
            if (!response.ok) {
                throw new Error("Ошибка во время удаления дома");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["houses"] });
            toast.success("Дом успешно удален");
        },
        onError: () => {
            toast.error("Ошибка при удалении дома");
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить этот дом?")) {
            deleteHouseMutation.mutate(id);
        }
    };

    const handleCreateSuccess = () => {
        setShowForm(false);
        queryClient.invalidateQueries({ queryKey: ["houses"] });
        toast.success("Дом успешно создан");
    };

    const totalPages = paginatedData
        ? Math.ceil(paginatedData.count / pageSize)
        : 0;

    const renderPagination = () => {
        if (!totalPages || totalPages <= 1) return null;

        return (
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink
                                onClick={() => setCurrentPage(i + 1)}
                                isActive={currentPage === i + 1}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Управление домами</h1>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Отменить" : <><Plus className="mr-2" /> Новый дом</>}
                </Button>
            </div>

            {showForm ? (
                <Card className="mb-6">
                    <HouseForm onSuccess={handleCreateSuccess} />
                </Card>
            ) : (
                <div className="mb-6">
                    <div className="flex gap-4 mb-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Поиск по названию..."
                                className="pl-8"
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8">Загрузка...</div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedData?.results.map((house) => (
                                    <Card key={house.id} className="overflow-hidden">
                                        <div className="relative h-48 overflow-hidden">
                                            {house.images && house.images.length > 0 ? (
                                                <img
                                                    src={
                                                        house.images && house.images.length > 0
                                                            ? `${config.API_URL}${house.images[0].image}`
                                                            : "/placeholder.svg?height=400&width=600"
                                                    }
                                                    alt={house.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <Home className="h-12 w-12 text-gray-400" />
                                                </div>
                                            )}
                                            {house.best_seller && (
                                                <Badge className="absolute top-2 right-2 bg-yellow-500">
                                                    {house.best_seller}
                                                </Badge>
                                            )}
                                            {house.new && (
                                                <Badge className="absolute top-2 left-2">
                                                    Новинка
                                                </Badge>
                                            )}
                                            {house.discount_percentage && (
                                                <Badge className="absolute bottom-2 right-2 bg-red-500">
                                                    Скидка {house.discount_percentage}%
                                                </Badge>
                                            )}
                                        </div>

                                        <CardContent className="pt-4">
                                            <h3 className="font-semibold text-lg mb-1">{house.title}</h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="font-bold text-lg">
                                                    {house.price}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {house.area} м²
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                                                <div>Этажей: {house.floors}</div>
                                                <div>Комнат: {house.rooms}</div>
                                                <div>Спален: {house.bedrooms}</div>
                                                <div>
                                                    {house.bathrooms ? `Санузлов: ${house.bathrooms}` : ''}
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex justify-between border-t pt-4">
                                            <Link to={`/admin/projects/${house.id}`}>
                                                <Button variant="outline">
                                                    Детали <ChevronRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(house.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            {paginatedData?.results.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Нет доступных домов
                                </div>
                            )}

                            {renderPagination()}
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default AdminProjects;
