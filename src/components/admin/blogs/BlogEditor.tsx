import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, X, Upload } from "lucide-react"
import config from "@/api/api"
import ReactQuill from "react-quill";
import {toast} from "sonner";
import {Blog} from "@/types/blog.ts";
import {formats, modules} from "@/components/Toolbar.ts";

interface BlogEditorProps {
    blog?: Blog;
    onSave: (blogData: Blog) => Promise<void>;
    onCancel: () => void;
}

const BlogEditor = ({ blog, onSave, onCancel }: BlogEditorProps) => {
    const isEditing = !!blog

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category_id: "",
        status: "pending",
        description: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null)

    const { data: categories } = useQuery({
        queryKey: ["blog-categories"],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}blogs/categories/`)
            if (!response.ok) {
                throw new Error("Не удалось загрузить категории")
            }
            return response.json()
        },
    })



    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || "",
                content: blog.content || "",
                category_id: blog.category?.id?.toString() || "",
                status: blog.status || "pending",
                description: blog.description || "",
                image: null,
            });
            if (blog.image) {
                setImagePreview(blog.image);
            }
        }
        console.log(blog)
    }, [blog]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleContentChange = (content) => {
        setFormData((prev) => ({ ...prev, content }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({ ...prev, image: null }));
            setImagePreview(null);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.image === null && !isEditing) {
            toast.error("Пожалуйста, загрузите изображение");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("category_id", formData.category_id);
        formDataToSend.append("status", formData.status);
        formDataToSend.append("description", formData.description);

        if (formData.image instanceof File) {
            formDataToSend.append("image", formData.image);
        }


        const url = isEditing
            ? `${config.API_URL}blogs/${blog.id}/`
            : `${config.API_URL}blogs/`;

        try {
            const response = await fetch(url, {
                method: isEditing ? "PATCH" : "POST",
                body: formDataToSend,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });

            if (!response.ok) {
                throw new Error("Не удалось сохранить блог");
            }

            const savedBlog = await response.json();
            onSave(savedBlog);
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };



    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Card>
                <CardHeader>
                    <CardTitle>{isEditing ? "Редактирование блога" : "Создание нового блога"}</CardTitle>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="content">
                        <TabsList className="mb-4">
                            <TabsTrigger value="content">Содержание</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="space-y-4">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Заголовок</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category">Категория</Label>
                                    <Select
                                        value={formData.category_id}
                                        onValueChange={(value) => handleSelectChange("category_id", value)}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Выберите категорию" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>


                                { isEditing && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Статус</Label>
                                        <Select value={formData.status}
                                                onValueChange={(value) => handleSelectChange("status", value)}>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Выберите статус"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">В ожидании</SelectItem>
                                                <SelectItem value="rejected">Отказано</SelectItem>
                                                <SelectItem value="published">Опубликован</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}


                                <div className="grid gap-2 max-h-[700px]">
                                    <Label htmlFor="description">Краткое описание</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="resize-none max-h-[700px] overflow-y-auto"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Изображение</Label>
                                    <div className="flex flex-col gap-2">
                                        {imagePreview && (
                                            <div className="relative h-40 w-full overflow-hidden rounded-md">
                                                <img
                                                    src={imagePreview || "/placeholder.svg"}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => document.getElementById("image").click()}
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                {imagePreview ? "Изменить изображение" : "Загрузить изображение"}
                                            </Button>
                                            <Input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="content">Содержание</Label>
                                    <div className="min-h-[100px] border rounded-md">
                                        <ReactQuill
                                            value={formData.content}
                                            onChange={(content) => handleContentChange(content)}
                                            modules={modules}
                                            placeholder="Введите содержимое блога..."
                                            formats={formats}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        <X className="mr-2 h-4 w-4" />
                        Отмена
                    </Button>
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? "Сохранить изменения" : "Создать блог"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default BlogEditor