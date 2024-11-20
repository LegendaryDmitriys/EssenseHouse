import React from 'react';
import '../../styles/orderModal.css';
import config from "../../api/api.ts";

interface QuestionFormModalProps {
    onClose: () => void;
    projectName: string;
    houseId: number;
}

const QuestionFormModal: React.FC<QuestionFormModalProps> = ({ onClose, projectName, houseId }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        formData.append('house', houseId.toString());

        try {
            const response = await fetch(`${config.API_URL}user-questions/house/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Вопрос успешно отправлен:', data);
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Ошибка при отправке вопроса:', errorData);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="project-modal__overlay" onClick={onClose}>
            <div className="project-modal__content" onClick={(e) => e.stopPropagation()}>
                <button className="project-close__button" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="subtitle-main">Задать вопрос</h2>
                <form onSubmit={handleSubmit} className="project-form">
                    <label className="text-main">Ваше имя *</label>
                    <input type="text" name="name" required />

                    <label className="text-main">Телефон *</label>
                    <input type="tel" name="phone" required />

                    <label className="text-main">Email *</label>
                    <input type="email" name="email" />

                    <label className="text-main">Интересующий товар *</label>
                    <input type="text" name="projectName" value={projectName} disabled />

                    <label className="text-main">Ваш вопрос *</label>
                    <textarea required name="question"></textarea>

                    <label className="text-main">
                        <input type="checkbox" required /> Я согласен на обработку персональных данных
                    </label>

                    <button type="submit" className="submit-button">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionFormModal;
