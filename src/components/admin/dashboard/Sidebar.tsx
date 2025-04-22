import React, { useState } from 'react';
import {Link, Route, useLocation} from 'react-router-dom';
import {
    LayoutDashboard,
    HardHat,
    MessageSquare,
    Users,
    ScrollText,
    ClipboardList,
    Settings,
    Menu,
    X,
    Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isMobile: boolean;
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
    const location = useLocation();

    const sidebarItems = [
        {
            name: 'Дашборд',
            path: '/',
            icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
            name: 'Проекты',
            path: '/projects',
            icon: <HardHat className="h-5 w-5" />
        },
        {
            name: 'Заказы',
            path: '/admin/orders',
            icon: <ClipboardList className="h-5 w-5" />
        },
        {
            name: 'Строительство',
            path: '/admin/construction',
            icon: <Home className="h-5 w-5" />
        },
        {
            name: 'Вопросы пользователей',
            path: '/admin/user-questions',
            icon: <Home className="h-5 w-5" />
        },
        {
            name: 'Вопросы пользователей о домах',
            path: '/admin/house-questions',
            icon: <Home className="h-5 w-5" />
        },
        {
            name: 'Отзывы пользователей',
            path: '/admin/reviews',
            icon: <Home className="h-5 w-5" />
        },
    ];

    const sidebarClasses = cn(
        "flex flex-col h-screen w-64 bg-white border-r border-gray-200 transition-all duration-300 z-50",
        isMobile ? (isOpen ? "fixed inset-y-0 left-0" : "-translate-x-full fixed inset-y-0 left-0") : (isOpen ? "mr-0" : "-ml-64")
    );

    return (
        <>
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}


            <div className={sidebarClasses}>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-4 space-y-1">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100",
                                    location.pathname === item.path && "bg-construction-blue-50 text-construction-blue-700"
                                )}
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
