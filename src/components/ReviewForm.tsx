import React, {useEffect, useState} from "react";
import { Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import config from "@/api/api.ts";
import {Review} from "@/types/review.ts";
import {useAuth} from "@/context/AuthContext.tsx";



interface ReviewFormProps {
    onSubmit: (review: Review) => void;
    onCancel: () => void;
}

const ReviewForm = ({ onSubmit, onCancel }: ReviewFormProps) => {
    const { user } = useAuth();

    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name ?? "");
            setLastName(user.last_name ?? "");
            setEmail(user.email ?? "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;


        if (!firstName || !lastName || !email || !review) {
            toast.error("Пожалуйста, заполните все обязательные поля");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("review", review);
        formData.append("rating", String(rating));

        if (files) {
            Array.from(files).forEach((file) => {
                formData.append("uploaded_files", file);
            });
        }


        try {
            const response = await fetch(`${config.API_URL}reviews/`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Ошибка при отправке отзыва");
            }

            toast.success("Спасибо за ваш отзыв!");


            setFirstName("");
            setLastName("");
            setEmail("");
            setReview("");
            setRating(0);
            setFiles(null);

            onSubmit(await response.json());
        } catch (error) {
            console.error(error);
            toast.error("Не удалось отправить отзыв");
        }finally {
            setIsSubmitting(false);
        }

        toast.success("Спасибо за ваш отзыв!");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).filter(
                (file, index, self) =>
                    index === self.findIndex((t) => t.name === file.name)
            );
            setFiles(newFiles);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Введите ваше имя"
                    disabled={!!user?.first_name}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Введите вашу фамилию"
                    disabled={!!user?.last_name}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Ваш email *</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите вашу почту"
                    disabled={!!user?.email}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Оценка</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                        >
                            <Star
                                className={`w-6 h-6 ${
                                    star <= rating ? "fill-primary text-primary" : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Ваш отзыв *</label>
                <Textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Поделитесь вашими впечатлениями"
                    required
                    className="min-h-[120px]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Прикрепить файлы</label>
                <div className="flex items-center gap-4">
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
                    >
                        <Upload className="w-4 h-4"/>
                        Выбрать файлы
                    </label>
                    {files && (
                        <span className="text-sm text-muted-foreground">
                            Выбрано файлов: {files.length}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Отмена
                </Button>
                <Button type="submit">
                    Отправить отзыв
                </Button>
            </div>
        </form>
    );
};

export default ReviewForm;