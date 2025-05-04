import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {House} from "@/types/house.ts";
import config from "@/api/api.ts";



const ProjectsShowcase = () => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState<House[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)



    useEffect(() => {
        const FetchHouses = async () => {
            try {
                const response = await fetch(`${config.API_URL}houses/?limit=3`)
                if (!response.ok){
                    throw new Error(`HTTP ошибка, Статус: ${response.status}`)
                }
                const result = await response.json();
                setHouses(result)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка")
            }
            finally {
                setLoading(false)
            }
        }
        FetchHouses();
    },[])

    console.log(houses)


    return (
        <section className="py-20 bg-gray-50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="font-heading text-4xl md:text-5xl mb-6">
                        Наши проекты
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Каждый дом, который мы строим, отражает индивидуальность своих владельцев и наши высокие стандарты качества
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {houses.map((house, index) => (
                        <motion.div
                            key={house.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={house.images && house.images.length > 0
                                            ? `${config.API_URL}${house.images[0].image}`
                                            : "/placeholder.svg?height=400&width=600"}
                                        alt={house.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl">{house.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-1">
                                        <Building2 className="w-4 h-4" />
                                        <span>{house.area} м² • {house.category_details.name}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{house.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full" onClick={() => navigate(`/projects/${house.id}`)}>
                                        Подробнее
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <Button
                        onClick={() => navigate("/projects")}
                        className="group bg-[#9b87f5] hover:bg-[#7E69AB]"
                    >
                        Смотреть все проекты
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;