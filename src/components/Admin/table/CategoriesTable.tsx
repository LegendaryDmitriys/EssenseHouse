import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../Modal.tsx";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import {
    addCategory,
    deleteCategory,
    fetchCategories,
    updateCategory
} from "../../../redux/features/category/categorySlice.ts";

const CategoriesTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.items);
    const status = useSelector((state: RootState) => state.categories.status);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [newCategorySlug, setNewCategorySlug] = useState<string>("");
    const [newCategoryLongDescription, setNewCategoryLongDescription] = useState<string>("");
    const [newCategoryDescription, setNewCategoryDescription] = useState<string>("");
    const [editCategoryName, setEditCategoryName] = useState<string>("");
    const [editCategorySlug, setEditCategorySlug] = useState<string>("");
    const [editCategoryLongDescription, setEditCategoryLongDescription] = useState<string>("");
    const [editCategoryDescription, setEditCategoryDescription] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    const handleEditCategory = (categoryId: number) => {
        setEditingCategoryId(categoryId);
        const category = categories.find((cat) => cat.id === categoryId);
        if (category) {
            setEditCategoryName(category.name);
            setEditCategorySlug(category.slug);
            setEditCategoryLongDescription(category.long_description);
            setEditCategoryDescription(category.short_description);
        }
        setModalVisible(true);
    };

    const handleSaveCategory = async (categoryId: number) => {
        dispatch(updateCategory({
            id: categoryId,
            name: editCategoryName,
            slug: editCategorySlug,
            long_description: editCategoryLongDescription,
            short_description: editCategoryDescription
        }));
        setEditingCategoryId(null);
        setModalVisible(false);
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setModalVisible(false);
    };

    const handleDeleteCategory = (categoryId: number, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent modal from opening
        dispatch(deleteCategory(categoryId));
    };

    const handleAddCategory = () => {
        if (!newCategoryName) {
            alert("Название категории не может быть пустым");
            return;
        }
        dispatch(addCategory({
            name: newCategoryName,
            slug: newCategorySlug,
            long_description: newCategoryLongDescription,
            short_description: newCategoryDescription
        }));
        setNewCategoryName("");
        setNewCategorySlug("");
        setNewCategoryLongDescription("");
        setNewCategoryDescription("");
    };

    return (
        <div>
            <table className="table is-fullwidth is-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr
                        key={category.id}
                        onClick={() => handleEditCategory(category.id)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: editingCategoryId === category.id ? "#f0f0f0" : "transparent",
                        }}
                    >
                        <td>{category.id}</td>
                        <td>
                            {editingCategoryId === category.id ? (
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                />
                            ) : (
                                category.name
                            )}
                        </td>
                        <td>
                            {editingCategoryId === category.id ? (
                                <>
                                    <button
                                        className="button is-small is-success"
                                        onClick={() => handleSaveCategory(category.id)}
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        className="button is-small"
                                        onClick={handleCancelEdit}
                                    >
                                        Отмена
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="button is-small is-danger"
                                    onClick={(e) => handleDeleteCategory(category.id, e)}
                                >
                                    Удалить
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
                <h3>Добавить новую категорию</h3>
                <input
                    type="text"
                    placeholder="Название категории"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Slug"
                    value={newCategorySlug}
                    onChange={(e) => setNewCategorySlug(e.target.value)}
                />
                <textarea
                    placeholder="Долгое описание"
                    value={newCategoryLongDescription}
                    onChange={(e) => setNewCategoryLongDescription(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
                <button className="button is-small is-primary" onClick={handleAddCategory}>
                    Добавить
                </button>
            </div>

            {modalVisible && (
                <Modal onClose={handleCancelEdit}>
                    <h3>Редактирование категории</h3>
                    <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={editCategorySlug}
                        onChange={(e) => setEditCategorySlug(e.target.value)}
                    />
                    <textarea
                        value={editCategoryLongDescription}
                        onChange={(e) => setEditCategoryLongDescription(e.target.value)}
                    />
                    <textarea
                        value={editCategoryDescription}
                        onChange={(e) => setEditCategoryDescription(e.target.value)}
                    />
                    <div>
                        <button
                            className="button is-small is-success"
                            onClick={() => handleSaveCategory(editingCategoryId!)}
                        >
                            Сохранить
                        </button>
                        <button
                            className="button is-small"
                            onClick={handleCancelEdit}
                        >
                            Отмена
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CategoriesTable;
