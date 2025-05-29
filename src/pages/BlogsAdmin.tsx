import React, { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import Layout from "@/components/admin/dashboard/Layout"
import BlogsTable from "@/components/admin/blogs/BlogsTable"
import BlogDetails from "@/components/admin/blogs/BlogDetails"
import BlogEditor from "@/components/admin/blogs/BlogEditor"
import config from "@/api/api"
import "react-quill/dist/quill.snow.css";
import {Blog} from "@/types/blog.ts";

const BlogsAdmin = () => {
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const queryClient = useQueryClient()


    const handleCreateNew = () => {
        setSelectedBlog(null)
        setIsEditing(false)
        setIsCreating(true)
    }

    const handleEdit = (blog) => {
        setIsEditing(true)
        setIsCreating(false)
    }

    const handleCancel = () => {
        if (isCreating) {
            setIsCreating(false)
        } else if (isEditing) {
            setIsEditing(false)
        }
    }

    const handleDelete = async (blogId) => {
        try {
            const response = await fetch(`${config.API_URL}blogs/${blogId}/`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })

            if (!response.ok) {
                throw new Error("Ошибка во время удаления блога")
            }

            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            setSelectedBlog(null)
            toast.success("Блог успешно удален")
        } catch (error) {
            toast.error("Ошибка при удалении блога")
        }
    }

    const handleStatusChange = async (blogId, newStatus) => {
        try {
            const formData = new FormData()
            formData.append("status", newStatus)

            const response = await fetch(`${config.API_URL}blogs/${blogId}/`, {
                method: "PUT",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })

            if (!response.ok) {
                throw new Error("Ошибка во время обновления статуса блога")
            }

            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            toast.success("Статус блога успешно обновлен")
        } catch (error) {
            toast.error("Ошибка при обновлении статуса блога")
        }
    }

    const handleSave = async (blogData: Blog) => {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        toast.success(isCreating ? "Блог успешно создан" : "Блог успешно обновлен");

        setIsCreating(false);
        setIsEditing(false);
        setSelectedBlog(blogData);
    };


    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Управление блогами</h1>
                    <button onClick={handleCreateNew} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                        Создать новый блог
                    </button>
                </div>

                <div className="flex gap-6">
                    <div className="w-1/2">
                        <BlogsTable onBlogSelect={setSelectedBlog} selectedBlogId={selectedBlog?.id} />
                    </div>
                    <div className="w-1/2">
                        {isCreating ? (
                            <BlogEditor onSave={handleSave} onCancel={handleCancel} />
                        ) : isEditing ? (
                            <BlogEditor blog={selectedBlog} onSave={handleSave} onCancel={handleCancel} />
                        ) : selectedBlog ? (
                            <BlogDetails
                                blog={selectedBlog}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusChange}
                            />
                        ) : (
                            <div className="bg-muted p-6 rounded-lg text-center">
                                <p>Выберите блог из списка или создайте новый</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default BlogsAdmin