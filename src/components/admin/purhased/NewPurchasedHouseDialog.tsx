import React, { useState } from 'react';
import { HomeIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {ConstructionStatus, PurchasedHouse} from "@/types/purchasedHouse.ts";
import {House} from "@/types/house.ts";


interface NewPurchasedHouseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (house: Omit<PurchasedHouse, 'id'>) => void;
    houses: House[];
}

const NewPurchasedHouseDialog = ({
                                                                             isOpen,
                                                                             onClose,
                                                                             onCreate,
                                                                             houses
                                                                         }:NewPurchasedHouseDialogProps) => {
    const [selectedHouseId, setSelectedHouseId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [constructionStatus, setConstructionStatus] = useState<ConstructionStatus>('not_started');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!selectedHouseId) newErrors.selectedHouseId = 'Выберите дом';
        if (!purchaseDate) newErrors.purchaseDate = 'Укажите дату покупки';
        if (!buyerName) newErrors.buyerName = 'Имя покупателя обязательно';
        if (!buyerPhone) newErrors.buyerPhone = 'Телефон покупателя обязателен';
        if (!buyerEmail) newErrors.buyerEmail = 'Email покупателя обязателен';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // if (!validateForm()) return;
        //
        // const selectedHouse = houses.find(h => h.id === selectedHouseId);
        //
        // if (!selectedHouse) return;

        // const newHouse: Omit<PurchasedHouse, 'id'> = {
        //     house_id: Number(selectedHouseId),
        //     house:
        //     purchase_date: new Date(purchaseDate).toISOString(),
        //     buyer_name: buyerName,
        //     buyer_phone: buyerPhone,
        //     buyer_email: buyerEmail,
        //     construction_status: constructionStatus,
        //     address: address || undefined
        // };

        // onCreate(newHouse);
        resetForm();
    };

    const resetForm = () => {
        setSelectedHouseId('');
        setPurchaseDate('');
        setBuyerName('');
        setBuyerPhone('');
        setBuyerEmail('');
        setConstructionStatus('not_started');
        setAddress('');
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
                        Добавить объект строительства
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="house">Выберите дом *</Label>
                        <Select
                            value={selectedHouseId}
                            onValueChange={setSelectedHouseId}
                        >
                            <SelectTrigger className={errors.selectedHouseId ? "border-red-300" : ""}>
                                <SelectValue placeholder="Выберите модель дома" />
                            </SelectTrigger>
                            <SelectContent>
                                {/*{houses.map((house) => (*/}
                                {/*    <SelectItem key={house.id} value={house.id}>{house.title}</SelectItem>*/}
                                {/*))}*/}
                            </SelectContent>
                        </Select>
                        {errors.selectedHouseId && <p className="text-xs text-red-500">{errors.selectedHouseId}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="purchaseDate">Дата покупки *</Label>
                        <Input
                            id="purchaseDate"
                            type="date"
                            value={purchaseDate}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                            className={errors.purchaseDate ? "border-red-300" : ""}
                        />
                        {errors.purchaseDate && <p className="text-xs text-red-500">{errors.purchaseDate}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="buyerName">Имя покупателя *</Label>
                        <Input
                            id="buyerName"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            className={errors.buyerName ? "border-red-300" : ""}
                        />
                        {errors.buyerName && <p className="text-xs text-red-500">{errors.buyerName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="buyerPhone">Телефон покупателя *</Label>
                        <Input
                            id="buyerPhone"
                            value={buyerPhone}
                            onChange={(e) => setBuyerPhone(e.target.value)}
                            placeholder="+7 (___) ___-__-__"
                            className={errors.buyerPhone ? "border-red-300" : ""}
                        />
                        {errors.buyerPhone && <p className="text-xs text-red-500">{errors.buyerPhone}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="buyerEmail">Email покупателя *</Label>
                        <Input
                            id="buyerEmail"
                            type="email"
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            className={errors.buyerEmail ? "border-red-300" : ""}
                        />
                        {errors.buyerEmail && <p className="text-xs text-red-500">{errors.buyerEmail}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="constructionStatus">Статус строительства *</Label>
                        <Select
                            value={constructionStatus}
                            onValueChange={(value: ConstructionStatus) => setConstructionStatus(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="not_started">Не начато</SelectItem>
                                <SelectItem value="in_progress">В процессе</SelectItem>
                                <SelectItem value="completed">Построен</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Адрес строительства</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Введите точный адрес строительства"
                        />
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={handleClose}>Отмена</Button>
                        <Button type="submit">Добавить объект</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewPurchasedHouseDialog;
