import React, {useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {formatDate} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {MessageCircle} from "lucide-react";
import ChatModal from "@/components/chat/ChatModal.tsx";


const QuestionCard = ({ question, type }) => {
    const [isChatOpen, setIsChatOpen] = useState(false)

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'waiting':
                return 'default';
            case 'answered':
                return 'secondary';
            case 'closed':
                return 'destructive';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'waiting':
                return 'Ожидает';
            case 'answered':
                return 'Отвечен';
            case 'closed':
                return 'Закрыт';
            default:
                return status;
        }
    };

    const openChat = () => {
        setIsChatOpen(true)
    }

    const closeChat = () => {
        setIsChatOpen(false)
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                            {type === 'simple' ? 'Запись на консультацию' : 'Вопрос по дому'}
                        </CardTitle>
                        <Badge variant={getStatusVariant(question.status)}>
                            {getStatusText(question.status)}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="font-medium text-muted-foreground">Имя:</span>
                            <p>{question.first_name} {question.last_name}</p>
                        </div>
                        <div>
                            <span className="font-medium text-muted-foreground">Телефон:</span>
                            <p>{question.phone}</p>
                        </div>
                    </div>

                    {type === 'house' && 'house_details' in question && (
                        <>
                            <div className="text-sm">
                                <span className="font-medium text-muted-foreground">Дом:</span>
                                <p>{question.house_details.title}</p>
                            </div>
                            {'email' in question && (
                                <div className="text-sm">
                                    <span className="font-medium text-muted-foreground">Email:</span>
                                    <p>{question.email}</p>
                                </div>
                            )}
                            {'question' in question && (
                                <div className="text-sm">
                                    <span className="font-medium text-muted-foreground">Вопрос:</span>
                                    <p className="mt-1 p-2 bg-muted rounded">{question.question}</p>
                                </div>
                            )}
                        </>
                    )}

                    <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Дата создания:</span> {formatDate(question.created_at)}
                    </div>
                    {type === 'house' && (
                        <>
                            <div className="pt-2">
                                <Button variant="outline" size="sm" className="w-full" onClick={openChat}>
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Перейти в чат
                                </Button>
                            </div>
                            <ChatModal isOpen={isChatOpen} onClose={closeChat} questionId={question.id.toString()} />
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default QuestionCard;