import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import config from "@/api/api.ts";
import {House, PurchasedHouse} from "@/types/house.ts";


const ReadyHouses = () => {
    const [readyHouses, setReadyHouses] = useState<PurchasedHouse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedHouse, setSelectedHouse] = useState<PurchasedHouse | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6173]);
    const [mapZoom, setMapZoom] = useState(5);



    useEffect(() => {
        const fetchReadyHouses = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${config.API_URL}purchase/?construction_status=completed`);
                if (!response.ok){
                    throw new Error(`HTTP ошибка, Статус: ${response.status}`);
                }
                const result =  await response.json();
                console.log(result)
                setReadyHouses(result);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            }
            finally {
                setLoading(false);
            }
        }

        fetchReadyHouses()
    }, []);






    const handleSelectHouse = (readyHouses: PurchasedHouse) => {
        setSelectedHouse(readyHouses);
        setMapCenter([readyHouses.latitude, readyHouses.longitude]);
        setMapZoom(12);
    };

    return (
        <div className="min-h-screen bg-background">
            <section className="relative py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-white/0 -z-10"></div>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm mb-5">
                          Наши проекты
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-secondary mb-6 tracking-tight">
                            Готовые дома
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
                            Исследуйте карту с реальными проектами, которые мы построили для наших клиентов
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="md:col-span-1 space-y-6"
                        >
                            <h2 className="text-2xl font-heading font-semibold mb-6">Выберите проект</h2>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {readyHouses.map((house) => (
                                    <Card
                                        key={house.id}
                                        className={`hover:shadow-essence transition-all duration-300 cursor-pointer ${
                                            selectedHouse?.id === house.id ? 'border-primary shadow-essence' : ''
                                        }`}
                                        onClick={() => handleSelectHouse(house)}
                                    >
                                        <CardContent className="p-0">
                                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                                                <img
                                                    src={`${config.API_URL}${house.house.images[0].image}`}
                                                    alt={house.house.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />

                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold line-clamp-1">{house.house.title}</h3>
                                                <div className="flex items-center text-sm text-muted-foreground mt-2">
                                                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                                                    <span className="line-clamp-1">{house.address}</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-2 text-sm">
                                                    <div className="flex items-center">
                                                        <Home className="w-4 h-4 mr-1 text-primary" />
                                                        <span>{house.house.area} м²</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1 text-primary" />
                                                        <span>{house.completed_date} г.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="md:col-span-2 relative"
                        >
                            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-essence-lg">
                                <YMaps>
                                    <Map
                                        defaultState={{
                                            center: mapCenter,
                                            zoom: mapZoom,
                                            controls: []
                                        }}
                                        state={{
                                            center: mapCenter,
                                            zoom: mapZoom
                                        }}
                                        width="100%"
                                        height="100%"
                                        options={{
                                            suppressMapOpenBlock: true
                                        }}
                                    >
                                        <ZoomControl options={{ position: { right: 10, top: 10 } }} />
                                        {readyHouses.map((house) => (
                                            <Placemark
                                                key={house.id}
                                                geometry={[house.latitude, house.longitude]}
                                                properties={{
                                                    balloonContentHeader: house.house.title,
                                                    balloonContentBody: house.address,
                                                    hintContent: house.house.title
                                                }}
                                                options={{
                                                    preset: selectedHouse?.id === house.id
                                                        ? 'islands#redHomeIcon'
                                                        : 'islands#blueHomeIcon',
                                                    iconColor: selectedHouse?.id === house.id ? '#ef4444' : '#3b82f6'
                                                }}
                                                onClick={() => handleSelectHouse(house)}
                                            />
                                        ))}
                                    </Map>
                                </YMaps>
                            </div>

                            {selectedHouse && (
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg z-20">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                            <img
                                                src={`${config.API_URL}${selectedHouse.house.images[0].image}`}
                                                alt={selectedHouse.house.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{selectedHouse.house.title}</h3>
                                            <p className="text-sm text-muted-foreground">{selectedHouse.address}</p>
                                            <div className="flex items-center mt-1 text-xs space-x-4">
                                                <div className="flex items-center">
                                                    <Home className="w-3 h-3 mr-1 text-primary" />
                                                    <span>{selectedHouse.house.area} м²</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1 text-primary" />
                                                    <span>{selectedHouse.completed_date} г.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={`/projects/${selectedHouse.id}`} className="flex items-center text-primary hover:underline text-sm">
                                            Подробнее <ArrowRight className="ml-1 w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReadyHouses;
