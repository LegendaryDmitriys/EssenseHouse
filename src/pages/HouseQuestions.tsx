import React, { useState } from 'react';

import Layout from '@/components/admin/dashboard/Layout.tsx';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuestions } from '@/hooks/useQuestions';
import { filterQuestions, sortQuestions } from '@/utils/questionUtils';

import QuestionsTable from '@/components/admin/questions/QuestionsTable';
import QuestionDetails from '@/components/admin/questions/QuestionDetails';
import QuestionFilters from '@/components/admin/questions/QuestionFilters';
import QuestionPlaceholder from '@/components/admin/questions/QuestionPlaceholder';


const HouseQuestions = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const {
        questions,
        isLoading,
        selectedQuestion,
        setSelectedQuestion,
        updateQuestionStatus
    } = useQuestions('house');


    const handleSortChange = (value: string) => {
        if (value === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(value);
            setSortOrder('desc');
        }
    };


    const filteredQuestions = filterQuestions(questions, search, statusFilter);
    const sortedQuestions = sortQuestions(filteredQuestions, sortBy, sortOrder);

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Вопросы по домам</h1>
                <p className="text-gray-600 mt-1">
                    Управление вопросами клиентов по домам
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3">
                    <Card className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <QuestionFilters
                                search={search}
                                setSearch={setSearch}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                                handleSortChange={handleSortChange}
                            />
                        </div>

                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ) : (
                            <QuestionsTable
                                questions={sortedQuestions}
                                onSelect={setSelectedQuestion}
                                selectedId={selectedQuestion?.id}
                                type="house"
                            />
                        )}
                    </Card>
                </div>

                <div className="w-full lg:w-1/3">
                    {isLoading ? (
                        <Card className="p-6">
                            <Skeleton className="h-8 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6 mb-6" />
                            <Skeleton className="h-32 w-full" />
                        </Card>
                    ) : selectedQuestion ? (
                        <QuestionDetails
                            question={selectedQuestion}
                            onUpdateStatus={updateQuestionStatus}
                            type="house"
                        />
                    ) : (
                        <QuestionPlaceholder />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HouseQuestions;
