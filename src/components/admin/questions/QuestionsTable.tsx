import React from 'react';
import { HelpCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

import { HouseQuestion, QuestionStatus, UserQuestion } from '@/types/question';
import {formatDate} from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

interface QuestionsTableProps {
    questions: (HouseQuestion | UserQuestion)[];
    onSelect: (question: HouseQuestion | UserQuestion) => void;
    selectedId?: string;
    type: 'house' | 'user';
}

const QuestionsTable = ({
                            questions,
                            onSelect,
                            selectedId,
                            type,
                        }: QuestionsTableProps) => {


    const isHouseQuestion = (question: HouseQuestion | UserQuestion): question is HouseQuestion => {
        return 'house' in question && 'question' in question;
    };

    return (
        <div className="overflow-x-auto">
            {questions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <HelpCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p>Нет вопросов, соответствующих критериям поиска</p>
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {type === 'house' ? 'Вопрос/Дом' : 'Клиент'}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Контакты
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Статус
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Дата
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {questions.map((question) => (
                        <tr
                            key={question.id}
                            onClick={() => onSelect(question)}
                            className={`cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === question.id ? 'bg-construction-blue-50' : ''}`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {question.first_name} {question.last_name}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate max-w-[250px]">
                                            {isHouseQuestion(question) ? question.house_details.title  : ''}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{question.phone}</div>
                                {isHouseQuestion(question) && question.email && (
                                    <div className="text-sm text-gray-500">{question.email}</div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <StatusBadge status={question.status} context="question" />
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(question.created_at)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default QuestionsTable;
