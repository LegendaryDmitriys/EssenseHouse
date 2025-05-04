import { CheckCircle2, Download, FileImage, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Review, ReviewFile } from "@/types/review.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {Button} from "@/components/ui/button.tsx";
import {formatDate} from "@/lib/utils.ts";

interface UserReviewsDetailsProps {
    review: Review;
    onStatusChange: (id: number, status: Review["status"]) => void;
    onDelete: (id: number) => void;
}

const UserReviewsDetails = ({ review, onStatusChange, onDelete }: UserReviewsDetailsProps) => {
    const getProgressValue = (status: Review["status"]) => {
        switch (status) {
            case "pending":
                return 33;
            case "published":
                return 100;
            case "rejected":
                return 100;
            default:
                return 0;
        }
    };

    const renderStatusBadge = (status: Review["status"]) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Ожидает публикации
                    </Badge>
                );
            case "published":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Опубликован
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Отклонено
                    </Badge>
                );
        }
    };

    const handleFileDownload = (fileUrl: string, fileName: string) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileView = (fileUrl: string, fileType: string) => {
        if (fileType === "image") {
            window.open(fileUrl, "_blank");
        } else {
            const fileName = fileUrl.split("/").pop() || "file";
            handleFileDownload(fileUrl, fileName);
        }
    };

    const renderReviewFiles = (files: ReviewFile[]) => {
        if (!files || files.length === 0) return null;
        return (
            <div>
                <h3 className="font-medium mb-2 text-sm text-gray-500">Прикрепленные файлы</h3>
                <div className="grid grid-cols-2 gap-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="relative bg-gray-50 rounded-md overflow-hidden border border-gray-200"
                        >
                            {file.file_type === "image" ? (
                                <div className="relative">
                                    <img
                                        src={file.file}
                                        alt={file.file_name}
                                        className="w-full h-32 object-cover cursor-pointer"
                                        onClick={() => handleFileView(file.file, file.file_type)}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFileDownload(file.file, file.file_name);
                                        }}
                                        className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        <Download className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                            ) : (
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FileImage className="h-8 w-8 text-gray-500" />
                                        <span className="ml-2 text-sm text-gray-600">{file.file_name}</span>
                                    </div>
                                    <button
                                        onClick={() => handleFileDownload(file.file, file.file_name)}
                                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Download className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                                {file.file_size} MB
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">Детали отзыва</h2>
                {renderStatusBadge(review.status)}
            </div>
            <Progress
                value={getProgressValue(review.status)}
                className="h-2 mt-2"
            />
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-medium mb-2 text-sm text-gray-500">Информация</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <div className="font-semibold">{review.name}</div>
                            <div className="text-sm text-gray-500 mt-1">
                                Дата: {formatDate(review.date)}
                            </div>
                            <div className="text-sm text-gray-500">
                                Оценка: {review.rating} / 5
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium mb-2 text-sm text-gray-500">Текст отзыва</h3>
                    <div className="p-3 bg-gray-50 rounded-md text-gray-800 text-sm">
                        {review.review}
                    </div>
                </div>
                {renderReviewFiles(review.files)}
                {review.status === "pending" && (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => onStatusChange(review.id, "published")}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Опубликовать
                        </Button>
                        <Button
                            onClick={() => onStatusChange(review.id, "rejected")}
                            variant="destructive"
                            className="flex-1"
                        >
                            <XCircle className="h-4 w-4 mr-1" />
                            Отклонить
                        </Button>
                    </div>
                )}
                {(review.status === "published" || review.status === "rejected") && (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => onStatusChange(review.id, "pending")}
                            variant="outline"
                            className="flex-1"
                        >
                            Вернуть в ожидание
                        </Button>
                        <Button
                            onClick={() => onDelete(review.id)}
                            variant="destructive"
                            className="flex-1"
                        >
                            Удалить
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReviewsDetails;