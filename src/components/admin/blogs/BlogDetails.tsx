import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Edit, Trash2, MoreVertical, Eye} from "lucide-react"
import {Link} from "react-router-dom";
import {formatDate} from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

const BlogDetails = ({ blog, onEdit, onDelete, onStatusChange }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)


    const renderContent = () => {
        try {
            if (typeof blog.content === "string") {
                return (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                );
            } else {
                return <div className="prose max-w-none">{String(blog.content)}</div>;
            }
        } catch (error) {
            return <div className="text-red-500">Ошибка отображения контента</div>;
        }
    };

    return (
        <Card>
            <CardHeader className="relative">
                <div className="absolute right-4 top-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(blog)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Удалить
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <Link to={`/blog/${blog.id}`}>
                                    Просмотр на сайте
                                </Link>
                            </DropdownMenuItem>
                            {blog.status === "pending" ? (
                                <DropdownMenuItem onClick={() => onStatusChange(blog.id, "published")}>Опубликовать</DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => onStatusChange(blog.id, "rejected")}>Отклонить</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <CardTitle>{blog.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <StatusBadge status={blog.status} context="blog"/>
                    <span>Категория: {blog.category.name}</span>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {blog.featured_image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <img src={blog.featured_image || "/placeholder.svg"} alt={blog.title}  className="object-cover" />
                    </div>
                )}

                <div className="text-sm text-muted-foreground">
                    <p>Создан: {formatDate(blog.date)}</p>
                </div>

                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-2">Содержание</h3>
                    <div className="prose [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-5">
                        {renderContent()}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => onEdit(blog)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Редактировать
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить
                </Button>
            </CardFooter>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                        <AlertDialogDescription>Это действие нельзя отменить. Блог будет удален навсегда.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                onDelete(blog.id)
                                setIsDeleteDialogOpen(false)
                            }}
                            className="bg-destructive text-destructive-foreground"
                        >
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}

export default BlogDetails