import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {BlogPost} from "@/types/blog.ts";


interface BlogCardProps {
    post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>
            <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-sm">{post.category.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.description}
                </p>
                <Link to={`/blog/${post.id}`}>
                    <Button variant="outline" className="group/button">
                        Читать далее
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default BlogCard;