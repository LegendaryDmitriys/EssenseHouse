import React from 'react';
import { Bell, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface HeaderProps {
    toggleSidebar: () => void;
    sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="mr-2"
                        aria-label={sidebarOpen ? "Закрыть меню" : "Открыть меню"}
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                    <h1 className="text-xl font-semibold text-gray-900 hidden md:block">
                        Админ-панель СтройУправление
                    </h1>
                </div>

                <div className="flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-construction-orange-500 ring-2 ring-white" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72">
                            <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-80 overflow-y-auto">
                                <DropdownMenuItem className="py-3">
                                    <div>
                                        <div className="font-medium">Новый проект создан</div>
                                        <div className="text-sm text-muted-foreground">Проект "Загородный дом 230м²" создан</div>
                                        <div className="text-xs text-muted-foreground mt-1">2 часа назад</div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="py-3">
                                    <div>
                                        <div className="font-medium">Поступила новая заявка</div>
                                        <div className="text-sm text-muted-foreground">Клиент запрашивает консультацию</div>
                                        <div className="text-xs text-muted-foreground mt-1">5 часов назад</div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="py-3">
                                    <div>
                                        <div className="font-medium">Задержка поставки</div>
                                        <div className="text-sm text-muted-foreground">Задержка поставки кровельных материалов</div>
                                        <div className="text-xs text-muted-foreground mt-1">Вчера</div>
                                    </div>
                                </DropdownMenuItem>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-center text-primary">
                                Просмотреть все
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2"
                            >
                                <span className="hidden md:block">Александр Петров</span>
                                <div className="h-8 w-8 rounded-full bg-construction-blue-200 flex items-center justify-center">
                                    <User size={16} className="text-construction-blue-700" />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Профиль</DropdownMenuItem>
                            <DropdownMenuItem>Настройки</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Выйти</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;
