import { motion } from "framer-motion"
import { Check, Clock, ArrowRight, Hammer, Home, Palette } from "lucide-react"

const steps = [
  {
    title: "Проектирование",
    description: "Разработка индивидуального проекта",
    duration: "2-3 недели",
    stepNumber: 1,
    icon: Palette,
  },
  {
    title: "Фундамент",
    description: "Закладка прочного основания вашего будущего дома",
    duration: "3-4 недели",
    stepNumber: 2,
    icon: Hammer,
  },
  {
    title: "Возведение стен",
    description: "Строительство несущих конструкций и перегородок",
    duration: "4-6 недель",
    stepNumber: 3,
    icon: Home,
  },
  {
    title: "Кровля",
    description: "Монтаж кровли и водосточной системы",
    duration: "2-3 недели",
    stepNumber: 4,
    icon: Home,
  },
  {
    title: "Отделка",
    description: "Внутренние и внешние отделочные работы",
    duration: "6-8 недель",
    stepNumber: 5,
    icon: Palette,
  },
]

const BuildTimeline = () => {
  return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
              Этапы строительства
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Пошаговый процесс создания дома вашей мечты
            </p>
          </motion.div>

          <div className="hidden lg:block mb-16">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-200 transform -translate-y-1/2 z-0"></div>
              <div className="flex justify-between items-stretch relative z-10">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ y: -10, scale: 1.05 }}
                        className="group relative"
                    >
                      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-56 border border-gray-200 group-hover:border-purple-300 h-full">
                        <div className="absolute -top-4 left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {step.stepNumber}
                        </div>
                        <div className="flex justify-center mb-4 mt-6">
                          <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-purple-200 transition-colors duration-300">
                            <step.icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>

                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                            <Clock className="w-4 h-4 mr-2" />
                            {step.duration}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block lg:hidden mb-12">
            <div className="grid grid-cols-2 gap-8">
              {steps.map((step, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="group relative"
                  >
                    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group-hover:border-purple-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                          <step.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.stepNumber}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-1">
                        {step.title}
                      </h3>
                      <p className="text text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                        <Clock className="w-4 h-4 mr-2" />
                        {step.duration}
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>

          <div className="md:hidden space-y-6 mb-12">
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                >
                  <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                        <step.icon className="w-6 h-6 text-purple-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-semibold">{step.title}</h3>
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {step.stepNumber}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          <Clock className="w-3 h-3 mr-2" />
                          {step.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto"
          >
            <div className="p-8 border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <h3 className="font-heading text-2xl lg:text-3xl">Полный цикл строительства</h3>
                </div>
                <p className="text-lg text-gray-600 mb-2">
                  <span className="font-semibold text-gray-900">17-24 недели</span> от проекта до готового дома
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Все этапы контролируются нашими специалистами
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default BuildTimeline
