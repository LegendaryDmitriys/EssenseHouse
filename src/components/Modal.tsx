import React from "react";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-box" style={{maxHeight: "80vh", maxWidth: "80vw", overflowY: "auto", boxSizing: "border-box", backgroundColor:"#fff", padding: 20}}>{children}</div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
};

export default Modal;
