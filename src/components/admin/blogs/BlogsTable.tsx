import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Search, Loader2} from "lucide-react"
import config from "@/api/api"
import { PaginatedBlogs } from "@/types/blog.ts";
import {formatDate} from "@/lib/utils.ts";
import StatusBadge from "@/components/StatusBadge.tsx";

const BlogsTable = ({ onBlogSelect, selectedBlogId }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")

    const { data: paginatedBlogs, isLoading } = useQuery<PaginatedBlogs>({
        queryKey: ["blogs"],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}blogs/`)
            if (!response.ok) {
                throw new Error("Не удалось загрузить блоги")
            }
            return response.json()
        },
    })

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

    const blogs = paginatedBlogs?.results || []

    const filteredBlogs = blogs?.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter ? blog.category.id === Number.parseInt(categoryFilter) : true
        return matchesSearch && matchesCategory
    })


    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Поиск блогов..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Все категории" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Заголовок</TableHead>
                                <TableHead>Категория</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Дата публикации</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBlogs?.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <TableRow
                                        key={blog.id}
                                        className={`cursor-pointer ${blog.id === selectedBlogId ? "bg-muted" : ""}`}
                                        onClick={() => onBlogSelect(blog)}
                                    >
                                        <TableCell className="font-medium">{blog.title}</TableCell>
                                        <TableCell>{blog.category.name}</TableCell>
                                        <TableCell><StatusBadge status={blog.status} context="blog"/></TableCell>
                                        <TableCell>{formatDate(blog.date)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6">
                                        Блоги не найдены
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default BlogsTable