import React from 'react';
import { Building, Calendar, CheckCircle2, CreditCard, MessageCircle, Truck, Users } from 'lucide-react';
import ProjectCard, { ProjectCardProps } from '@/components/admin/dashboard/ProjectCard';
import Layout from "@/components/admin/dashboard/Layout.tsx";
import StatCard from "@/components/admin/dashboard/StatCard.tsx";
import {BudgetChartPanel, ProjectsChartPanel} from "@/components/admin/dashboard/ChartPanel.tsx";
import TasksList from "@/components/admin/dashboard/TasksList.tsx";
import ClientsList from "@/components/admin/dashboard/ClientList.tsx";



const Dashboard: React.FC = () => {
    const projects: ProjectCardProps[] = [
        {
            id: "1",
            name: "Загородный дом 230м²",
            location: "Московская область, Истринский район",
            progress: 75,
            startDate: "01.03.2023",
            endDate: "30.09.2023",
            status: "active",
            client: "Иванов А.С."
        },
        {
            id: "2",
            name: "Коттедж в стиле хай-тек",
            location: "Новая Рига, КП Европейский",
            progress: 40,
            startDate: "15.05.2023",
            endDate: "20.12.2023",
            status: "active",
            client: "ООО Инвест Строй"
        },
        {
            id: "3",
            name: "Таунхаус 150м²",
            location: "Московская область, Одинцовский район",
            progress: 90,
            startDate: "10.01.2023",
            endDate: "15.08.2023",
            status: "delayed",
            client: "Петров И.А."
        },
        {
            id: "4",
            name: "Реконструкция загородного дома",
            location: "Московская область, Дмитровский район",
            progress: 100,
            startDate: "05.12.2022",
            endDate: "15.06.2023",
            status: "completed",
            client: "Сидорова Е.В."
        }
    ];

    // Данные для задач (примеры)
    const tasks = [
        {
            id: "1",
            title: "Согласование проекта кровли",
            project: "Загородный дом 230м²",
            dueDate: "Сегодня",
            status: "pending" as const,
            priority: "high" as const
        },
        {
            id: "2",
            title: "Закупка материалов для фундамента",
            project: "Коттедж в стиле хай-тек",
            dueDate: "Завтра",
            status: "pending" as const,
            priority: "medium" as const
        },
        {
            id: "3",
            title: "Проверка электромонтажных работ",
            project: "Таунхаус 150м²",
            dueDate: "23.07.2023",
            status: "overdue" as const,
            priority: "high" as const
        },
        {
            id: "4",
            title: "Оформление документов на ввод в эксплуатацию",
            project: "Реконструкция загородного дома",
            dueDate: "25.07.2023",
            status: "completed" as const,
            priority: "medium" as const
        }
    ];

    // Данные для материалов (примеры)
    const materials = [
        {
            id: "1",
            name: "Кирпич облицовочный",
            status: "in_stock" as const,
            quantity: 12000,
            unit: "шт.",
            required: 15000
        },
        {
            id: "2",
            name: "Брус строительный 150x150",
            status: "low_stock" as const,
            quantity: 120,
            unit: "м³",
            required: 350
        },
        {
            id: "3",
            name: "Утеплитель минеральный",
            status: "ordered" as const,
            quantity: 50,
            unit: "м³",
            required: 200,
            deliveryDate: "28.07.2023"
        },
        {
            id: "4",
            name: "Кровельная черепица",
            status: "out_of_stock" as const,
            quantity: 0,
            unit: "м²",
            required: 450
        }
    ];

    // Данные для клиентов (примеры)
    const clients = [
        {
            id: "1",
            name: "Иванов Александр Сергеевич",
            email: "ivanov@example.com",
            phone: "+7 (901) 123-45-67",
            projectsCount: 1,
            status: "active" as const,
            lastContact: "2 дня назад"
        },
        {
            id: "2",
            name: "ООО Инвест Строй",
            company: "Инвестиционно-строительная компания",
            email: "info@investstroy.com",
            phone: "+7 (495) 765-43-21",
            projectsCount: 2,
            status: "active" as const,
            lastContact: "Вчера"
        },
        {
            id: "3",
            name: "Петров Игорь Андреевич",
            email: "petrov@example.com",
            phone: "+7 (902) 987-65-43",
            projectsCount: 1,
            status: "lead" as const,
            lastContact: "3 дня назад"
        },
        {
            id: "4",
            name: "Сидорова Елена Викторовна",
            email: "sidorova@example.com",
            phone: "+7 (903) 345-67-89",
            projectsCount: 1,
            status: "inactive" as const,
            lastContact: "2 недели назад"
        },
        {
            id: "5",
            name: "ЗАО Городские Проекты",
            company: "Девелоперская компания",
            email: "projects@city.com",
            phone: "+7 (495) 123-45-67",
            projectsCount: 0,
            status: "lead" as const,
            lastContact: "Сегодня"
        }
    ];

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
                    {projects.map(project => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
                <div className="mt-4 text-right">
                    <a href="/projects" className="text-construction-blue-600 hover:text-construction-blue-800 font-medium text-sm">
                        Просмотреть все проекты
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <TasksList tasks={tasks} />
            </div>

            <div className="mb-6">
                <ClientsList clients={clients} />
            </div>
        </Layout>
    );
};

export default Dashboard;
