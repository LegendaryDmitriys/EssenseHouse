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
                <div
                    className="modal-box"
                    style={{
                        width: "auto",
                        height: "auto",
                        overflow: "auto",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        padding: 20,
                        maxWidth: "95vw",
                        maxHeight: "95vh",
                        minWidth: "200px",
                        minHeight: "100px",
                    }}
                >
                    {children}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
};


export default Modal;
