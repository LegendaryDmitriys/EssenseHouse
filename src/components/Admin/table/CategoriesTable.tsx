import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../Modal.tsx";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import {
    addCategory,
    deleteCategory,
    fetchCategories,
    updateCategory,
} from "../../../redux/features/category/categorySlice.ts";

const CategoriesTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.items);
    const status = useSelector((state: RootState) => state.categories.status);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({
        id: null as number | null,
        name: "",
        slug: "",
        long_description: "",
        short_description: "",
    });

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    const handleEditCategory = (category: typeof currentCategory) => {
        setCurrentCategory(category);
        setModalVisible(true);
    };

    const handleDeleteCategory = (categoryId: number, event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(deleteCategory(categoryId));
    };

    const handleChange = (field: string, value: string) => {
        setCurrentCategory((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveCategory = () => {
        if (currentCategory.id) {
            dispatch(updateCategory(currentCategory));
        } else {
            dispatch(addCategory(currentCategory));
        }
        setModalVisible(false);
        setCurrentCategory({
            id: null,
            name: "",
            slug: "",
            long_description: "",
            short_description: "",
        });
    };

    const handleCancelEdit = () => {
        setModalVisible(false);
        setCurrentCategory({
            id: null,
            name: "",
            slug: "",
            long_description: "",
            short_description: "",
        });
    };

    return (
        <div>
            <table className="table is-fullwidth is-striped is-white">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <button
                                className="button is-small is-success"
                                onClick={() =>
                                    handleEditCategory({
                                        id: category.id,
                                        name: category.name,
                                        slug: category.slug,
                                        long_description: category.long_description,
                                        short_description: category.short_description,
                                    })
                                }
                            >
                                Редактировать
                            </button>
                            <button
                                className="button is-small is-danger"
                                onClick={(e) => handleDeleteCategory(category.id, e)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
                <button
                    className="button is-small is-primary"
                    onClick={() => setModalVisible(true)}
                >
                    Добавить новую категорию
                </button>
            </div>

            {modalVisible && (
                <Modal onClose={handleCancelEdit}>
                    <h3 className="subtitle">{currentCategory.id ? "Редактировать категорию" : "Добавить категорию"}</h3>
                    <input
                        className="input is-small white-input text-main"
                        type="text"
                        placeholder="Название категории"
                        value={currentCategory.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <input
                        className="input is-small white-input text-main"
                        type="text"
                        placeholder="Slug"
                        value={currentCategory.slug}
                        onChange={(e) => handleChange("slug", e.target.value)}
                    />
                    <textarea
                        className="textarea is-small white-textarea text-main"
                        placeholder="Долгое описание"
                        value={currentCategory.long_description}
                        onChange={(e) => handleChange("long_description", e.target.value)}
                    />
                    <textarea
                        className="textarea is-small white-textarea text-main"
                        placeholder="Краткое описание"
                        value={currentCategory.short_description}
                        onChange={(e) => handleChange("short_description", e.target.value)}
                    />
                    <div style={{paddingTop:"10px"}}>
                        <button
                            className="button is-small is-success"
                            onClick={handleSaveCategory}
                        >
                            {currentCategory.id ? "Сохранить изменения" : "Добавить"}
                        </button>
                        <button className="button is-small" onClick={handleCancelEdit}>
                            Отмена
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CategoriesTable;
