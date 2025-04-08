import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard, { BlogPost } from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import config from "@/api/api.ts";


const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${config.API_URL}blogs/`)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const result = await response.json();
                setBlogs(result)
            }
            catch (err){
                setError(err instanceof Error ? err.message : "Неизвестная ошибка")

            }
            finally {
                setLoading(false)
            }
        }
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
                                <TabsTrigger value="all">Все статьи</TabsTrigger>
                                {categories.map((category) => (
                                    <TabsTrigger key={category} value={category}>
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="all" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {blogs.map((post, index) => (
                                        <motion.div
                                            key={post.id}
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: index * 0.1}}
                                        >
                                            <BlogCard post={post}/>
                                        </motion.div>
                                    ))}
                                </div>
                            </TabsContent>

                            {categories.map((category) => (
                                <TabsContent key={category} value={category} className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                        {blogs
                                            .filter((post) => post.category.name === category)
                                            .map((post, index) => (
                                                <motion.div
                                                    key={post.id}
                                                    initial={{opacity: 0, y: 20}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: index * 0.1}}
                                                >
                                                    <BlogCard post={post}/>
                                                </motion.div>
                                            ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
            </div>
);
};

export default Blog;