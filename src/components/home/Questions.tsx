import { motion } from "framer-motion"
import { HelpCircle, MessageCircle, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import React, {useState} from "react";
import ContactForm from "@/components/home/ContactForm.tsx";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
}

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const Questions = () => {
    const [isContactVisible, setIsContactVisible] = useState(false);
    const faqItems = [
        {
            question: "Сколько времени займет строительство дома?",
            answer:
                "Сроки строительства зависят от сложности проекта и площади дома. В среднем, строительство занимает от 4 до 8 месяцев. На сроки также влияют сезон начала работ и выбранные материалы. Точные сроки мы определяем после согласования проекта.",
        },
        {
            question: "Какие документы нужны для начала строительства?",
            answer:
                "Основные документы: свидетельство о праве собственности на земельный участок, градостроительный план земельного участка (ГПЗУ), разрешение на строительство. Мы помогаем в подготовке и оформлении всей необходимой документации.",
        },
        {
            question: "Предоставляете ли вы гарантию на дом?",
            answer:
                "Да, мы предоставляем гарантию 5 лет на все выполненные работы и конструктивные элементы дома. В течение гарантийного срока мы устраняем все выявленные недостатки за свой счет.",
        },
        {
            question: "Можно ли вносить изменения в типовой проект?",
            answer:
                "Да, мы можем адаптировать любой типовой проект под ваши пожелания. Изменения могут касаться планировки, фасадов, материалов отделки и инженерных систем. Стоимость изменений рассчитывается индивидуально.",
        },
        {
            question: "Как формируется стоимость строительства?",
            answer:
                "Стоимость зависит от площади дома, выбранных материалов, сложности проекта и состава работ. В базовую стоимость входит: фундамент, стены, кровля, окна, двери и черновая отделка. Точный расчет мы делаем после согласования проекта и спецификаций.",
        },
        {
            question: "Выполняете ли вы отделочные работы?",
            answer:
                'Да, мы выполняем полный комплекс отделочных работ. Это может быть как черновая отделка, так и отделка "под ключ". Также мы помогаем с выбором материалов и разрабатываем дизайн-проект интерьера.',
        },
    ]

    return (
        <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center justify-center gap-3 mb-6 bg-primary/10 px-4 py-2 rounded-full">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary">Вопрос-ответ</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">Частые вопросы</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ответы на самые популярные вопросы о строительстве домов и нашем подходе к работе
                    </p>
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerChildren}
                    className="max-w-3xl mx-auto bg-card rounded-xl shadow-sm border p-1"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <AccordionItem
                                    value={`item-${index + 1}`}
                                    className={cn(
                                        "border-b last:border-0 px-4",
                                        "data-[state=open]:bg-muted/50 rounded-lg transition-all",
                                    )}
                                >
                                    <AccordionTrigger className="py-5 hover:no-underline">
                                        <div className="flex items-start text-left gap-3">
                                            <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5 flex-shrink-0">
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                            <span className="text-lg font-medium">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-10 pr-4 pb-5 text-muted-foreground">{item.answer}</AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mt-16"
                >
                    <div className="bg-card border shadow-sm rounded-xl p-8 max-w-xl mx-auto">
                        <div className="inline-flex items-center justify-center mb-4 bg-primary/10 p-3 rounded-full">
                            <MessageCircle className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Не нашли ответ на свой вопрос?</h3>
                        <p className="text-muted-foreground mb-6">
                            Свяжитесь с нами, и наши специалисты проконсультируют вас по любым вопросам строительства
                        </p>
                        <Button
                            size="lg"
                            className="rounded-full px-8 font-medium"
                            onClick={() => setIsContactVisible(true)}
                        >
                            Задать вопрос
                        </Button>
                    </div>
                </motion.div>
            </div>
            {isContactVisible && (
                <ContactForm onIsContactVisible={setIsContactVisible} />
            )}
        </section>
    )
}

export default Questions

