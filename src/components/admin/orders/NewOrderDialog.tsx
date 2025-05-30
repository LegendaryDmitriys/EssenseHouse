import React, { useState } from 'react';
import { HomeIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order } from "@/types/order.ts";
import {FinishingOption, House} from "@/types/house.ts";


interface NewOrderDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (order: Omit<Order, 'id' | 'data_created' | 'status'>) => void;
    houses: House[];
    finishing_option: FinishingOption[];
}

const NewOrderDialog = ({
                                                           isOpen,
                                                           onClose,
                                                           onCreate,
                                                           houses,
                                                           finishing_option
                                                       }:NewOrderDialogProps) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedHouseId, setSelectedHouseId] = useState('');
    const [selectedFinishingOptionId, setSelectedFinishingOptionId] = useState('');
    const [constructionPlace, setConstructionPlace] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!first_name) newErrors.name = 'Имя обязательно';
        if (!last_name) newErrors.name = 'Фамилия обязательна';
        if (!phone) newErrors.phone = 'Телефон обязателен';
        if (!selectedHouseId) newErrors.selectedHouseId = 'Выберите дом';
        if (!constructionPlace) newErrors.constructionPlace = 'Укажите место строительства';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const selectedHouse = houses.find(h => h.id === Number(selectedHouseId));
        const selectedFinishingOption = selectedFinishingOptionId
            ? finishing_option.find(f => f.id === Number(selectedFinishingOptionId))
            : undefined;

        if (!selectedHouse) return;

        const newOrder: Omit<Order, 'id' | 'data_created' | 'status'> = {
            first_name,
            last_name,
            phone,
            house: selectedHouse.id,
            email: email || undefined,
            house_details: selectedHouse,
            finishing_option: selectedFinishingOption,
            construction_place: constructionPlace,
            message
        };

        onCreate(newOrder);
        resetForm();
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setSelectedHouseId('');
        setSelectedFinishingOptionId('');
        setConstructionPlace('');
        setMessage('');
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <HomeIcon className="mr-2 h-5 w-5" />
                        Новый заказ
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">Имя заказчика *</Label>
                        <Input
                            id="first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={errors.first_name ? "border-red-300" : ""}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last_name">Фамилия заказчика *</Label>
                        <Input
                            id="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            className={errors.last_name ? "border-red-300" : ""}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+7 (___) ___-__-__"
                            className={errors.phone ? "border-red-300" : ""}
                        />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="house">Выберите дом *</Label>
                        <Select
                            value={selectedHouseId}
                            onValueChange={setSelectedHouseId}
                        >
                            <SelectTrigger className={errors.selectedHouseId ? "border-red-300" : ""}>
                                <SelectValue placeholder="Выберите дом"/>
                            </SelectTrigger>
                            <SelectContent>
                                {houses.map((house) => (
                                    <SelectItem key={String(house.id)}
                                                value={String(house.id)}>{house.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.selectedHouseId && <p className="text-xs text-red-500">{errors.selectedHouseId}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="finishingOption">Вариант отделки</Label>
                        <Select
                            value={selectedFinishingOptionId}
                            onValueChange={setSelectedFinishingOptionId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите вариант отделки"/>
                            </SelectTrigger>
                            <SelectContent>
                                {finishing_option.map((option) => (
                                    <SelectItem key={String(option.id)}
                                                value={String(option.id)}>{option.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="constructionPlace">Место строительства *</Label>
                        <Input
                            id="constructionPlace"
                            value={constructionPlace}
                            onChange={(e) => setConstructionPlace(e.target.value)}
                            className={errors.construction_place ? "border-red-300" : ""}
                        />
                        {errors.construction_place &&
                            <p className="text-xs text-red-500">{errors.construction_place}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Опишите ваши пожелания или задайте вопросы"
                            className="resize-none h-24"
                        />
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={handleClose}>Отмена</Button>
                        <Button type="submit">Создать заказ</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewOrderDialog;
