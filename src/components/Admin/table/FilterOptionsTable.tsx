import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import Modal from "../../Modal.tsx";
import {
    addFilterOption,
    deleteFilterOption,
    fetchFilterOptions,
    updateFilterOption
} from "../../../redux/features/filter/filterSlice.ts";

const FinishingOptionsTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filterOptions, status, error } = useSelector((state: RootState) => state.filters);

    const [editingOptionId, setEditingOptionId] = useState<number | null>(null);
    const [newOption, setNewOption] = useState({
        name: "",
        field_name: "",
        filter_type: "exact" as 'exact' | 'range' | 'contains',
        options: {} as { [key: string]: any }
    });

    const [editOption, setEditOption] = useState({
        name: "",
        field_name: "",
        filter_type: "exact" as 'exact' | 'range' | 'contains',
        options: {} as { [key: string]: any }
    });

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchFilterOptions());
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
        const option = filterOptions.find((opt) => opt.id === optionId);
        if (option) {
            setEditOption({
                name: option.name,
                field_name: option.field_name,
                filter_type: option.filter_type,
                options: option.options || {}
            });
        }
        setModalVisible(true);
    };

    const handleSaveOption = async (optionId: number) => {
        dispatch(updateFilterOption({ id: optionId, ...editOption }));
        setEditingOptionId(null);
        setModalVisible(false);
    };

    const handleDeleteOption = (optionId: number) => {
        dispatch(deleteFilterOption(optionId));
    };

    const handleAddOption = () => {
        const { name, field_name, filter_type } = newOption;
        if (!name || !field_name || !filter_type) {
            alert("Все поля должны быть заполнены");
            return;
        }
        dispatch(addFilterOption(newOption));
        setNewOption({ name: "", field_name: "", filter_type: "exact", options: {} });
    };

    return (
        <div>
            <table className="table is-fullwidth is-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Поле</th>
                    <th>Тип фильтра</th>
                    <th>Опции</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {filterOptions.map((option) => (
                    <tr key={option.id}>
                        <td>{option.id}</td>
                        <td>{option.name}</td>
                        <td>{option.field_name}</td>
                        <td>{option.filter_type}</td>
                        <td>{JSON.stringify(option.options)}</td>
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
                    placeholder="Название"
                    value={newOption.name}
                    onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Поле"
                    value={newOption.field_name}
                    onChange={(e) => setNewOption({ ...newOption, field_name: e.target.value })}
                />
                <select
                    value={newOption.filter_type}
                    onChange={(e) => setNewOption({ ...newOption, filter_type: e.target.value as 'exact' | 'range' | 'contains' })}
                >
                    <option value="exact">Exact</option>
                    <option value="range">Range</option>
                    <option value="contains">Contains</option>
                </select>
                <textarea
                    placeholder="Опции (JSON)"
                    value={JSON.stringify(newOption.options)}
                    onChange={(e) => setNewOption({ ...newOption, options: JSON.parse(e.target.value) })}
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
                        value={editOption.name}
                        onChange={(e) => setEditOption({ ...editOption, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editOption.field_name}
                        onChange={(e) => setEditOption({ ...editOption, field_name: e.target.value })}
                    />
                    <select
                        value={editOption.filter_type}
                        onChange={(e) => setEditOption({ ...editOption, filter_type: e.target.value as 'exact' | 'range' | 'contains' })}
                    >
                        <option value="exact">Exact</option>
                        <option value="range">Range</option>
                        <option value="contains">Contains</option>
                    </select>
                    <textarea
                        value={JSON.stringify(editOption.options)}
                        onChange={(e) => setEditOption({ ...editOption, options: JSON.parse(e.target.value) })}
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
