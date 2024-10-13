import React, { useRef } from "react";
import { motion } from "framer-motion";
import useOnScreen from '../../src/hooks/useOnScreen';
// @ts-ignore
import {ROUTES} from "../utils/routes";
import {Link} from "react-router-dom";
const projects = [
  { id: 1, imgSrc: '../../public/zm-1.png', label: 'ZM-1' },
  { id: 2, imgSrc: '../../public/zm-2.png', label: 'ZM-2' },
  { id: 3, imgSrc: '../../public/zm-3.png', label: 'ZM-3' },
  { id: 4, imgSrc: '../../public/zm-1.png', label: 'ZM-1' },
  { id: 5, imgSrc: '../../public/zm-2.png', label: 'ZM-2' },
  { id: 6, imgSrc: '../../public/zm-3.png', label: 'ZM-3' },
];

const ProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(sectionRef);
  return (
    <section className="section block-content" ref={sectionRef}>
      <div className="container">
        <h2 className="title-main">КАЖДЫЙ НАШ ПРОЕКТ УНИКАЛЕН</h2>
        <div className="columns is-multiline">
          {projects.map((project, index) => (
            <motion.div
              className="column is-one-third"
              key={project.id}
              initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -200 : 200, opacity: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.3 }} 
            >
              <div className="card">
                <Link to={`${ROUTES.FrameHouse}/1`}>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <motion.img
                      src={project.imgSrc}
                      alt={`Project ${project.label}`}
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="has-text-white is-overlay is-size-4 has-text-weight-bold"
                      style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.label}
                    </motion.div>
                  </figure>
                </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="has-text-centered">
          <motion.button
            className="button-project text-main"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ duration: 0.3 }}
          >
            Посмотреть все проекты
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;