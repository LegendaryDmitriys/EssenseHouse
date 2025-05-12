
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";


import BuildTimeline from "@/components/home/BuildTimeline";
import CostCalculator from "@/components/home/CostCalculator";
import CompanyHistory from "@/components/home/CompanyHistory";
import TeamSection from "@/components/home/TeamSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import Questions from "@/components/home/Questions.tsx";
import TestimonialsSection from "@/components/home/TestimonialsSection.tsx";
import HowBuild from "@/components/home/HowBuild.tsx";
import AdvantagesSection from "@/components/home/AdvantagesSection.tsx";
import ContactForm from "@/components/home/ContactForm.tsx";
import LazyComponent from "@/components/lazy/LazyComponent.tsx";

const Index = () => {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);


  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);


  const opacityTitle = useTransform(scrollY, [0, 200, 500], [1, 1, 0.8]);
  const titleY = useTransform(scrollY, [0, 500], [0, -50]);

  const opacitySubtitle = useTransform(scrollY, [0, 200, 500], [1, 1, 0.8]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, 0]);


  const opacityServices = useTransform(scrollY, [0, 350, 500], [1, 1, 0.8]);
  const servicesY = useTransform(scrollY, [0, 500], [0, 0]);

  const scale = useTransform(scrollY, [0, 800], [1, 1.2]);

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
          <AdvantagesSection/>

          <CompanyHistory/>

          <LazyComponent>
            <ProjectsShowcase />
          </LazyComponent>

          <TeamSection/>

          <BuildTimeline/>

          <CostCalculator/>

          <HowBuild/>

          <LazyComponent>
            <TestimonialsSection/>
          </LazyComponent>

          <Questions/>

        </motion.div>


        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-8 right-8 bg-[#9b87f5] text-white p-4 rounded-full shadow-lg hover:bg-[#7E69AB] z-40"
            onClick={() => setIsContactVisible(true)}
        >
          <Phone className="w-6 h-6" />
        </motion.button>


        {isContactVisible && (
            <ContactForm onIsContactVisible={setIsContactVisible} />
        )}
      </div>


  );
};

export default Index;