import {motion} from "framer-motion";
import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Quote, Star} from "lucide-react";
import {Link} from "react-router-dom";
import {id} from "date-fns/locale";
import config from "@/api/api.ts";
import { CircleUser } from 'lucide-react';

const TestimonialsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState<string | null>()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try
            {
               const response = await fetch(`${config.API_URL}reviews/`);
               if (!response.ok){
                   throw new Error(`Http error! Status: ${response.status}`);
               }
               const result = await response.json();
               setReviews(result.slice(0, 3));
            }
            catch (err){
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            }
            finally {
                setLoading(false);
            }
        }

        fetchReviews()
    },[])

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-accent/20 to-background">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-up" style={{ animationDelay: "100ms" }}>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-secondary mb-4">
                        Отзывы наших клиентов
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Что говорят о нас те, кто уже живет в построенных нами домах
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <p className="mt-4 text-muted-foreground">Загрузка отзывов...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-destructive">{error}</p>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="mt-4"
                        >
                            Попробовать снова
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {reviews.map((review, index) => (
                            <div
                                key={review.id || index}
                                className="animate-fade-up"
                                style={{ animationDelay: `${(index + 1) * 150}ms` }}
                            >
                                <Card className="h-full border-accent/20 shadow-essence transition-all duration-300 hover:shadow-essence-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                                <div className="w-full h-full object-cover">
                                                    <CircleUser width={45} height={45} />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-secondary">{review.name}</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                                                />
                                            ))}
                                        </div>
                                        <Quote className="w-8 h-8 text-accent mb-3" />
                                        <p className="text-muted-foreground leading-relaxed">
                                            {review.review}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: "500ms" }}>
                    <Button className="bg-primary text-white hover:bg-primary/90 shadow-essence hover:shadow-essence-lg transition-all duration-300">
                        <Link to="/comments" className="flex items-center">
                            Смотреть все отзывы
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;