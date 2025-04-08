import React from "react";

import {motion} from "framer-motion";
import {Button} from "@/components/ui/button.tsx";
import {Play} from "lucide-react";
import {toast} from "sonner";



const HowBuild = () => {

    function handleVideoClick() {
        return toast.info("Видео запускается")
    }
    return (
        <section className="py-20">
            <div className="container">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="font-heading text-4xl md:text-5xl mb-6">
                        Как мы строим ваш дом
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        От проекта до готового дома - каждый этап под нашим контролем
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">1. Проектирование</h3>
                            <p className="text-muted-foreground">
                                Создаем индивидуальный проект с учетом всех ваших пожеланий и особенностей участка.
                                Наши архитекторы помогут воплотить ваши идеи в реальность.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">2. Подготовка и фундамент</h3>
                            <p className="text-muted-foreground">
                                Проводим геологические исследования и подготавливаем участок.
                                Закладываем надежный фундамент - основу вашего будущего дома.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">3. Строительство</h3>
                            <p className="text-muted-foreground">
                                Используем современные технологии и материалы.
                                Строго соблюдаем технологию и контролируем качество на каждом этапе.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
                    >
                        <div className="absolute inset-0 bg-black/40 z-10"/>
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
                                onClick={handleVideoClick}
                            >
                                <Play className="w-6 h-6 mr-2"/>
                                Смотреть видео
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="text-center"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => toast.info("Подробная информация о процессе строительства")}
                    >
                        Узнать больше о процессе
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}


export default HowBuild