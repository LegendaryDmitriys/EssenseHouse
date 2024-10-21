import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import useOnScreen from '../../src/hooks/useOnScreen';
// @ts-ignore
import {ROUTES} from "../utils/routes.js";
import {Link} from "react-router-dom";
import config from "../api/api.ts";

interface Image {
  id: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface House {
  id: number;
  title: string;
  price: string;
  rooms: number;
  category: Category;
  images: Image[];
}

const ProjectSection: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(sectionRef);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch(`${config.API_URL}houses/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);


  return (
    <section className="section block-content" ref={sectionRef}>
      <div className="container">
        <h2 className="title-main">КАЖДЫЙ НАШ ПРОЕКТ УНИКАЛЕН</h2>
        <div className="columns is-multiline">
          {houses.map((house, index) => (
            <motion.div
              className="column is-one-third"
              key={house.id}
              initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <div className="card-white">
                <Link to={`${ROUTES.Project}`}>
                  <div className="card-image">
                    <figure className="image is-19by10">
                      {house.images.length > 0 ? (
                          <motion.img
                              src={`${config.API_URL}${house.images[0].image}`}
                              alt={`Project ${house.title}`}
                              whileHover={{scale: 1.05}}
                              transition={{duration: 0.4}}
                          />
                      ) : (
                          <div className="no-image">Нет изображения</div>
                      )}
                      <motion.div
                          className="has-text-white is-overlay is-size-4 has-text-weight-bold"
                          style={{position: 'absolute', bottom: '10px', left: '10px'}}
                          whileHover={{opacity: 1}}
                          transition={{duration: 0.3}}
                      >
                      </motion.div>
                    </figure>
                  </div>
                  <p className="grey">{house.title}</p>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="has-text-centered">
          <Link to={ROUTES.Project}>
            <motion.button
              className="button-project text-main"
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ duration: 0.3 }}
            >
              Посмотреть все проекты
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;