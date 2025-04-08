import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Building,
    Users,
    FileText,
    Truck,
    Settings,
    Calendar,
    MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    title: string;
}

interface SidebarProps {
    isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, title }) => {
    return (
        <NavLink
            to={href}
            className={({ isActive }) => cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                "hover:bg-construction-blue-100 hover:text-construction-blue-800",
                isActive
                    ? "bg-construction-blue-100 text-construction-blue-800"
                    : "text-construction-gray-700"
            )}
        >
            <Icon className="h-5 w-5 mr-3 shrink-0" />
            <span>{title}</span>
        </NavLink>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <aside
            className={cn(
                "bg-white border-r border-gray-200 z-30 transition-all duration-300 ease-in-out",
                isOpen ? "w-64" : "w-0 -translate-x-full md:translate-x-0 md:w-16"
            )}
        >
            <div className="flex flex-col h-full">
                <div className={cn(
                    "flex items-center h-16 px-4 border-b border-gray-200",
                    isOpen ? "justify-start" : "justify-center"
                )}>
                    {isOpen ? (
                        <>
                            <Building size={24} className="text-construction-blue-600" />
                            <span className="ml-3 text-xl font-semibold text-construction-blue-900">СтройУправление</span>
                        </>
                    ) : (
                        <Building size={24} className="text-construction-blue-600" />
                    )}
                </div>

                <div className="flex-1 py-4 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                        {isOpen ? (
                            <>
                                <NavItem href="/" icon={LayoutDashboard} title="Обзор" />
                                <NavItem href="/projects" icon={Building} title="Проекты" />
                                <NavItem href="/clients" icon={Users} title="Клиенты" />
                                <NavItem href="/materials" icon={Truck} title="Материалы" />
                                <NavItem href="/documents" icon={FileText} title="Документы" />
                                <NavItem href="/schedule" icon={Calendar} title="Расписание" />
                                <NavItem href="/messages" icon={MessageCircle} title="Обращения" />
                                <NavItem href="/settings" icon={Settings} title="Настройки" />
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <LayoutDashboard size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/projects" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <Building size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/clients" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <Users size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/materials" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <Truck size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/documents" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <FileText size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/schedule" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <Calendar size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/messages" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <MessageCircle size={20} />
                                    </NavLink>
                                </div>
                                <div className="flex justify-center py-3">
                                    <NavLink to="/settings" className={({ isActive }) => cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-construction-blue-100 text-construction-blue-800" : "text-construction-gray-700",
                                        "hover:bg-construction-blue-100 hover:text-construction-blue-800"
                                    )}>
                                        <Settings size={20} />
                                    </NavLink>
                                </div>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
