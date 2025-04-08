
import React from 'react';
import { Building, CheckCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Client {
    id: string;
    name: string;
    company?: string;
    email: string;
    phone: string;
    projectsCount: number;
    status: 'active' | 'lead' | 'inactive';
    lastContact: string;
}

interface ClientsListProps {
    clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Клиенты</CardTitle>
                    <CardDescription>Последние клиенты и потенциальные заказчики</CardDescription>
                </div>
                <a
                    href="/clients/new"
                    className="bg-construction-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-construction-blue-700 transition-colors"
                >
                    Добавить клиента
                </a>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Имя
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Контакты
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Проекты
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Статус
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-construction-blue-100 flex items-center justify-center">
                                            {client.company ? (
                                                <Building size={18} className="text-construction-blue-600" />
                                            ) : (
                                                <User size={18} className="text-construction-blue-600" />
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                            {client.company && (
                                                <div className="text-xs text-gray-500">{client.company}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">{client.email}</div>
                                    <div className="text-xs text-gray-500">{client.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="flex items-center">
                                        <CheckCheck size={16} className="text-construction-blue-500 mr-1" />
                                        <span className="text-sm text-gray-900">{client.projectsCount}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={
                                        client.status === 'active' ? 'default' :
                                            client.status === 'lead' ? 'outline' : 'secondary'
                                    }>
                                        {client.status === 'active' ? 'Активный' :
                                            client.status === 'lead' ? 'Потенциальный' : 'Неактивный'}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-right">
                    <a href="/clients" className="text-sm font-medium text-construction-blue-600 hover:text-construction-blue-800">
                        Просмотреть всех клиентов
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default ClientsList;
