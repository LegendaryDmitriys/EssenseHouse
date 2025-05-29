import { useState, useEffect } from 'react';
import { HouseQuestion, QuestionStatus, UserQuestion } from '@/types/question';
import { useToast } from '@/hooks/use-toast';
import config from "@/api/api.ts";

type QuestionType = 'house' | 'user';


export function useQuestions(type: QuestionType = 'house') {
    const [questions, setQuestions] = useState<(HouseQuestion | UserQuestion)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<HouseQuestion | UserQuestion | null>(null);
    const { toast } = useToast();

    const fetchQuestions = async (questionType: 'house' | 'user') => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${config.API_URL}${questionType}-questions/`);
            if (!response.ok) {
                throw new Error(`Ошибка при получении ${questionType} вопроса`);
            }
            const data = await response.json();
            setQuestions(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Произошла неизвестная ошибка'));
            toast({
                title: "Ошибка",
                description: "Не удалось загрузить вопросы",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };




    const updateQuestionStatus = async (
        questionType: 'house' | 'user',
        id: string,
        status: QuestionStatus,
        answer?: string
    ) => {
        try {
            const updateData: { status: QuestionStatus; answer?: string } = { status };
            if (answer) {
                updateData.answer = answer;
            }

            const response = await fetch(`${config.API_URL}/${questionType}-question/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) {
                throw new Error(`Ошибка при обновлении ${questionType} статуса вопроса`);
            }
            const updatedQuestion = await response.json();

            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.id === id ? updatedQuestion : question
                )
            );

            if (selectedQuestion?.id === id) {
                setSelectedQuestion(updatedQuestion);
            }

            toast({
                title: "Статус обновлен",
                description: `Статус вопроса изменен на "${getStatusText(status)}"`,
            });

            return updatedQuestion;
        } catch (error) {
            toast({
                title: "Ошибка",
                description: "Не удалось обновить статус вопроса",
                variant: "destructive",
            });
            throw error;
        }
    };

    const getStatusText = (status: QuestionStatus): string => {
        switch (status) {
            case 'waiting':
                return 'Ожидает ответа';
            case 'answered':
                return 'Ответ предоставлен';
            case 'closed':
                return 'Закрыт';
            default:
                return '';
        }
    };

    useEffect(() => {
        fetchQuestions(type);
    }, [type]);

    return {
        questions,
        isLoading,
        error,
        selectedQuestion,
        setSelectedQuestion,
        updateQuestionStatus: (id: string, status: QuestionStatus, answer?: string) =>
            updateQuestionStatus(type, id, status, answer),
        getStatusText,
    };
}