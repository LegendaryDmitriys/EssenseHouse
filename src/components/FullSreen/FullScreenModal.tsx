import React from 'react';
import '../../styles/fullSreenModal.css';

interface FullScreenModalProps {
    imgSrc: string;
    onClose: () => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ imgSrc, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <button className="close-button" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={imgSrc} alt="Full size" className="modal-image"/>
            </div>
        </div>
    );
};

export default FullScreenModal;
