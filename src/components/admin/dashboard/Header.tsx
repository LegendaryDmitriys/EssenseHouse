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

interface HeaderProps {
    toggleSidebar: () => void;
    sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen } :HeaderProps) => {
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
                        Админ-панель EssenseHouse
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
