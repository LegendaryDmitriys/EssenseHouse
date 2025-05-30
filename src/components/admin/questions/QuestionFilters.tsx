import React from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface QuestionFiltersProps {
    search: string;
    setSearch: (search: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    handleSortChange: (value: string) => void;
}

const QuestionFilters = ({
                                                             search,
                                                             setSearch,
                                                             statusFilter,
                                                             setStatusFilter,
                                                             sortBy,
                                                             sortOrder,
                                                             handleSortChange,
                                                         }: QuestionFiltersProps) => {
    return (
        <div className="w-full space-y-4">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Поиск вопросов..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-sm font-medium text-gray-500 mr-2">Статус:</span>
                    <ToggleGroup
                        type="single"
                        value={statusFilter}
                        onValueChange={(value) => value && setStatusFilter(value)}
                    >
                        <ToggleGroupItem value="all">Все</ToggleGroupItem>
                        <ToggleGroupItem value="waiting">Ожидающие</ToggleGroupItem>
                        <ToggleGroupItem value="answered">Отвеченные</ToggleGroupItem>
                        <ToggleGroupItem value="closed">Закрытые</ToggleGroupItem>
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
                        <ToggleGroupItem value="lastName" className="flex items-center">
                            Имя
                            {sortBy === 'lastName' && (
                                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                            )}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="status" className="flex items-center">
                            Статус
                            {sortBy === 'status' && (
                                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                            )}
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>
    );
};

export default QuestionFilters;
