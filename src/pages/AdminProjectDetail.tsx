import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    ArrowLeft,
    Home,
    Download,
    FileText,
    Image as ImageIcon,
    Grid3X3,
    Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { House } from "@/types/house";
import config from "@/api/api.ts";
import Layout from "@/components/admin/dashboard/Layout.tsx";
import HouseForm from "@/components/admin/projects/HouseForm.tsx";

const AdminProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const { data: house, isLoading } = useQuery<House>({
        queryKey: ["house", id],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}houses/${id}/`);
            if (!response.ok) {
                throw new Error("Ошибка соединения");
            }
            return response.json();
        }
    });

    const deleteHouseMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${config.API_URL}houses/${id}/`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Ошибка во время удаления");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["houses"] });
            toast.success("Дом успешно удален");
            navigate("/houses");
        },
        onError: () => {
            toast.error("Ошибка при удалении дома");
        },
    });

    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить этот дом?")) {
            deleteHouseMutation.mutate();
        }
    };

    const handleUpdateSuccess = () => {
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["house", id] });
        toast.success("Дом успешно обновлен");
    };


    if (isLoading) {
        return <div className="container mx-auto py-8 text-center">Загрузка...</div>;
    }

    if (!house) {
        return <div className="container mx-auto py-8 text-center">Дом не найден</div>;
    }

    if (isEditing) {
        return (
            <div className="container mx-auto py-8">
                <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Вернуться
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle>Редактирование дома</CardTitle>
                        <CardDescription>Измените данные дома в форме ниже</CardDescription>
                    </CardHeader>
                    <HouseForm house={house} onSuccess={handleUpdateSuccess} />
                </Card>
            </div>
        );
    }

    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <Button variant="outline" onClick={() => navigate("/admin/projects")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> К списку домов
                </Button>
                <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(true)}>
                        Редактировать
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Main Info */}
                <div className="md:col-span-2">
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{house.title}</CardTitle>
                                    <CardDescription>
                                        {house.category_details.name} • {house.construction_technology_details.name}
                                    </CardDescription>
                                </div>
                                <div className="flex flex-col items-end">
                                    {house.discount_percentage ? (
                                        <>
                                          <span className="text-xl font-bold">
                                            {house.new_price} ₽
                                          </span>
                                            <span className="text-sm text-gray-500 line-through">
                                            {house.price} ₽
                                          </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-bold">
                                          {house.price} ₽
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {house.new && <Badge>Новинка</Badge>}
                                {house.best_seller && (
                                    <Badge variant="secondary">{house.best_seller}</Badge>
                                )}
                                {house.discount_percentage && (
                                    <Badge variant="destructive">Скидка {house.discount_percentage}%</Badge>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-2 gap-y-4 mb-6">
                                <div>
                                    <div className="text-sm text-gray-500">Площадь</div>
                                    <div className="font-medium">{house.area} м²</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Этажей</div>
                                    <div className="font-medium">{house.floors}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Комнат</div>
                                    <div className="font-medium">{house.rooms}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Спален</div>
                                    <div className="font-medium">{house.bedrooms}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Жилая площадь</div>
                                    <div className="font-medium">{house.living_area} м²</div>
                                </div>
                                {house.kitchen_area && (
                                    <div>
                                        <div className="text-sm text-gray-500">Площадь кухни</div>
                                        <div className="font-medium">{house.kitchen_area} м²</div>
                                    </div>
                                )}
                                {house.bathrooms && (
                                    <div>
                                        <div className="text-sm text-gray-500">Санузлов</div>
                                        <div className="font-medium">{house.bathrooms}</div>
                                    </div>
                                )}
                                {house.garage && (
                                    <div>
                                        <div className="text-sm text-gray-500">Гараж</div>
                                        <div className="font-medium">{house.garage} машин</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm text-gray-500">Назначение</div>
                                    <div className="font-medium">{house.purpose}</div>
                                </div>
                                {house.warranty && (
                                    <div>
                                        <div className="text-sm text-gray-500">Гарантия</div>
                                        <div className="font-medium">{house.warranty} лет</div>
                                    </div>
                                )}
                                {house.construction_time && (
                                    <div>
                                        <div className="text-sm text-gray-500">Срок строительства</div>
                                        <div className="font-medium">{house.construction_time} дней</div>
                                    </div>
                                )}
                            </div>

                            {house.description && (
                                <div>
                                    <h3 className="font-medium mb-2">Описание</h3>
                                    <p className="text-gray-700">{house.description}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Изображения и документы</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="all">
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Все фото
                                    </TabsTrigger>
                                    <TabsTrigger value="interior">
                                        <Home className="h-4 w-4 mr-2" />
                                        Интерьер
                                    </TabsTrigger>
                                    <TabsTrigger value="facade">
                                        <Building className="h-4 w-4 mr-2" />
                                        Фасад
                                    </TabsTrigger>
                                    <TabsTrigger value="layout">
                                        <Grid3X3 className="h-4 w-4 mr-2" />
                                        Планировка
                                    </TabsTrigger>
                                    <TabsTrigger value="docs">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Документы
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="mt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {house.images.map((img) => (
                                            <div key={img.id} className="relative aspect-video overflow-hidden rounded-md border">
                                                <img src={`${config.API_URL}${img.image}`} alt="" className="object-cover w-full h-full" />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="interior" className="mt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {house.interior_images.length > 0 ? (
                                            house.interior_images.map((img) => (
                                                <div key={img.id} className="relative aspect-video overflow-hidden rounded-md border">
                                                    <img src={`${config.API_URL}${img.image}`} alt="" className="object-cover w-full h-full" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-3 text-center py-8 text-gray-500">
                                                Нет фотографий интерьера
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="facade" className="mt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {house.facade_images.length > 0 ? (
                                            house.facade_images.map((img) => (
                                                <div key={img.id} className="relative aspect-video overflow-hidden rounded-md border">
                                                    <img src={`${config.API_URL}${img.image}`} alt="" className="object-cover w-full h-full" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-3 text-center py-8 text-gray-500">
                                                Нет фотографий фасада
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="layout" className="mt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {house.layout_images.length > 0 ? (
                                            house.layout_images.map((img) => (
                                                <div key={img.id} className="relative aspect-video overflow-hidden rounded-md border">
                                                    <img src={`${config.API_URL}${img.image}`} alt="" className="object-cover w-full h-full" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-3 text-center py-8 text-gray-500">
                                                Нет планов планировки
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="docs" className="mt-0">
                                    {house.documents.length > 0 ? (
                                        <div className="space-y-2">
                                            {house.documents.map((doc) => (
                                                <div
                                                    key={doc.id}
                                                    className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                                                >
                                                    <div className="flex items-center">
                                                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                                                        <div>
                                                            <div className="font-medium">{doc.title}</div>
                                                            <div className="text-xs text-gray-500">{doc.size} MB</div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        <a href={`${config.API_URL}${doc.file}`}>
                                                            Скачать
                                                        </a>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            Нет документов
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Варианты отделки</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {house.finishing_options_details.length > 0 ? (
                                <div className="space-y-4">
                                    {house.finishing_options_details.map((option) => (
                                        <div key={option.id} className="border rounded-md overflow-hidden">
                                            {option.image && (
                                                <img
                                                    src={`${config.API_URL}${option.image}`}
                                                    alt={option.title}
                                                    className="w-full h-64 object-cover"
                                                />
                                            )}
                                            <div className="p-3">
                                                <h4 className="font-medium">{option.title}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                                {option.price_per_sqm && (
                                                    <div className="text-sm font-semibold mt-2">
                                                        {option.price_per_sqm} ₽ за м²
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    Нет вариантов отделки
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default AdminProjectDetail;
