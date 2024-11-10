import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../../api/api.ts";
import Modal from "../../Modal.tsx";

const HousesTable = ({ houses, setHouses }) => {
    const [selectedFiles, setSelectedFiles] = useState({
        images: null,
        layout_images: null,
        interior_images: null,
        facade_images: null,
        finishing_options: null,
        documents: null,
    });
    const [houseData, setHouseData] = useState({
        id: null,
        title: '',
        images: [],
        layout_images: [],
        interior_images: [],
        facade_images: [],
        finishing_options: [],
        documents: [],
        price: 0,
        old_price: 0,
        discount: 0,
        best_seller: '',
        new: false,
        short_description: '',
        area: 0,
        floors: 1,
        rooms: 1,
        living_area: 0,
        kitchen_area: 0,
        bedrooms: 1,
        garage: false,
        garage_capacity: 0,
        purpose: '',
        bathrooms: 1,
        construction_time: 0,
        warranty: 0,
        description: '',
        category: null,
        construction_technology: 6
    });
    const [editingHouseId, setEditingHouseId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await axios.get(`${config.API_URL}category/`);
                setCategories(categoryResponse.data);
            } catch (error) {
                console.error('Ошибка при получении категорий', error);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = (e, field) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prevFiles) => ({
            ...prevFiles,
            [field]: files,
        }));
    };

    const handleDeleteImage = (field, imageIndex) => {
        setHouseData((prevData) => {
            const newImages = prevData[field].filter((_, index) => index !== imageIndex);
            return { ...prevData, [field]: newImages };
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setHouseData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmitHouse = async () => {
        const formData = new FormData();

        Object.keys(houseData).forEach((key) => {
            if (Array.isArray(houseData[key])) {
                houseData[key].forEach((item) => {
                    if (item instanceof File) {
                        formData.append(key, item); // Добавляем файл напрямую
                    }
                });
            } else {
                formData.append(key, houseData[key]);
            }
        });


        Object.keys(selectedFiles).forEach((field) => {
            selectedFiles[field]?.forEach((file) => {
                formData.append(field, file);
            });
        });

        try {
            if (editingHouseId) {
                const response = await axios.patch(`${config.API_URL}houses/update/${editingHouseId}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                setHouses(houses.map(house => (house.id === editingHouseId ? { ...house, ...houseData } : house)));
            } else {
                const response = await axios.post(`${config.API_URL}houses/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                setHouses([...houses, response.data]);
            }

            setIsModalOpen(false);
            resetHouseData();
        } catch (error) {
            console.error('Ошибка при сохранении дома:', error);
        }
    };

    const handleAddNewHouse = () => {
        resetHouseData();
        setEditingHouseId(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (house) => {
        setEditingHouseId(house.id);
        setHouseData({ ...house });
        setIsModalOpen(true);
    };

    const handleCancelEdit = () => {
        setEditingHouseId(null);
        setIsModalOpen(false);
        resetHouseData();
    };

    const resetHouseData = () => {
        setHouseData({
            id: null,
            title: '',
            images: [],
            layout_images: [],
            interior_images: [],
            facade_images: [],
            finishing_options: [],
            documents: [],
            price: null,
            old_price: null,
            discount: null,
            best_seller: '',
            new: false,
            short_description: '',
            area: null,
            floors: null,
            rooms: null,
            living_area: null,
            kitchen_area: null,
            bedrooms: null,
            garage: false,
            garage_capacity: null,
            purpose: '',
            bathrooms: null,
            construction_time: null,
            warranty: null,
            description: '',
            category: null
        });
        setSelectedFiles({
            images: null,
            layout_images: null,
            interior_images: null,
            facade_images: null,
            finishing_options: null,
            documents: null,
        });
    };

    const handleDeleteHouse = async (houseId) => {
        try {
            await axios.delete(`${config.API_URL}houses/${houseId}/`);
            setHouses(houses.filter(house => house.id !== houseId));
        } catch (error) {
            console.error('Ошибка при удалении дома:', error);
        }
    };

    return (
        <div>
            <button className="button is-primary" onClick={handleAddNewHouse}>
                Добавить новый дом
            </button>

            <table className="table is-fullwidth is-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Категория</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {houses.map((house) => (
                    <tr key={house.id}>
                        <td>{house.id}</td>
                        <td>{house.title}</td>
                        <td>{house.price} ₽</td>
                        <td>{house.category?.name}</td>
                        <td>
                            <button className="button is-small is-info" onClick={() => handleEditClick(house)}>
                                Редактировать
                            </button>
                            <button className="button is-small is-danger" onClick={() => handleDeleteHouse(house.id)}>
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && (
                <Modal onClose={handleCancelEdit}>
                    <div className="modal-content">
                        <h3>{editingHouseId ? 'Редактировать дом' : 'Добавить новый дом'}</h3>

                        <input placeholder="Название" name="title" value={houseData.title} onChange={handleChange} />
                        <input placeholder="Цена" name="price" type="number" value={houseData.price || ''} onChange={handleChange} />
                        <input placeholder="Старая цена" name="old_price" type="number" value={houseData.old_price || ''} onChange={handleChange} />
                        <input placeholder="Скидка" name="discount" type="number" value={houseData.discount || ''} onChange={handleChange} />
                        <input placeholder="Категория" name="category" value={houseData.category || ''} onChange={handleChange} />
                        <input placeholder="Количество ванных комнат" name="bathrooms" value={houseData.bathrooms || ''} onChange={handleChange} />
                        <input placeholder="Количество спален" name="bedrooms" value={houseData.bedrooms || ''} onChange={handleChange} />
                        <input placeholder="Время строительства" name="construction_time" value={houseData.construction_time || ''} onChange={handleChange} />
                        <input placeholder="Этажи" name="floors" value={houseData.floors || ''} onChange={handleChange} />
                        <input placeholder="Площадь кухни" name="kitchen_area" value={houseData.kitchen_area || ''} onChange={handleChange} />
                        <input placeholder="Живая площадь" name="living_area" value={houseData.living_area || ''} onChange={handleChange} />
                        <div>
                            <label>Изображения</label>
                            <input type="file" multiple onChange={(e) => handleFileChange(e, 'images')} />
                            {houseData.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`Image ${index}`} width={100} />
                                    <button type="button" onClick={() => handleDeleteImage('images', index)}>
                                        Удалить
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button className="button is-primary" onClick={handleSubmitHouse}>
                            {editingHouseId ? 'Обновить дом' : 'Добавить дом'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default HousesTable;
