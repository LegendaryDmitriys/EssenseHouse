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

const FilterOptionsTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filterOptions, status, error } = useSelector((state: RootState) => state.filters);

    const [editingOptionId, setEditingOptionId] = useState<number | null>(null);
    const [newOption, setNewOption] = useState({
        name: "",
        field_name: "",
        filter_type: "exact" as 'exact' | 'range' | 'contains',
        options: "{}"
    });

    const [editOption, setEditOption] = useState({
        name: "",
        field_name: "",
        filter_type: "exact" as 'exact' | 'range' | 'contains',
        options: "{}"
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

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
                options: JSON.stringify(option.options || {})
            });
        }
        setModalVisible(true);
        setIsEditMode(true);
    };

    const handleSaveOption = async () => {
        let parsedOptions = {};
        try {
            parsedOptions = JSON.parse(isEditMode ? editOption.options : newOption.options);
        } catch (error) {
            alert("Некорректный JSON в опциях");
            return;
        }

        if (isEditMode && editingOptionId !== null) {
            dispatch(updateFilterOption({ id: editingOptionId, ...editOption, options: parsedOptions }));
        } else {
            const { name, field_name, filter_type } = newOption;
            if (!name || !field_name || !filter_type) {
                alert("Все поля должны быть заполнены");
                return;
            }
            dispatch(addFilterOption({
                id: editingOptionId !== null ? editingOptionId : Date.now(),
                ...newOption,
                options: parsedOptions
            }));
            setNewOption({ name: "", field_name: "", filter_type: "exact", options: "{}" });
        }
        setEditingOptionId(null);
        setModalVisible(false);
    };

    const handleDeleteOption = (optionId: number) => {
        dispatch(deleteFilterOption(optionId));
    };

    const handleAddNewOption = () => {
        setModalVisible(true);
        setIsEditMode(false);
        setNewOption({
            name: "",
            field_name: "",
            filter_type: "exact",
            options: "{}"
        });
    };

    return (
        <div>
            <table className="table is-fullwidth is-striped is-white" style={{marginTop: "20px"}}>
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
            <button className="button is-small is-primary" onClick={handleAddNewOption}>
                Добавить новый фильтр
            </button>

            {modalVisible && (
                <Modal onClose={() => setModalVisible(false)}>
                    <h3 className="subtitle">{isEditMode ? "Редактировать фильтр" : "Добавить фильтр"}</h3>
                    <input
                        className="input is-small white-input text-main"
                        type="text"
                        placeholder="Название"
                        value={isEditMode ? editOption.name : newOption.name}
                        onChange={(e) =>
                            isEditMode
                                ? setEditOption({ ...editOption, name: e.target.value })
                                : setNewOption({ ...newOption, name: e.target.value })
                        }
                    />
                    <input
                        className="input is-small white-input text-main"
                        type="text"
                        placeholder="Поле"
                        value={isEditMode ? editOption.field_name : newOption.field_name}
                        onChange={(e) =>
                            isEditMode
                                ? setEditOption({ ...editOption, field_name: e.target.value })
                                : setNewOption({ ...newOption, field_name: e.target.value })
                        }
                    />
                    <select
                        className="select is-small white-input text-main"
                        value={isEditMode ? editOption.filter_type : newOption.filter_type}
                        onChange={(e) =>
                            isEditMode
                                ? setEditOption({
                                    ...editOption,
                                    filter_type: e.target.value as 'exact' | 'range' | 'contains'
                                })
                                : setNewOption({
                                    ...newOption,
                                    filter_type: e.target.value as 'exact' | 'range' | 'contains'
                                })
                        }
                    >
                        <option value="exact">Exact</option>
                        <option value="range">Range</option>
                        <option value="contains">Contains</option>
                    </select>
                    <textarea
                        className="input is-small white-textarea text-main"
                        placeholder="Опции (JSON)"
                        value={isEditMode ? editOption.options : newOption.options}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (isEditMode) {
                                setEditOption({ ...editOption, options: value });
                            } else {
                                setNewOption({ ...newOption, options: value });
                            }
                        }}
                    />
                    <div>
                        <button
                            className="button is-small is-success"
                            onClick={handleSaveOption}
                        >
                            {isEditMode ? "Сохранить" : "Добавить"}
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

export default FilterOptionsTable;
