import {useEffect, useState} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import config from "@/api/api.ts";
import { Review, ReviewPaginatedResponse } from "@/types/review.ts";
import {formatDate} from "@/lib/utils.ts";

interface UserReviewsTableProps {
    onReviewSelect: (review: Review) => void;
}

const UserReviewsTable = ({ onReviewSelect }: UserReviewsTableProps) => {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const queryClient = useQueryClient();

    const { data: paginatedData, isLoading } = useQuery<ReviewPaginatedResponse>({
        queryKey: ["reviews", statusFilter, currentPage],
        queryFn: async () => {
            let url = `${config.API_URL}reviews/?page=${currentPage}&page_size=${pageSize}`;
            if (statusFilter !== "all") {
                url += `&status=${statusFilter}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            return response.json();
        },
    });


    const renderStatusBadge = (status: Review["status"]) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Ожидает публикации
                    </Badge>
                );
            case "published":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Опубликован
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Отклонено
                    </Badge>
                );
        }
    };

    const totalPages = paginatedData ? Math.ceil(paginatedData.count / pageSize) : 0;

    const renderPagination = () => {
        if (!totalPages || totalPages <= 1) return null;
        return (
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter]);

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Отзывы</h1>
                <Select onValueChange={setStatusFilter} defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все отзывы</SelectItem>
                        <SelectItem value="pending">Ожидают публикации</SelectItem>
                        <SelectItem value="published">Опубликованные</SelectItem>
                        <SelectItem value="rejected">Отклоненные</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {isLoading ? (
                <div className="text-center py-8">Загрузка...</div>
            ) : (
                <>
                    <div className="space-y-4">
                        {paginatedData?.results.map((review) => (
                            <Card
                                key={review.id}
                                className="cursor-pointer transition-colors hover:bg-gray-50"
                                onClick={() => onReviewSelect(review)}
                            >
                                <CardContent className="pt-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{review.name}</h3>
                                            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                                        </div>
                                        {renderStatusBadge(review.status)}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{review.review}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {renderPagination()}
                </>
            )}
        </>
    );
};

export default UserReviewsTable;