
import { motion } from "framer-motion";
import { CalendarDays, Trophy, Home, Award } from "lucide-react";

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
    description: "Компания начала расти. Мы расширили перечень услуг, включив в него проектирование\n" +
        "                                индивидуальных домов, а также начали работать с новыми строительными материалами,\n" +
        "                                включая кирпич и пеноблоки",
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
];

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
];

const CompanyHistory = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-6">
            История нашей компании
          </h2>
          <p className="text-lg text-muted-foreground">
            Более десяти лет мы создаем дома, в которых хочется жить
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-1/2 px-6">
                <div className={`bg-card p-6 rounded-lg shadow-lg ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">{achievement.number}</h3>
              <p className="text-muted-foreground">{achievement.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyHistory;
