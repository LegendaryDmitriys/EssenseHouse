import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
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
import {
    House,
    HouseCategory,
    ConstructionTechnology,
    HouseFormValues,
    FinishingOption,
    PreviewItem
} from "@/types/house";
import config from "@/api/api.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface HouseFormProps {
    house?: House;
    onSuccess: () => void;
}

const HouseForm = ({ house, onSuccess }: HouseFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [documents, setDocuments] = useState<File[]>([]);
    const [interiorImages, setInteriorImages] = useState<File[]>([]);
    const [facadeImages, setFacadeImages] = useState<File[]>([]);
    const [layoutImages, setLayoutImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState(house?.images || []);
    const [existingInteriorImages, setExistingInteriorImages] = useState(house?.interior_images || []);
    const [existingFacadeImages, setExistingFacadeImages] = useState(house?.facade_images || []);
    const [existingLayoutImages, setExistingLayoutImages] = useState(house?.layout_images || []);
    const [existingDocuments, setExistingDocuments] = useState(house?.documents || []);


    const form = useForm<HouseFormValues>({
        defaultValues: house
            ? {
                title: house.title,
                price: house.price.toString(),
                discount_percentage: house.discount_percentage?.toString() || "",
                new: house.new,
                best_seller: house.best_seller || "__none__",
                area: house.area.toString() || "",
                floors: house.floors.toString() || "",
                rooms: house.rooms.toString() || "",
                living_area: house.living_area.toString() || "",
                kitchen_area: house.kitchen_area?.toString() || "",
                bedrooms: house.bedrooms.toString() || "",
                bathrooms: house.bathrooms?.toString() || "",
                garage: house.garage?.toString() || "",
                purpose: house.purpose || "Частый дом",
                warranty: house.warranty?.toString() || "",
                construction_time: house.construction_time?.toString() || "",
                finishing_options: house.finishing_options_details?.map(f => f.id.toString()) || [],
                construction_technology: house.construction_technology_details.id.toString() || "",
                category: house.category_details.id.toString() || "",
                description: house.description || "",
            }
            : {
                title: "",
                price: "",
                discount_percentage: "",
                new: true,
                best_seller: "__none__",
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
                finishing_options: [],
                construction_technology: "",
                category: "",
                description: "",
            },
    });

    const { data: categories } = useQuery<HouseCategory[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}houses/category/`)
            if (!response.ok){
                throw new Error("Не удалось загрузить категории")
            }
            return response.json()
        }
    });


    const { data: technologies } = useQuery<ConstructionTechnology[]>({
        queryKey: ["technologies"],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}houses/construction-technologies`)
            if (!response.ok){
                throw new Error("Не удалось загрузить технологии строительства")
            }
            return response.json()
        },
    });

    const { data: finishings } = useQuery<FinishingOption[]>({
        queryKey: ["finishings"],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}houses/finishing-options/`)
            if (!response.ok){
                throw new Error("Не удалось загрузить варианты отделки")
            }
            return response.json()
        },
    });


    const onSubmit = (values: HouseFormValues) => {
        setIsLoading(true);
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {

            if (key === "best_seller" && value === "__none__") {
                formData.append(key, "");
                return;
            }

            if (key === "new") {
                formData.append(key, Boolean(value).toString());
                return;
            }

            if (key === 'finishing_options') {
                (value as string[]).forEach(v => formData.append('finishing_options', v));
            } else {
                formData.append(key, value.toString());
            }

        });

        images.forEach(file => formData.append('images', file));
        interiorImages.forEach(file => formData.append('interior_images', file));
        facadeImages.forEach(file => formData.append('facade_images', file));
        layoutImages.forEach(file => formData.append('layout_images', file));

        documents.forEach(file => formData.append('documents', file));

        const url = house
            ? `${config.API_URL}houses/update/${house.id}/`
            : `${config.API_URL}houses/create`;
        const method = house ? 'PATCH' : 'POST';

        fetch(url, {
            method,
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.detail || "Ошибка при сохранении");
                }
                return res.json();
            })
            .then(() => {
                toast.success("Дом сохранён!");
                onSuccess();
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setIsLoading(false));
    };


    const renderPreviewList = (
        items: PreviewItem[],
        category: string,
        onRemove: (id: number) => void
    ) => (
        <ul className="space-y-2">
            {items.map((item) => {
                const isImage = "image" in item;
                const fileName = (isImage ? item.image : item.title) || "Файл";

                return (
                    <li key={item.id} className="flex items-center justify-between border p-2 rounded">
                        <a
                            href={isImage ? item.image : item.file}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="truncate"
                        >
                            {fileName}
                        </a>
                        {isImage && (
                            <img
                                src={`${config.API_URL}${item.image}`}
                                alt=""
                                className="object-cover w-full h-64"
                            />
                        )}
                        <Button
                            type="button"
                            variant="destructive"
                            size="lg"
                            onClick={() => onRemove(item.id)}
                        >
                            Удалить
                        </Button>
                    </li>
                );
            })}
        </ul>
    );

    const deleteImage = async (imageId: number, category: string) => {
        const res = await fetch(`${config.API_URL}houses/${house!.id}/images/${imageId}/delete/${category}/`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
            }
        });
        if (res.ok) {
            toast.success("Изображение удалено");
            switch (category) {
                case 'images': setExistingImages(prev => prev.filter(i => i.id !== imageId)); break;
                case 'interior_images': setExistingInteriorImages(prev => prev.filter(i => i.id !== imageId)); break;
                case 'facade_images': setExistingFacadeImages(prev => prev.filter(i => i.id !== imageId)); break;
                case 'layout_images': setExistingLayoutImages(prev => prev.filter(i => i.id !== imageId)); break;
            }
        } else {
            toast.error("Не удалось удалить изображение");
        }
    };

    const deleteDocument = async (docId: number) => {
        const res = await fetch(`${config.API_URL}houses/${house!.id}/documents/${docId}/delete/`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")} `,
            }
        });
        if (res.ok) {
            toast.success("Документ удалён");
            setExistingDocuments(prev => prev.filter(d => d.id !== docId));
        } else {
            toast.error("Не удалось удалить документ");
        }
    };


    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<File[]>>
    ) => {
        if (e.target.files) {
            setter(Array.from(e.target.files));
        }
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

                                <FormField
                                    control={form.control}
                                    name="finishing_options"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Варианты отделки</FormLabel>
                                            <FormControl>
                                                <select
                                                    multiple
                                                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        const selected = Array.from(e.target.selectedOptions).map(
                                                            (option) => option.value
                                                        );
                                                        field.onChange(selected);
                                                    }}
                                                >
                                                    {finishings?.map((finish) => (
                                                        <option key={`finishing-${finish.id}`} value={finish.id.toString()}>
                                                            {finish.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
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

                            <FormField
                                control={form.control}
                                name="best_seller"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Маркетинговая метка</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите метку" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="__none__">Нет</SelectItem>
                                                <SelectItem value="Акция">Акция</SelectItem>
                                                <SelectItem value="Новинка">Новинка</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="new"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Новый дом</FormLabel>
                                            <p className="text-sm text-muted-foreground">
                                                Отметьте, если это новый дом
                                            </p>
                                        </div>
                                    </FormItem>
                                )}
                            />

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

                            {house && (
                                <>
                                    <h4 className="font-medium">Загруженные изображения</h4>
                                    {renderPreviewList(existingImages, 'images', (id) => deleteImage(id, 'images'))}
                                    <h4 className="font-medium">Интерьер</h4>
                                    {renderPreviewList(existingInteriorImages, 'interior_images', (id) => deleteImage(id, 'interior_images'))}
                                    <h4 className="font-medium">Фасады</h4>
                                    {renderPreviewList(existingFacadeImages, 'facade_images', (id) => deleteImage(id, 'facade_images'))}
                                    <h4 className="font-medium">Планировки</h4>
                                    {renderPreviewList(existingLayoutImages, 'layout_images', (id) => deleteImage(id, 'layout_images'))}

                                    <h4 className="font-medium mt-4">Загруженные документы</h4>
                                    {renderPreviewList(existingDocuments, 'documents', deleteDocument)}
                                </>
                            )}

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
                                    <Label htmlFor="interior_images">Изображения интерьера</Label>
                                    <Input
                                        id="interior_images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setInteriorImages)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="facade_images">Фасады</Label>
                                    <Input
                                        id="facade_images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setFacadeImages)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="layout_images">Планировки</Label>
                                    <Input
                                        id="layout_images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setLayoutImages)}
                                    />
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

export default HouseForm
