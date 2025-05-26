import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BlogCard from "@/components/blog/BlogCard"
import { motion } from "framer-motion"
import React, { useState } from "react"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination.tsx"
import { cn } from "@/lib/utils.ts"
import { getPageNumberFromUrl } from "@/utils/getPageNumberFromUrl.ts"
import config from "@/api/api.ts"
import { useQuery } from "@tanstack/react-query"
import {Newspaper} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

const Blog = () => {
    const [currentCategory, setCurrentCategory] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const getBlogsUrl = () => {
        const params = new URLSearchParams()
        if (currentCategory) params.append("category", currentCategory)
        if (currentPage) params.append("page", currentPage.toString())
        return `${config.API_URL}blogs/?${params.toString()}`
    }

    const { data: blogsData = { results: [], count: 0, next: null, previous: null }, isLoading: blogsLoading, error: blogsError } = useQuery({
        queryKey: ["blogs", currentCategory, currentPage],
        queryFn: async () => {
            const response = await fetch(getBlogsUrl())
            if (!response.ok) {
                throw new Error(`HTTP ошибка, Статус: ${response.status}`)
            }
            return await response.json()
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

    const {data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
        queryKey: ["blog-categories"],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}blogs/categories/`)
            if (!response.ok) throw new Error("Ошибка загрузки категорий")
            return await response.json()
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

    const handleNextPage = () => {
        if (blogsData.next) {
            const nextPage = getPageNumberFromUrl(blogsData.next) || currentPage + 1
            setCurrentPage(nextPage)
        }
    }

    const handlePrevPage = () => {
        if (blogsData.previous) {
            const prevPage = getPageNumberFromUrl(blogsData.previous) || currentPage - 1
            setCurrentPage(prevPage)
        }
    }

    return (
        <div className="min-h-screen pb-16">
            <section className="relative h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80 ')",
                            mixBlendMode: "overlay",
                        }}
                    />
                </div>
                <div className="container relative z-10 h-full flex flex-col justify-center items-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">Блог EssenseHouse</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90">
                            Актуальные статьи о строительстве, дизайне и обустройстве вашего идеального дома
                        </p>
                    </motion.div>
                </div>
            </section>

            <section>
                <div className="container">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="w-full max-w-2xl mx-auto mb-8 h-auto flex-wrap gap-2 bg-transparent text-center flex mt-6">
                            <TabsTrigger
                                value="all"
                                onClick={() => {
                                    setCurrentCategory(null)
                                    setCurrentPage(1)
                                }}
                            >
                                Все статьи
                            </TabsTrigger>
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.name}
                                    onClick={() => {
                                        setCurrentCategory(category.name);
                                        setCurrentPage(1)
                                    }}
                                >
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="all" className="mt-6">
                            {blogsLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                                </div>
                            ) : blogsData.results.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {blogsData.results.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <Newspaper className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                                    <h3 className="text-xl font-medium text-zinc-700 mb-2">Статьи не найдены</h3>
                                    <p className="text-zinc-500 mb-6">В этой категории пока нет статей</p>
                                </div>
                            )}
                        </TabsContent>

                        {categories.map((category) => (
                            <TabsContent key={category.id} value={category.name} className="mt-6">
                                {blogsData.results.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {blogsData.results.map((post) => (
                                            <BlogCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20">
                                        <Newspaper className="w-12 h-12 mx-auto text-zinc-300 mb-4"/>
                                        <h3 className="text-xl font-medium text-zinc-700 mb-2">Статьи не найдены</h3>
                                        <p className="text-zinc-500 mb-6">В этой категории пока нет статей</p>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>

                    {(blogsData.next || blogsData.previous) && (
                        <div className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                    <PaginationPrevious
                                            onClick={handlePrevPage}
                                            className={cn(!blogsData.previous && "pointer-events-none opacity-50")}
                                        />
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink isActive>{currentPage}</PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={handleNextPage}
                                            className={cn(!blogsData.next && "pointer-events-none opacity-50")}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Blog