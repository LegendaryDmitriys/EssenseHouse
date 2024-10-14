import React from 'react';
import { motion } from 'framer-motion';

const MainBanner: React.FC = () => {
  return (
    <div className="banner">
      <motion.div
        className="banner-content"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
      >
        <motion.img
          src="/../../public/banner-logo.png"
          alt="banner-logo"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
        />
        <div className="details">
          <p className="design-text">
            <motion.span
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.6 }} 
            >
              ДИЗАЙН<br />ПЛАНИРОВКА<br />СТРОИТЕЛЬСТВО<br />
            </motion.span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MainBanner;
