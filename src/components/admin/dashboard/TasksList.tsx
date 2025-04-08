import React from 'react';
import { Check, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
    id: string;
    title: string;
    project: string;
    dueDate: string;
    status: 'pending' | 'completed' | 'overdue';
    priority: 'low' | 'medium' | 'high';
}

interface TasksListProps {
    tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
    const getPriorityBadge = (priority: Task['priority']) => {
        switch (priority) {
            case 'high':
                return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Высокий</span>;
            case 'medium':
                return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Средний</span>;
            case 'low':
                return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Низкий</span>;
        }
    };

    const getStatusIcon = (status: Task['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'overdue':
                return <Clock className="h-5 w-5 text-red-500" />;
            default:
                return <Clock className="h-5 w-5 text-amber-500" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Задачи</CardTitle>
                <CardDescription>Текущие и предстоящие задачи</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={cn(
                                "p-4 border rounded-lg flex items-center justify-between gap-4 transition-colors",
                                task.status === 'completed' ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
                            )}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(task.status)}
                                    <h4 className={cn(
                                        "font-medium truncate",
                                        task.status === 'completed' ? "text-gray-500 line-through" : "text-gray-900"
                                    )}>
                                        {task.title}
                                    </h4>
                                </div>
                                <div className="mt-1 text-sm text-gray-600 truncate">
                                    Проект: {task.project}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {getPriorityBadge(task.priority)}
                                <div className="text-sm text-gray-600 whitespace-nowrap">
                                    {task.dueDate}
                                </div>

                                {task.status !== 'completed' && (
                                    <button
                                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                        title="Отметить как выполнено"
                                    >
                                        <Check className="h-4 w-4 text-gray-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {tasks.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Нет текущих задач</p>
                    </div>
                )}

                <div className="mt-4 text-right">
                    <a href="/tasks" className="text-sm font-medium text-construction-blue-600 hover:text-construction-blue-800">
                        Просмотреть все задачи
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default TasksList;
