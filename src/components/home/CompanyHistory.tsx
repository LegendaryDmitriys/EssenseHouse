import { motion } from "framer-motion"
import { CalendarDays, Trophy, Home, Award } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const milestones = [
  {
    year: "2015",
    title: "Основание компании",
    description: "Начало нашего пути в сфере строительства частных домов",
    icon: CalendarDays,
  },
  {
    year: "2019",
    title: "Старт строительной деятельности",
    description:
        "Компания начала расти. Мы расширили перечень услуг, включив в него проектирование индивидуальных домов, а также начали работать с новыми строительными материалами, включая кирпич и пеноблоки",
    icon: Home,
  },
  {
    year: "2020",
    title: "Международная награда",
    description: "Признание на международном уровне за инновационный подход",
    icon: Trophy,
  },
  {
    year: "2025",
    title: "Период инноваций и расширения",
    description: "Cтроительство домов по новым современным технологиям",
    icon: Award,
  },
]

const achievements = [
  {
    number: "10",
    label: "лет на рынке",
    icon: CalendarDays,
  },
  {
    number: "500+",
    label: "построенных домов",
    icon: Home,
  },
  {
    number: "40+ лет",
    label: "срок службы",
    icon: Trophy,
  },
  {
    number: "100%",
    label: "довольных клиентов",
    icon: Award,
  },
]

const CompanyHistory = () => {
  return (
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">История нашей компании</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Более десяти лет мы создаем дома, в которых хочется жить
            </p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto mb-12 md:mb-20">
            <div className="hidden md:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />

              {milestones.map((milestone, index) => (
                  <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-1/2 px-6">
                      <div className={`bg-card p-6 rounded-lg shadow-lg ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold mb-2">{milestone.year}</h3>
                        <h4 className="text-lg font-semibold mb-2">{milestone.title}</h4>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <milestone.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="w-1/2" />
                  </motion.div>
              ))}
            </div>
            <div className="md:hidden relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />

              {milestones.map((milestone, index) => (
                  <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative pl-12 mb-8 last:mb-0"
                  >
                    <div className="absolute left-0 top-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <milestone.icon className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold mb-1">{milestone.year}</h3>
                      <h4 className="text-base font-semibold mb-2">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {achievements.map((achievement, index) => (
                <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-4 md:p-6 rounded-lg shadow-lg text-center"
                >
                  <achievement.icon className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                  <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{achievement.number}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{achievement.label}</p>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

export default CompanyHistory
