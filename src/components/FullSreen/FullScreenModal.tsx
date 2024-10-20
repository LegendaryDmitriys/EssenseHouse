import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/fullSreenModal.css';

interface FullScreenModalProps {
    imgSrc: string;
    onClose: () => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ imgSrc, onClose }) => {
    return (
        <motion.div
            className="modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}      // Начальная непрозрачность
            animate={{ opacity: 1 }}       // Конечная непрозрачность
            exit={{ opacity: 0 }}          // Непрозрачность при выходе
            transition={{ duration: 0.3 }} // Длительность анимации
        >
            <button className="close-button" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
            <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8 }}     // Начальный масштаб
                animate={{ scale: 1 }}       // Конечный масштаб
                exit={{ scale: 0.8 }}        // Масштаб при выходе
                transition={{ duration: 0.3 }} // Длительность анимации
            >
                <img src={imgSrc} alt="Full size" className="modal-image" />
            </motion.div>
        </motion.div>
    );
};

export default FullScreenModal;