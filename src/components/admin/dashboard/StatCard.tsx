import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string;
    icon?: React.ReactNode;
    change?: {
        value: string;
        isPositive: boolean;
    };
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               icon,
                                               change,
                                               className
                                           }) => {
    return (
        <div className={cn(
            "bg-white rounded-lg border border-gray-200 p-6 shadow-sm",
            className
        )}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h3 className="text-2xl font-semibold mt-2 text-gray-900">{value}</h3>

                    {change && (
                        <div className="flex items-center mt-2">
              <span
                  className={cn(
                      "text-xs font-medium",
                      change.isPositive ? "text-green-600" : "text-red-600"
                  )}
              >
                {change.isPositive ? "+" : ""}{change.value}
              </span>
                            <span className="text-xs text-gray-500 ml-1">по сравнению с прошлым месяцем</span>
                        </div>
                    )}
                </div>

                {icon && (
                    <div className="p-3 bg-construction-blue-50 rounded-lg">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
