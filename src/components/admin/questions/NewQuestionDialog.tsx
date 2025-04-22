
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { HouseQuestion, UserQuestion } from '@/types/question';

interface NewHouseQuestionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: Omit<HouseQuestion, 'id' | 'created_at' | 'status'>) => void;
    houses: { id: string; title: string }[];
}

const houseQuestionSchema = z.object({
    name: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов' }),
    phone: z.string().min(5, { message: 'Введите корректный номер телефона' }),
    email: z.string().email({ message: 'Введите корректный email' }).optional().or(z.literal('')),
    house: z.object({
        id: z.string(),
        title: z.string(),
    }),
    question: z.string().min(10, { message: 'Вопрос должен содержать не менее 10 символов' }),
});

export const NewHouseQuestionDialog: React.FC<NewHouseQuestionDialogProps> = ({
                                                                                  isOpen,
                                                                                  onClose,
                                                                                  onCreate,
                                                                                  houses
                                                                              }) => {
    const form = useForm<z.infer<typeof houseQuestionSchema>>({
        resolver: zodResolver(houseQuestionSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            question: '',
        },
    });

    const onSubmit = (data: z.infer<typeof houseQuestionSchema>) => {
        onCreate(data);
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Новый вопрос по дому</DialogTitle>
                    <DialogDescription>
                        Заполните форму, чтобы создать новый вопрос
                    </DialogDescription>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
                        <X className="h-4 w-4" />
                    </DialogClose>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Иван Иванов" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Телефон</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+7 (XXX) XXX-XX-XX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email (необязательно)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="house"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Дом</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedHouse = houses.find(house => house.id === value);
                                            if (selectedHouse) {
                                                field.onChange(selectedHouse);
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите дом" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {houses.map((house) => (
                                                <SelectItem key={house.id} value={house.id}>
                                                    {house.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Вопрос</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Введите ваш вопрос..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="bg-construction-blue-600 hover:bg-construction-blue-700"
                            >
                                Создать вопрос
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

interface NewUserQuestionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: Omit<UserQuestion, 'id' | 'created_at' | 'status'>) => void;
}

const userQuestionSchema = z.object({
    name: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов' }),
    phone: z.string().min(5, { message: 'Введите корректный номер телефона' }),
});

export const NewUserQuestionDialog: React.FC<NewUserQuestionDialogProps> = ({
                                                                                isOpen,
                                                                                onClose,
                                                                                onCreate
                                                                            }) => {
    const form = useForm<z.infer<typeof userQuestionSchema>>({
        resolver: zodResolver(userQuestionSchema),
        defaultValues: {
            name: '',
            phone: '',
        },
    });

    const onSubmit = (data: z.infer<typeof userQuestionSchema>) => {
        onCreate(data);
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Новый запрос клиента</DialogTitle>
                    <DialogDescription>
                        Заполните форму, чтобы создать новый запрос
                    </DialogDescription>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
                        <X className="h-4 w-4" />
                    </DialogClose>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Иван Иванов" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Телефон</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+7 (XXX) XXX-XX-XX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="bg-construction-blue-600 hover:bg-construction-blue-700"
                            >
                                Создать запрос
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
