import React from 'react';
import '../../styles/orderModal.css';
import config from "../../api/api.ts";


interface FinishOption {
    id: number;
    title: string;
    description: string;
    price_per_sqm: number;
    image: string;
}

interface OrderFormModalProps {
    onClose: () => void;
    projectName: string;
    finishOptions: FinishOption[];
    houseId: number;
}


const OrderFormModal: React.FC<OrderFormModalProps> = ({ onClose, projectName, finishOptions, houseId }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        formData.append('house', houseId.toString());


        try {
            const response = await fetch(`${config.API_URL}orders/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Заказ успешно отправлен:', data);
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Ошибка при отправке заказа:', errorData);
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
                <h2 className="subtitle-main">Заказать проект</h2>
                <form onSubmit={handleSubmit} className="project-form">
                    <label className="text-main">Ваше имя *</label>
                    <input type="text" name="name" required />

                    <label className="text-main">Телефон *</label>
                    <input type="tel" name="phone" required />

                    <label className="text-main">Email</label>
                    <input type="email" name="email" />

                    <label className="text-main">Проект</label>
                    <input type="text" value={projectName} name="house" disabled />

                    {finishOptions.length > 0 && (
                        <>
                        <label className="text-main">Вариант отделки</label>
                        <select name="finishing_option">
                            {finishOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.title}
                                </option>
                            ))}
                        </select>
                        </>
                    )}

                    <label className="text-main">Место строительства</label>
                    <input type="text" name="construction_place" />

                    <label className="text-main">Сообщение *</label>
                    <textarea required name="message"></textarea>

                    <label className="text-main">
                        <input type="checkbox" required /> Я согласен на обработку персональных данных
                    </label>

                    <button type="submit" className="submit-button">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default OrderFormModal;
