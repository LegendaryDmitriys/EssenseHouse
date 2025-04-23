import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {House, HouseCategory, ConstructionTechnology, HouseFormValues} from "@/types/house";
import config from "@/api/api.ts";

interface HouseFormProps {
    house?: House;
    onSuccess: () => void;
}

export function HouseForm({ house, onSuccess }: HouseFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [documents, setDocuments] = useState<File[]>([]);

    const form = useForm<HouseFormValues>({
        defaultValues: house
            ? {
                title: house.title,
                price: house.price.toString(),
                discount_percentage: house.discount_percentage?.toString(),
                new: house.new,
                best_seller: house.best_seller,
                area: house.area.toString(),
                floors: house.floors.toString(),
                rooms: house.rooms.toString(),
                living_area: house.living_area.toString(),
                kitchen_area: house.kitchen_area?.toString(),
                bedrooms: house.bedrooms.toString(),
                bathrooms: house.bathrooms?.toString(),
                garage: house.garage?.toString(),
                purpose: house.purpose,
                warranty: house.warranty?.toString(),
                construction_time: house.construction_time?.toString(),
                construction_technology: house.construction_technology_details.id.toString(),
                category: house.category_details.id.toString(),
                description: house.description,
            }
            : {
                title: "",
                price: "",
                discount_percentage: "",
                new: true,
                best_seller: "",
                area: "",
                floors: "",
                rooms: "",
                living_area: "",
                kitchen_area: "",
                bedrooms: "",
                bathrooms: "",
                garage: "",
                purpose: "Частный дом",
                warranty: "",
                construction_time: "",
                construction_technology: "",
                category: "",
                description: "",
            },
    });

    const { data: categories } = useQuery<HouseCategory[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            return [
                { id: 1, name: "Современные дома", long_description: "Описание", short_description: "Описание ", slug: "modern" },
                { id: 2, name: "Классические дома", long_description: "Описание", short_description: "Описание ", slug: "classic" },
                { id: 1, name: "Дачные дома", long_description: "Описание", short_description: "Описание ", slug: "dacha" },
            ];
        },
    });

    const { data: technologies } = useQuery<ConstructionTechnology[]>({
        queryKey: ["technologies"],
        queryFn: async () => {

            return [
                { id: 1, name: "Каркасное строительство" },
                { id: 2, name: "Кирпичное строительство" },
                { id: 3, name: "Блочное строительство" },
            ];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: FormData) => {
            const url = house
                ? `${config.API_URL}houses/${house.id}/`
                : `${config.API_URL}houses/`;

            const method = house ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: data,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || "Произошла ошибка при сохранении");
            }

            return response.json();
        },
        onSuccess: () => {
            setIsLoading(false);
            onSuccess();
        },
        onError: (error) => {
            setIsLoading(false);
            toast.error(error.message || "Произошла ошибка при сохранении");
        },
    });

    const onSubmit = (values: HouseFormValues) => {
        setIsLoading(true);

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value.toString());
            }
        });

        images.forEach((image) => {
            formData.append('images', image);
        });

        documents.forEach((doc) => {
            formData.append('documents', doc);
        });

        saveMutation.mutate(formData);
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocuments(Array.from(e.target.files));
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Основная информация</h3>

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название дома</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Введите название дома" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Цена (₽)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="discount_percentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Скидка (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Категория</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите категорию" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.map(cat => (
                                                        <SelectItem key={`category-${cat.id}`} value={cat.id.toString()}>
                                                            {cat.name}
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
                                    name="construction_technology"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Технология строительства</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите технологию" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {technologies?.map(tech => (
                                                        <SelectItem key={`technology-${tech.id}`} value={tech.id.toString()}>
                                                            {tech.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="purpose"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Назначение</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите назначение" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Частный дом">Частный дом</SelectItem>
                                                <SelectItem value="Коммерческая недвижимость">Коммерческая недвижимость</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*<FormField*/}
                            {/*    control={form.control}*/}
                            {/*    name="best_seller"*/}
                            {/*    render={({ field }) => (*/}
                            {/*        <FormItem>*/}
                            {/*            <FormLabel>Маркетинговая метка</FormLabel>*/}
                            {/*            <Select*/}
                            {/*                onValueChange={field.onChange}*/}
                            {/*                defaultValue={field.value}*/}
                            {/*            >*/}
                            {/*                <FormControl>*/}
                            {/*                    <SelectTrigger>*/}
                            {/*                        <SelectValue placeholder="Выберите метку" />*/}
                            {/*                    </SelectTrigger>*/}
                            {/*                </FormControl>*/}
                            {/*                <SelectContent>*/}
                            {/*                    <SelectItem value="">Нет</SelectItem>*/}
                            {/*                    <SelectItem value="Акция">Акция</SelectItem>*/}
                            {/*                    <SelectItem value="Новинка">Новинка</SelectItem>*/}
                            {/*                </SelectContent>*/}
                            {/*            </Select>*/}
                            {/*            <FormMessage />*/}
                            {/*        </FormItem>*/}
                            {/*    )}*/}
                            {/*/>*/}

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="warranty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Гарантия (лет)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="construction_time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Срок строительства (дней)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Описание</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Описание дома..."
                                                className="min-h-32"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* House dimensions and features */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Параметры дома</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Площадь (м²)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="living_area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Жилая площадь (м²)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="floors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Этажи</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Комнаты</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="bedrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Спальни</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bathrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Санузлы</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="kitchen_area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Площадь кухни (м²)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="garage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Гараж (машиномест)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-lg font-medium">Файлы</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="images">Изображения дома</Label>
                                    <Input
                                        id="images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImagesChange}
                                    />
                                    {images.length > 0 && (
                                        <div className="text-sm text-gray-500">
                                            Выбрано {images.length} файлов
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="documents">Документы</Label>
                                    <Input
                                        id="documents"
                                        type="file"
                                        multiple
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                        onChange={handleDocumentsChange}
                                    />
                                    {documents.length > 0 && (
                                        <div className="text-sm text-gray-500">
                                            Выбрано {documents.length} файлов
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t pt-6 flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Сохранение..." : house ? "Сохранить изменения" : "Добавить дом"}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
}
