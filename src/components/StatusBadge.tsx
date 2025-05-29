import React from "react";
import { Badge } from "@/components/ui/badge";
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    XCircle,
} from "lucide-react";

type StatusType = 'pending' | 'approved' | 'rejected' | 'published' | 'not_started' | 'in_progress' | 'completed' | 'waiting' | 'answered' | 'closed' | string;

interface StatusBadgeProps {
    status: StatusType;
    context?: 'order' | 'blog' | 'purchasedHouse' | 'question' | 'review' | 'default';
}

const StatusBadge = ({ status, context = 'default' }: StatusBadgeProps) => {

    const getBadgeConfig = () => {
        switch (context) {
            case 'order':
                switch (status) {
                    case 'pending':
                        return {
                            icon: <Clock className="h-3 w-3" />,
                            label: "Ожидает одобрения",
                            className: "bg-yellow-50 text-yellow-700 border-yellow-200"
                        };
                    case 'approved':
                        return {
                            icon: <CheckCircle2 className="h-3 w-3" />,
                            label: "Одобрено",
                            className: "bg-green-50 text-green-700 border-green-200"
                        };
                    case 'rejected':
                        return {
                            icon: <XCircle className="h-3 w-3" />,
                            label: "Отклонено",
                            className: "bg-red-50 text-red-700 border-red-200"
                        };
                    default:
                        return null;
                }

            case 'blog':
                switch (status) {
                    case 'pending':
                        return {
                            icon: <Clock className="h-3 w-3" />,
                            label: "В ожидании",
                            className: "bg-blue-50 text-blue-700 border-blue-200"
                        };
                    case 'published':
                        return {
                            icon: <CheckCircle2 className="h-3 w-3" />,
                            label: "Опубликован",
                            className: "bg-green-50 text-green-700 border-green-200"
                        };
                    case 'rejected':
                        return {
                            icon: <AlertCircle className="h-3 w-3" />,
                            label: "Отказано",
                            className: "bg-gray-50 text-gray-700 border-gray-200"
                        };
                    default:
                        return null;
                }

            case 'purchasedHouse':
                switch (status) {
                    case 'not_started':
                        return {
                            icon: <AlertCircle className="h-3 w-3" />,
                            label: "Не начато",
                            className: "bg-gray-50 text-gray-700 border-gray-200"
                        };
                    case 'in_progress':
                        return {
                            icon: <Clock className="h-3 w-3" />,
                            label: "В процессе",
                            className: "bg-blue-50 text-blue-700 border-blue-200"
                        };
                    case 'completed':
                        return {
                            icon: <CheckCircle2 className="h-3 w-3" />,
                            label: "Построен",
                            className: "bg-green-50 text-green-700 border-green-200"
                        };
                    default:
                        return null;
                }

            case 'question':
                switch (status) {
                    case 'closed':
                        return {
                            icon: <XCircle className="h-3 w-3" />,
                            label: "Закрыт",
                            className: "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        };
                    case 'waiting':
                        return {
                            icon: <Clock className="h-3 w-3" />,
                            label: "Ожидает ответа",
                            className: "bg-green-100 text-green-800 hover:bg-green-100"
                        };
                    case 'answered':
                        return {
                            icon: <CheckCircle2 className="h-3 w-3" />,
                            label: "Ответ предоставлен",
                            className: "bg-green-100 text-green-800 hover:bg-green-100"
                        };
                    default:
                        return null;
                }

            case 'review':
                switch (status) {
                    case 'rejected':
                        return {
                            icon: <XCircle className="h-3 w-3" />,
                            label: "Отклонено",
                            className: "bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
                        };
                    case 'pending':
                        return {
                            icon: <Clock className="h-3 w-3" />,
                            label: "Ожидает публикации",
                            className: "bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
                        };
                    case 'published':
                        return {
                            icon: <CheckCircle2 className="h-3 w-3" />,
                            label: "Опубликован",
                            className: "bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                        };
                    default:
                        return null;
                }

            default:
                return null;
        }
    };

    const config = getBadgeConfig();
    if (!config) return null;

    return (
        <Badge variant="outline" className={`flex items-center gap-1 ${config.className}`}>
            {config.icon}
            {config.label}
        </Badge>
    );
};

export default StatusBadge;