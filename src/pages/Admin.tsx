import React from 'react';
import { Building, Calendar, CheckCircle2, CreditCard, MessageCircle, Truck, Users } from 'lucide-react';
import Layout from "@/components/admin/dashboard/Layout.tsx";
import StatCard from "@/components/admin/dashboard/StatCard.tsx";
import {BudgetChartPanel, ProjectsChartPanel} from "@/components/admin/dashboard/ChartPanel.tsx";



const Dashboard = () => {

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Панель управления</h1>
                <p className="text-gray-600 mt-1">Обзор ключевых показателей и текущих проектов</p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Активные проекты"
                    value="12"
                    icon={<Building size={24} className="text-construction-blue-600" />}
                    change={{ value: "20%", isPositive: true }}
                />
                <StatCard
                    title="Завершенные проекты"
                    value="45"
                    icon={<CheckCircle2 size={24} className="text-green-600" />}
                />
                <StatCard
                    title="Клиенты"
                    value="28"
                    icon={<Users size={24} className="text-construction-blue-600" />}
                    change={{ value: "5%", isPositive: true }}
                />
                <StatCard
                    title="Бюджет проектов"
                    value="64.5 млн ₽"
                    icon={<CreditCard size={24} className="text-construction-blue-600" />}
                    change={{ value: "12%", isPositive: true }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ProjectsChartPanel />
                <BudgetChartPanel />
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Текущие проекты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                </div>
                <div className="mt-4 text-right">
                    <a href="/projects" className="text-construction-blue-600 hover:text-construction-blue-800 font-medium text-sm">
                        Просмотреть все проекты
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            </div>

            <div className="mb-6">
            </div>
        </Layout>
    );
};

export default Dashboard;
