
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {Building2, CheckCircle2, Clock4, Wrench, Phone, Play} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import BuildTimeline from "@/components/home/BuildTimeline";
import CostCalculator from "@/components/home/CostCalculator";
import CompanyHistory from "@/components/home/CompanyHistory";
import TeamSection from "@/components/home/TeamSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import Questions from "@/components/home/Questions.tsx";
import TestimonialsSection from "@/components/home/TestimonialsSection.tsx";
import HowBuild from "@/components/home/HowBuild.tsx";

const Index = () => {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);


  const opacityTitle = useTransform(scrollY, [0, 200, 500], [1, 1, 0.8]);
  const titleY = useTransform(scrollY, [0, 500], [0, -50]);

  const opacitySubtitle = useTransform(scrollY, [0, 200, 500], [1, 1, 0.8]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, 0]);


  const opacityServices = useTransform(scrollY, [0, 350, 500], [1, 1, 0.8]);
  const servicesY = useTransform(scrollY, [0, 500], [0, 0]);

  const scale = useTransform(scrollY, [0, 800], [1, 1.2]);

  const handleContactClick = () => {
    setIsContactVisible(true);
    toast("Форма обратной связи открыта");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !showMainContent) {
        setShowMainContent(true);
      }

      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled, showMainContent]);


  return (
      <div className="min-h-screen">
        <section
            ref={heroRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <motion.div
              style={{
                y: backgroundY,
                scale,
              }}
              className="absolute inset-0 z-0"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1.5, ease: "easeOut"}}
          >
            <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Современный дом"
                className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/40 z-10"/>

          <motion.div
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 1, delay: 0.2, ease: "easeOut"}}
              style={{opacity: opacityTitle, y: titleY}}
              className="absolute z-20 right-0 top-1/4 w-full text-right pr-12"
          >
            <h1 className="font-heading text-7xl md:text-9xl mb-6 text-white tracking-wider paralax-text">
              ESSENSE <br/> HOUSE
            </h1>
          </motion.div>

          <motion.div
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 1, delay: 0.4, ease: "easeOut"}}
              style={{opacity: opacitySubtitle, y: subtitleY}}
              className="absolute z-20 top-2/3 right-12 max-w-xs text-right"
          >
            <p className="text-xl text-white font-light">
              Мы строим <br/>
              Надежные <br/>
              Дома в <br/>
              России
            </p>
          </motion.div>

          <motion.div
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 1, delay: 0.6, ease: "easeOut"}}
              style={{opacity: opacityServices, y: servicesY}}
              className="absolute z-20 bottom-16 left-12 text-left"
          >
            <p className="text-2xl text-white uppercase font-bold leading-tight paralax-text">
              ДИЗАЙН <br/>
              ПЛАНИРОВКА <br/>
              СТРОИТЕЛЬСТВО
            </p>
          </motion.div>

          <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 1, duration: 0.8}}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20"
          >
            <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
            >
              <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </section>

        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: showMainContent ? 1 : 0}}
            transition={{duration: 0.8}}
        >
          <section className="py-20 bg-white">
            <div className="container">
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.5}}
                  className="text-center max-w-3xl mx-auto mb-16"
              >
                <h2 className="font-heading text-4xl md:text-5xl mb-6">
                  Почему выбирают нас
                </h2>
                <p className="text-lg text-muted-foreground">
                  Профессионализм и качество в каждой детали
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Building2 className="w-8 h-8 text-[#9b87f5]"/>,
                    title: "Полный цикл работ",
                    description: "От проекта до отделки",
                  },
                  {
                    icon: <CheckCircle2 className="w-8 h-8 text-[#9b87f5]"/>,
                    title: "Гарантия качества",
                    description: "5 лет на все работы",
                  },
                  {
                    icon: <Clock4 className="w-8 h-8 text-[#9b87f5]"/>,
                    title: "Точные сроки",
                    description: "Соблюдаем график работ",
                  },
                  {
                    icon: <Wrench className="w-8 h-8 text-[#9b87f5]"/>,
                    title: "Современные технологии",
                    description: "Инновационные решения",
                  },
                ].map((advantage, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                        className="bg-white p-8 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300"
                    >
                      <div className="mb-4 flex justify-center">{advantage.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                      <p className="text-muted-foreground">{advantage.description}</p>
                    </motion.div>
                ))}
              </div>
            </div>
          </section>

          <CompanyHistory/>

          <ProjectsShowcase/>

          <TeamSection/>

          <BuildTimeline/>

          <CostCalculator/>

          <HowBuild/>

          <TestimonialsSection/>

          <Questions/>

        </motion.div>


        {isContactVisible && (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsContactVisible(false);
                }}
            >
              <motion.div
                  initial={{scale: 0.9, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  className="bg-white rounded-lg p-8 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-heading">Связаться с нами</h3>
                  <button
                      onClick={() => setIsContactVisible(false)}
                      className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ваше имя
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Телефон
                    </label>
                    <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        placeholder="+7 (999) 999-99-99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Сообщение
                    </label>
                    <textarea
                        className="w-full p-2 border rounded-md"
                        rows={4}
                        placeholder="Ваше сообщение..."
                    />
                  </div>
                  <Button
                      className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.success("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
                        setIsContactVisible(false);
                      }}
                  >
                    Отправить
                  </Button>
                </form>
              </motion.div>
            </motion.div>
        )}

        <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1}}
            className="fixed bottom-8 right-8 bg-[#9b87f5] text-white p-4 rounded-full shadow-lg hover:bg-[#7E69AB] z-40"
            onClick={handleContactClick}
        >
          <Phone className="w-6 h-6"/>
        </motion.button>
      </div>


  );
};

export default Index;