import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useOnScreen from '../../src/hooks/useOnScreen'; 
import '../../public/house514x514.png';

const Outer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section className="section block-content" ref={sectionRef}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-half">
            <motion.figure
              className="image is-4by3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }} 
            >
              <img src="../../public/house514x514.png" alt="Дом" />
            </motion.figure>
          </div>
          <div className="column is-half">
            <motion.h2
              className="title-main"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} 
              transition={{ duration: 0.5 }} 
            >
              ПОЧЕМУ ВЫБИРАЮТ НАС?
            </motion.h2>
            <motion.p
              className="content text-main"
              initial={{ opacity: 0 }} 
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
            >
              Мы предлагаем комплексное строительство домов под ключ с полным сопровождением на всех этапах — от проектирования до сдачи готового объекта. Наши клиенты выбирают нас за высокое качество работы, надёжность и использование только проверенных материалов. Более 10 лет опыта позволяют нам успешно реализовывать проекты любой сложности, учитывая индивидуальные пожелания и бюджет каждого заказчика. Мы гарантируем фиксированные цены, соблюдение сроков и прозрачность на всех этапах сотрудничества, чтобы вы могли быть уверены в результате.
            </motion.p>
            <div className="columns">
              {[
                { number: '5', text: 'гарантий по договору' },
                { number: '120', text: 'дней от проекта до новоселья' },
                { number: '40+', text: 'лет срок службы' }
              ].map((item, index) => (
                <motion.div
                  className="column has-text-centered"
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <h1 className="title is-1 number">{item.number}</h1>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outer;
