import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import {
    addFinishingOption,
    deleteFinishingOption,
    fetchFinishingOptions,
    updateFinishingOption
} from "../../../redux/features/finishingOption/finishingOptionSlice.ts";
import Modal from "../../Modal.tsx";  // Предположительно, у вас есть компонент Modal

const FinishingOptionsTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error } = useSelector((state: RootState) => state.finishingOptions);

    const [editingOptionId, setEditingOptionId] = useState<number | null>(null);
    const [newOptionTitle, setNewOptionTitle] = useState<string>("");
    const [newOptionDescription, setNewOptionDescription] = useState<string>("");
    const [newOptionPrice, setNewOptionPrice] = useState<string>("");
    const [newOptionImage, setNewOptionImage] = useState<File | null>(null);

    const [editOptionTitle, setEditOptionTitle] = useState<string>("");
    const [editOptionDescription, setEditOptionDescription] = useState<string>("");
    const [editOptionPrice, setEditOptionPrice] = useState<string>("");
    const [editOptionImage, setEditOptionImage] = useState<File | null>(null);

    const [modalVisible, setModalVisible] = useState(false);

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
            setEditOptionTitle(option.title);
            setEditOptionDescription(option.description);
            setEditOptionPrice(option.price_per_sqm.toString());
            setEditOptionImage(null);
        }
        setModalVisible(true);
    };

    const handleSaveOption = async (optionId: number) => {
        const formData = new FormData();
        formData.append('id', optionId.toString());
        formData.append('title', editOptionTitle);
        formData.append('description', editOptionDescription);
        formData.append('price_per_sqm', editOptionPrice);

        if (editOptionImage) {
            formData.append('image', editOptionImage);
        }

        dispatch(updateFinishingOption(formData));
        setEditingOptionId(null);
        setModalVisible(false);
    };


    const handleDeleteOption = (optionId: number) => {
        dispatch(deleteFinishingOption(optionId));
    };

    const handleAddOption = () => {
        if (!newOptionTitle || !newOptionDescription || !newOptionPrice) {
            alert("Все поля должны быть заполнены");
            return;
        }
        dispatch(addFinishingOption({
            title: newOptionTitle,
            description: newOptionDescription,
            price_per_sqm: parseFloat(newOptionPrice),
            image: newOptionImage
        }));
        setNewOptionTitle("");
        setNewOptionDescription("");
        setNewOptionPrice("");
        setNewOptionImage(null);
    };

    return (
        <div>
            <table className="table is-fullwidth is-striped">
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
                                    style={{ maxWidth: "100px", height: "auto" }}
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

            <div style={{ marginTop: "20px" }}>
                <h3>Добавить новый вариант отделки</h3>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={newOptionTitle}
                    onChange={(e) => setNewOptionTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={newOptionDescription}
                    onChange={(e) => setNewOptionDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Цена за м²"
                    value={newOptionPrice}
                    onChange={(e) => setNewOptionPrice(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setNewOptionImage(e.target.files ? e.target.files[0] : null)}
                />
                <button className="button is-small is-primary" onClick={handleAddOption}>
                    Добавить
                </button>
            </div>

            {modalVisible && (
                <Modal onClose={() => setModalVisible(false)}>
                    <h3>Редактировать вариант отделки</h3>
                    <input
                        type="text"
                        value={editOptionTitle}
                        onChange={(e) => setEditOptionTitle(e.target.value)}
                    />
                    <textarea
                        value={editOptionDescription}
                        onChange={(e) => setEditOptionDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editOptionPrice}
                        onChange={(e) => setEditOptionPrice(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={(e) => setEditOptionImage(e.target.files ? e.target.files[0] : null)}
                    />
                    <div>
                        <button
                            className="button is-small is-success"
                            onClick={() => handleSaveOption(editingOptionId!)}
                        >
                            Сохранить
                        </button>
                        <button
                            className="button is-small"
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
