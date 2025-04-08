import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://192.168.0.103:8000/blogs/${id}`);
                if (!response.ok) {
                    throw new Error(`Ошибка при загрузке статьи`);
                }
                const result = await response.json();
                setPost(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link to="/blog">
                            <Button variant="outline" className="mb-8">
                                <ArrowLeft className="mr-2" />
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
                        <div className="prose prose-lg max-w-none">
                            <p className="text-muted-foreground">{post.description}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h2>Основные моменты</h2>
                            <ul>
                                <li>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur
                                </li>
                                <li>
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum
                                </li>
                                <li>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudantium
                                </li>
                            </ul>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt.
                            </p>
                            <blockquote>
                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                consectetur, adipisci velit, sed quia non numquam eius modi tempora
                                incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </blockquote>
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                blanditiis praesentium voluptatum deleniti atque corrupti quos
                                dolores et quas molestias excepturi sint occaecati cupiditate non
                                provident.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;