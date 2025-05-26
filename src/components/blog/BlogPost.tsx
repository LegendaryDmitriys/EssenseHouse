import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import config from "@/api/api.ts";
import {useQuery} from "@tanstack/react-query";

const BlogPost = () => {
    const { id } = useParams();

    const {data: post, isLoading, isError, error} = useQuery({
        queryKey: ["blog", id],
        queryFn: async () => {
            const response = await fetch(`${config.API_URL}blogs/${id}/`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке статьи');
            }
            return await response.json();
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })


    if (isError) {
        return <div>Ошибка: {error.message}</div>;
    }


    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <Button variant="outline" className="mb-8" disabled>
                                <ArrowLeft className="mr-2" />
                                Назад к списку статей
                            </Button>
                            <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
                                <Skeleton className="w-full h-full" />
                            </div>
                            <div className="flex items-center gap-4 text-sm mb-4">
                                <Skeleton className="h-4 w-24" />
                                <span>•</span>
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-12 w-3/4 mb-8" />
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-6 w-5/6" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-4/5" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if (!post) {
        return (
            <div className="container py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
                    <Link to="/blog">
                        <Button>
                            <ArrowLeft className="mr-2" />
                            Вернуться к списку статей
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="mb-8"
                    >
                        <Link to="/blog">
                            <Button variant="outline" className="mb-8">
                                <ArrowLeft className="mr-2"/>
                                Назад к списку статей
                            </Button>
                        </Link>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{post.category.name}</span>
                        </div>
                        <h1 className="text-4xl font-heading font-bold mb-8">{post.title}</h1>
                        <div className="prose [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-5">
                            <p className="text-muted-foreground">{post.description}</p>
                            <div dangerouslySetInnerHTML={{__html: post.content}}/>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;