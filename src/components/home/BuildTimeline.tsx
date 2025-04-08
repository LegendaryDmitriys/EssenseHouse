
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  {
    title: "Проектирование",
    description: "Разработка индивидуального проекта с учетом всех пожеланий",
    duration: "2-3 недели"
  },
  {
    title: "Фундамент",
    description: "Закладка прочного основания вашего будущего дома",
    duration: "3-4 недели"
  },
  {
    title: "Возведение стен",
    description: "Строительство несущих конструкций и перегородок",
    duration: "4-6 недель"
  },
  {
    title: "Кровля",
    description: "Монтаж кровли и водосточной системы",
    duration: "2-3 недели"
  },
  {
    title: "Отделка",
    description: "Внутренние и внешние отделочные работы",
    duration: "6-8 недель"
  },
];

const BuildTimeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            Этапы строительства
          </h2>
          <p className="text-lg text-muted-foreground">
            Полный цикл работ от проекта до готового дома
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-1 p-6">
                  <div className={`text-right ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <span className="text-sm font-medium text-primary">{step.duration}</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildTimeline;
