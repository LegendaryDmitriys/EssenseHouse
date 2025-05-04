import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export interface ProjectCardProps {
    id: string;
    name: string;
    location: string;
    progress: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'delayed' | 'planned';
    client: string;
    imageUrl?: string;
}

const ProjectCard = ({
                                                     id,
                                                     name,
                                                     location,
                                                     progress,
                                                     startDate,
                                                     endDate,
                                                     status,
                                                     client,
                                                     imageUrl
                                                 }:ProjectCardProps) => {
    const statusColors = {
        active: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            label: 'Активен'
        },
        completed: {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            label: 'Завершен'
        },
        delayed: {
            bg: 'bg-amber-100',
            text: 'text-amber-800',
            label: 'Задержка'
        },
        planned: {
            bg: 'bg-gray-100',
            text: 'text-gray-800',
            label: 'Запланирован'
        }
    };

    const statusStyle = statusColors[status];

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {imageUrl ? (
                <div className="w-full h-40 bg-gray-100 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-full h-40 bg-construction-gray-100 flex items-center justify-center text-construction-gray-400">
                    <Building size={48} />
                </div>
            )}

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg text-gray-900 line-clamp-1">{name}</h3>
                    <span className={cn(
                        'text-xs font-medium px-2.5 py-1 rounded',
                        statusStyle.bg,
                        statusStyle.text
                    )}>
            {statusStyle.label}
          </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Прогресс</span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar size={16} className="mr-1 flex-shrink-0" />
                    <span>{startDate} — {endDate}</span>
                </div>

                <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            <span className="font-medium">Клиент:</span> {client}
          </span>
                    <a
                        href={`/projects/${id}`}
                        className="text-sm font-medium text-construction-blue-600 hover:text-construction-blue-800"
                    >
                        Подробнее
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
