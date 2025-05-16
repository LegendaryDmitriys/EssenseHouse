import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import config from "@/api/api.ts";
import {PaginatedBlogs} from "@/types/blog.ts";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {cn} from "@/lib/utils.ts";
import {getPageNumberFromUrl} from "@/utils/getPageNumberFromUrl.ts";


const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<{
        count: number;
        next: string | null;
        previous: string | null;
    }>({ count: 0, next: null, previous: null });
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);


    const fetchBlogs = async (url?: string, category?: string) => {
        setLoading(true);
        try {
            let requestUrl = url || `${config.API_URL}blogs/`;

            if (category && !url) {
                const separator = requestUrl.includes('?');
                requestUrl = `${requestUrl}${separator}category=${category}`;
            }

            const response = await fetch(requestUrl);
            if (!response.ok) throw new Error("Ошибка загрузки блогов");

            const result: PaginatedBlogs = await response.json();

            setBlogs(result.results);
            setPagination({
                count: result.count,
                next: result.next,
                previous: result.previous,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBlogs();
    }, []);

    const categories = Array.from(new Set(blogs.map(post => post.category.name)));

    return (
        <div className="min-h-screen pb-16">
                <section className="relative h-[50vh] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                                mixBlendMode: "overlay"
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
                            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                                Блог EssenseHouse
                            </h1>
                            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90">
                                Актуальные статьи о строительстве, дизайне и обустройстве вашего идеального дома
                            </p>
                        </motion.div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="w-full max-w-2xl mx-auto mb-8 h-auto flex-wrap gap-2 bg-transparent text-center flex mt-6" >
                                <TabsTrigger
                                    value="all"
                                    onClick={() => {
                                        setCurrentCategory(null);
                                        fetchBlogs();
                                    }}
                                >
                                    Все статьи</TabsTrigger>
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        onClick={() => {
                                            setCurrentCategory(category);
                                            fetchBlogs(undefined, category);
                                        }}
                                    >
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="all" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {blogs.map((post, index) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </TabsContent>

                            {categories.map((category) => (
                                <TabsContent key={category} value={category} className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {blogs.map((post) => (
                                            <BlogCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                        {(pagination.next || pagination.previous) && (
                            <div className="mt-12">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => pagination.previous && fetchBlogs(pagination.previous)}
                                                className={cn(!pagination.previous && "pointer-events-none opacity-50")}
                                            />
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationLink isActive>
                                                {getPageNumberFromUrl(pagination.next || pagination.previous)}
                                            </PaginationLink>
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => pagination.next && fetchBlogs(pagination.next)}
                                                className={cn(!pagination.next && "pointer-events-none opacity-50")}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </div>
                </section>
        </div>
    );
};

export default Blog;