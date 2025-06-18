import React, {useEffect, useState} from 'react';
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
import config from "@/api/api.ts";


export const ProjectsChartPanel = () => {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState('6m');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.API_URL}stats/dashboard/?period=${period}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }

                const json = await response.json();
                setData(json.projects);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [period]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Статистика проектов</CardTitle>
                    <CardDescription>Активные и завершенные проекты по месяцам</CardDescription>
                </div>
                <Select defaultValue={period} onValueChange={setPeriod}>
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
                        <BarChart data={data}>
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

export const BudgetChartPanel = () => {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState('6m');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.API_URL}stats/dashboard/?period=${period}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }

                const json = await response.json();
                setData(json.budget);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [period]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Бюджет проектов</CardTitle>
                    <CardDescription>План vs факт (млн руб.)</CardDescription>
                </div>
                <Select value={period} onValueChange={setPeriod}>
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
                            data={data}
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
