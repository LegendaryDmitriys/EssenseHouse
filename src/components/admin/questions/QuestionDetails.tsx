import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, Send, PhoneCall } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { HouseQuestion, QuestionStatus, UserQuestion } from '@/types/question';
import { useToast } from '@/hooks/use-toast';
import {formatDate} from "@/lib/utils.ts";
import config from "@/api/api.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

interface QuestionDetailsProps {
    question: HouseQuestion | UserQuestion;
    onUpdateStatus: (id: string, status: QuestionStatus, answer?: string) => void;
    type: 'house' | 'user';
}

const QuestionDetails = ({
                                                             question,
                                                             onUpdateStatus,
                                                             type
                                                         }:QuestionDetailsProps) => {
    const [answerText, setAnswerText] = useState('');
    const { toast } = useToast();



    const isHouseQuestion = (question: HouseQuestion | UserQuestion): question is HouseQuestion => {
        return 'house' in question && 'question' in question;
    };


    const handleSendAnswer = async () => {
        if (!answerText.trim()) return;

        onUpdateStatus(question.id, 'answered', answerText);
        if ('email' in question && question.email) {
            try {
                await fetch(`${config.API_URL}mail/send-answer/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({
                        email: question.email,
                        questionId: question.id,
                        answer: answerText,
                    }),
                });
                toast({
                    title: 'Письмо отправлено',
                    description: `Ответ отправлен на почту: ${question.email}`,
                });
            } catch (error) {
                toast({
                    title: 'Ошибка',
                    description: 'Не удалось отправить письмо.',
                    variant: 'destructive',
                });
            }
        }

        setAnswerText('');
    };


    const handleCall = () => {

        window.location.href = `tel:${question.phone}`;
        toast({
            title: "Звонок",
            description: `Набираем номер ${question.phone}`,
        });
    };

    return (
        <Card className="p-6">

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{question.first_name} {question.last_name}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                        <p>Телефон: {question.phone}</p>
                        {isHouseQuestion(question) && question.email && (
                            <p>Email: {question.email}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <StatusBadge status={question.status} context="question" />
                    <span className="text-xs text-gray-500 mt-2">
                        {formatDate(question.created_at)}
                    </span>
                </div>
            </div>

            {isHouseQuestion(question) && (
                <>
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Интересующий дом</h4>
                        <p className="text-sm text-gray-900 mt-1">{question.house_details.title}</p>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700">Вопрос</h4>
                        <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{question.question}</p>
                    </div>
                </>
            )}

            <Separator className="my-4" />


            {type === 'user' && (
                <div className="mb-4">
                    <Button
                        onClick={handleCall}
                        variant="outline"
                        className="w-full"
                    >
                        <PhoneCall className="mr-2 h-4 w-4" />
                        Позвонить {question.phone}
                    </Button>
                </div>
            )}


            <div className="mt-4">
                {type === 'house' && <h4 className="text-sm font-medium text-gray-700 mb-2">Ответ</h4>}

                {question.status !== 'closed' ? (
                    <>
                    {question.answer && (
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">{question.answer}</p>
                        </div>
                    )}

                        <div className="space-y-4">
                            {type === 'house' && (
                                <Textarea
                                    placeholder="Введите дополнительный ответ или уточнение..."
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                    className="min-h-[100px]"
                                />
                            )}
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => onUpdateStatus(question.id, 'closed')}
                                >
                                    Закрыть вопрос
                                </Button>
                                {type === 'house' && (
                                    <Button
                                        onClick={handleSendAnswer}
                                        disabled={!answerText.trim()}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Отправить ответ
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-gray-500 italic">Вопрос закрыт</p>
                )}
            </div>
        </Card>
    );
};

export default QuestionDetails;
