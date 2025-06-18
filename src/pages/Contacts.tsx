
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Building2, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const contactInfo = [
    {
        icon: Building2,
        title: "Главный офис",
        content: "г. Великий Новгород, ул. Германа, д. 1, офис 1",
    },
    {
        icon: Phone,
        title: "Телефон",
        content: "+7 (999) 123-45-67",
    },
    {
        icon: Mail,
        title: "Email",
        content: "info@essensehouse.com",
    },
    {
        icon: Clock,
        title: "Режим работы",
        content: "Пн-Пт: 9:00 - 18:00\nСб-Вс: выходной",
    },
    {
        icon: Car,
        title: "Как добраться",
        content: "15 минут от жд. вокзала\nБесплатная парковка для клиентов",
    }
];

const Contacts = () => {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Сообщение отправлено",
            description: "Мы свяжемся с вами в ближайшее время",
        });
    };

    return (
        <div className="min-h-screen">
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
                            Контакты
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90">
                            Мы всегда на связи и готовы ответить на ваши вопросы
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 -mt-16 relative z-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
                                                <info.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                                                <p className="text-muted-foreground whitespace-pre-line">
                                                    {info.content}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Как нас найти</h2>
                        <p className="text-muted-foreground text-lg">
                            Мы находимся в самом центре Великого Новгорода, рядом с торговым домом "Русь"
                        </p>
                    </motion.div>
                    <div className="bg-card rounded-xl shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d7004.887645095283!2d31.263963806374125!3d58.535510306541454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d58.53619783275412!2d31.265984698435425!5e0!3m2!1sru!2sru!4v1740052524511!5m2!1sru!2sru"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacts;