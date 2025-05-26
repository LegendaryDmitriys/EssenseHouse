import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import {Link} from "react-router-dom";

const  AdvantagesSection = ()=> {

    const advantages = [
        {
            number: "01",
            title: "Строим от фундамента до ключа. Без головной боли.",
            description:
                "Полный комплекс работ без привлечения субподрядчиков. Вам не придется искать разных специалистов и координировать их работу.",
        },
        {
            number: "02",
            title: "Дом, который не требует ремонта через год",
            description:
                "5 лет гарантии на все строительные работы. Мы используем только сертифицированные материалы от проверенных поставщиков.",
        },
        {
            number: "03",
            title: "Въезжаете в новый дом точно в срок. Без исключений.",
            description:
                "Соблюдаем график строительства без задержек. Перед началом работ составляем детальный план-график с учетом всех факторов.",
        },
    ]

    return (
        <section className="bg-white text-black py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
                        СТРОИМ ТАК, ЧТО СОСЕДИ БУДУТ ЗАВИДОВАТЬ
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-16">
                    {advantages.map((advantage, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <div className="text-sm text-gray-400 mb-6">{advantage.number}—</div>
                            <h3 className="text-xl font-medium mb-4">{advantage.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 border-t border-gray-200 pt-12">
                    <Link
                        to="/about"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors group"
                    >
                        ПОДРОБНЕЕ О НАС
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
};

export default AdvantagesSection
