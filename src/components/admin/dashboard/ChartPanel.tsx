import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const projectsData = [
    { name: 'Янв', active: 4, completed: 1 },
    { name: 'Фев', active: 5, completed: 2 },
    { name: 'Мар', active: 6, completed: 2 },
    { name: 'Апр', active: 8, completed: 3 },
    { name: 'Май', active: 10, completed: 4 },
    { name: 'Июн', active: 9, completed: 6 },
];


const budgetData = [
    { name: 'Янв', plan: 3.2, actual: 2.8 },
    { name: 'Фев', plan: 3.5, actual: 3.6 },
    { name: 'Мар', plan: 3.8, actual: 3.9 },
    { name: 'Апр', plan: 4.2, actual: 4.0 },
    { name: 'Май', plan: 4.5, actual: 4.8 },
    { name: 'Июн', plan: 5.0, actual: 5.2 },
];

export const ProjectsChartPanel = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Статистика проектов</CardTitle>
                    <CardDescription>Активные и завершенные проекты по месяцам</CardDescription>
                </div>
                <Select defaultValue="6m">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1m">1 месяц</SelectItem>
                        <SelectItem value="3m">3 месяца</SelectItem>
                        <SelectItem value="6m">6 месяцев</SelectItem>
                        <SelectItem value="1y">1 год</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={projectsData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="active" name="Активных" fill="#3b51f7" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="completed" name="Завершенных" fill="#4ade80" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export const BudgetChartPanel: React.FC = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Бюджет проектов</CardTitle>
                    <CardDescription>План vs факт (млн руб.)</CardDescription>
                </div>
                <Select defaultValue="6m">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1m">1 месяц</SelectItem>
                        <SelectItem value="3m">3 месяца</SelectItem>
                        <SelectItem value="6m">6 месяцев</SelectItem>
                        <SelectItem value="1y">1 год</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={budgetData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="plan"
                                name="План"
                                stroke="#3b51f7"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="actual"
                                name="Факт"
                                stroke="#ff4d1b"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
