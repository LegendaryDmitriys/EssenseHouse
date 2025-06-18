
import { motion } from "framer-motion";
import { CalendarDays, Trophy, Home, Award, Users, Hammer, Sparkles, Phone, Target, Heart, Briefcase, CheckCircle } from "lucide-react";
import CompanyHistory from "@/components/home/CompanyHistory";
import TeamSection from "@/components/home/TeamSection";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/home/ContactForm.tsx";
import React, {useState} from "react";

const values = [
    {
        icon: Heart,
        title: "Клиентоориентированность",
        description: "Мы ставим интересы и потребности наших клиентов на первое место. Каждый проект разрабатывается с учетом индивидуальных пожеланий заказчика."
    },
    {
        icon: Target,
        title: "Качество",
        description: "Используем только проверенные материалы и современные технологии строительства. Каждый этап работ проходит строгий контроль качества."
    },
    {
        icon: CheckCircle,
        title: "Ответственность",
        description: "Мы несем полную ответственность за каждый построенный объект и предоставляем гарантию на все виды выполненных работ."
    },
    {
        icon: Briefcase,
        title: "Профессионализм",
        description: "Наша команда состоит из опытных специалистов с многолетним стажем работы в строительстве и проектировании."
    }
];

const advantages = [
    {
        title: "Собственное производство",
        description: "Мы контролируем качество на всех этапах производства и строительства, что позволяет нам предлагать лучшие цены без посредников."
    },
    {
        title: "Комплексный подход",
        description: "От проектирования до финальной отделки - мы берем на себя все заботы по строительству вашего дома."
    },
    {
        title: "Гибкие условия оплаты",
        description: "Предлагаем различные варианты оплаты и помощь в получении ипотеки от банков-партнеров."
    },
    {
        title: "Строгое соблюдение сроков",
        description: "Работаем по четкому графику и сдаем объекты точно в срок, прописанный в договоре."
    }
];

const About = () => {
    const [isContactVisible, setIsContactVisible] = useState(false);
    return (
        <div className="min-h-screen">
            <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                        filter: "brightness(0.3)"
                    }}
                />
                <div className="container relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        О нашей компании
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl md:text-2xl max-w-3xl mx-auto"
                    >
                        Более 13 лет создаем качественные дома, в которых хочется жить
                    </motion.p>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-6">Наши ценности</h2>
                        <p className="text-lg text-muted-foreground">
                            Основные принципы, которыми мы руководствуемся в работе каждый день
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6 bg-card rounded-lg shadow-lg"
                            >
                                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-6">Наши преимущества</h2>
                        <p className="text-lg text-muted-foreground">
                            Почему клиенты выбирают именно нас
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {advantages.map((advantage, index) => (
                            <motion.div
                                key={advantage.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-card p-8 rounded-lg shadow-lg"
                            >
                                <h3 className="text-2xl font-semibold mb-4">{advantage.title}</h3>
                                <p className="text-muted-foreground">{advantage.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CompanyHistory />

            <TeamSection />

            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold mb-6">Готовы обсудить ваш проект?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Наши специалисты готовы ответить на все ваши вопросы и помочь воплотить мечту о собственном доме в реальность
                        </p>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-primary hover:text-primary"
                            onClick={() => setIsContactVisible(true)}
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Связаться с нами
                        </Button>
                    </motion.div>
                </div>
            </section>

            {isContactVisible && (
                <ContactForm onIsContactVisible={setIsContactVisible} />
            )}
        </div>
    );
};

export default About;