import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import {
    addFinishingOption,
    deleteFinishingOption,
    fetchFinishingOptions,
    updateFinishingOption
} from "../../../redux/features/finishingOption/finishingOptionSlice.ts";
import Modal from "../../Modal.tsx";

const FinishingOptionsTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error } = useSelector((state: RootState) => state.finishingOptions);

    const [editingOptionId, setEditingOptionId] = useState<number | null>(null);
    const [newOptionTitle, setNewOptionTitle] = useState("");
    const [newOptionDescription, setNewOptionDescription] = useState("");
    const [newOptionPrice, setNewOptionPrice] = useState("");
    const [newOptionImage, setNewOptionImage] = useState<File | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchFinishingOptions());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return <p>Загрузка...</p>;
    }

    if (status === "failed") {
        return <p>Ошибка загрузки: {error}</p>;
    }

    const handleEditOption = (optionId: number) => {
        setEditingOptionId(optionId);
        const option = items.find((opt) => opt.id === optionId);
        if (option) {
            setNewOptionTitle(option.title);
            setNewOptionDescription(option.description);
            setNewOptionPrice(option.price_per_sqm.toString());
            setNewOptionImage(null);
        }
        setModalVisible(true);
    };

    const handleSaveOption = async (optionId: number) => {
        const formData = new FormData();
        formData.append("id", optionId.toString());
        formData.append("title", newOptionTitle);
        formData.append("description", newOptionDescription);
        formData.append("price_per_sqm", newOptionPrice);

        if (newOptionImage) {
            formData.append("image", newOptionImage);
        }

        dispatch(updateFinishingOption(formData));
        setEditingOptionId(null);
        setModalVisible(false);
    };

    const handleAddOption = () => {
        if (!newOptionTitle || !newOptionDescription || !newOptionPrice) {
            alert("Все поля должны быть заполнены");
            return;
        }

        const optionData = {
            title: newOptionTitle,
            description: newOptionDescription,
            price_per_sqm: parseFloat(newOptionPrice),
            image: newOptionImage
        };

        dispatch(addFinishingOption(optionData));

        setAddModalVisible(false);
        setNewOptionTitle("");
        setNewOptionDescription("");
        setNewOptionPrice("");
        setNewOptionImage(null);
    };

    const handleDeleteOption = (optionId: number) => {
        dispatch(deleteFinishingOption(optionId));
    };

    return (
        <div>
            <table className="table is-fullwidth is-striped is-white">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Цена за м²</th>
                    <th>Изображение</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {items.map((option) => (
                    <tr key={option.id}>
                        <td>{option.id}</td>
                        <td>{option.title}</td>
                        <td>{option.description}</td>
                        <td>{option.price_per_sqm} ₽</td>
                        <td>
                            {option.image ? (
                                <img
                                    src={option.image}
                                    alt={option.title}
                                    style={{maxWidth: "100px", height: "auto"}}
                                />
                            ) : (
                                <span>Нет изображения</span>
                            )}
                        </td>
                        <td>
                            <button
                                className="button is-small is-success"
                                onClick={() => handleEditOption(option.id)}
                            >
                                Редактировать
                            </button>
                            <button
                                className="button is-small is-danger"
                                onClick={() => handleDeleteOption(option.id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button
                className="button is-small is-primary"
                onClick={() => setAddModalVisible(true)}
            >
                Добавить новую отделку
            </button>

            {addModalVisible && (
                <Modal onClose={() => setAddModalVisible(false)}>
                    <h3 className="subtitle">Добавить новый вариант отделки</h3>
                    <input
                        className="input is-small white-input text-main"
                        type="text"
                        placeholder="Заголовок"
                        value={newOptionTitle}
                        onChange={(e) => setNewOptionTitle(e.target.value)}
                    />
                    <textarea
                        className="input is-small white-textarea text-main"
                        placeholder="Описание"
                        value={newOptionDescription}
                        onChange={(e) => setNewOptionDescription(e.target.value)}
                    />
                    <input
                        className="input is-small white-input text-main"
                        type="number"
                        placeholder="Цена за м²"
                        value={newOptionPrice}
                        onChange={(e) => setNewOptionPrice(e.target.value)}
                    />
                    <div className="file is-small is-white">
                        <label className="file-label">
                            <input
                                className="file-input input is-small white-input"
                                type="file"
                                onChange={(e) => setNewOptionImage(e.target.files ? e.target.files[0] : null)}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">Выберите файл...</span>
                            </span>
                        </label>
                    </div>
                    <div>
                        <button className="button is-primary" onClick={handleAddOption}>
                            Добавить
                        </button>
                        <button
                            className="button"
                            onClick={() => setAddModalVisible(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </Modal>
            )}

            {modalVisible && (
                <Modal onClose={() => setModalVisible(false)}>
                    <h3 className="subtitle">Редактировать вариант отделки</h3>
                    <input
                        className="input is-small white-input text-main"
                        type="text"
                        value={newOptionTitle}
                        onChange={(e) => setNewOptionTitle(e.target.value)}
                    />
                    <textarea
                        className="input is-small white-textarea text-main"
                        value={newOptionDescription}
                        onChange={(e) => setNewOptionDescription(e.target.value)}
                    />
                    <input
                        className="input is-small white-input text-main"
                        type="number"
                        value={newOptionPrice}
                        onChange={(e) => setNewOptionPrice(e.target.value)}
                    />
                    <div className="file is-small is-white">
                        <label className="file-label">
                            <input
                                className="file-input input is-small white-input"
                                type="file"
                                onChange={(e) => setNewOptionImage(e.target.files ? e.target.files[0] : null)}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">Выберите файл...</span>
                            </span>
                        </label>
                    </div>
                    <div>
                        <button
                            className="button is-success"
                            onClick={() => handleSaveOption(editingOptionId!)}
                        >
                            Сохранить
                        </button>
                        <button
                            className="button"
                            onClick={() => setModalVisible(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FinishingOptionsTable;
