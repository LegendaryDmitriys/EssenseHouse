import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../../api/api.ts";
import Modal from "../../Modal.tsx";

const HousesTable = ({ houses, setHouses }) => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [houseData, setHouseData] = useState({
        id: null,
        title: '',
        price: '',
        old_price: '',
        discount: '',
        best_seller: '',
        new: false,
        short_description: '',
        area: '',
        floors: '',
        rooms: '',
        living_area: '',
        kitchen_area: '',
        bedrooms: '',
        garage: false,
        garage_capacity: '',
        purpose: '',
        bathrooms: '',
        construction_time: '',
        warranty: '',
        description: '',
        categoryId: '',
        images: [],
        layout_images: [],
        interior_images: [],
        facade_images: [],
        finishing_options: [],
        documents: []
    });
    const [editingHouseId, setEditingHouseId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategoriesAndTechnologies = async () => {
            try {
                const categoryResponse = await axios.get(`${config.API_URL}category/`);
                const technologyResponse = await axios.get(`${config.API_URL}construction-technologies`);
                setCategories(categoryResponse.data);
                setTechnologies(technologyResponse.data);
            } catch (error) {
                console.error('Ошибка при получении категорий и технологий', error);
            }
        };
        fetchCategoriesAndTechnologies();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        if (selectedFiles && selectedFiles.length > 0) {
            Array.from(selectedFiles).forEach((file) => {
                formData.append('houses', file);
            });
        }

        try {
            const response = await axios.post(`${config.API_URL}houses/${editingHouseId}/images/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.message) {
                alert('Изображения успешно загружены');
            } else {
                alert('Не удалось загрузить изображения');
            }
        } catch (error) {
            console.error('Ошибка при загрузке изображений', error.response?.data || error.message);
            alert('Ошибка при загрузке изображений');
        }
    };

    const handleSubmitHouse = async () => {
        const updatedData = {};

        // Добавляем только измененные поля в объект updatedData
        Object.keys(houseData).forEach((key) => {
            // Сравниваем значения текущего состояния с теми, что были до редактирования
            if (houseData[key] !== houses.find((house) => house.id === editingHouseId)[key]) {
                updatedData[key] = houseData[key];
            }
        });

        try {
            const response = await axios.patch(`${config.API_URL}houses/${editingHouseId}/`, updatedData);
            setHouses(houses.map(house => (house.id === editingHouseId ? response.data : house)));
            await handleUpload();
            setIsModalOpen(false);
            resetHouseData();
        } catch (error) {
            console.error('Ошибка при сохранении дома', error);
        }
    };

    const handleEditClick = (house) => {
        setEditingHouseId(house.id);
        setHouseData({
            ...house,
            categoryId: house.category.id.toString(),
            new: house.new || false,
            garage: house.garage || false
        });
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
            price: '',
            old_price: '',
            discount: '',
            best_seller: '',
            new: false,
            short_description: '',
            area: '',
            floors: '',
            rooms: '',
            living_area: '',
            kitchen_area: '',
            bedrooms: '',
            garage: false,
            garage_capacity: '',
            purpose: '',
            bathrooms: '',
            construction_time: '',
            warranty: '',
            description: '',
            categoryId: '',
            images: [],
            layout_images: [],
            interior_images: [],
            facade_images: [],
            finishing_options: [],
            documents: []
        });
    };

    return (
        <div>
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
                        <td>{house.category.name}</td>
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
                        <input
                            placeholder="Название"
                            value={houseData.title}
                            onChange={(e) => setHouseData({...houseData, title: e.target.value})}
                        />
                        <input
                            placeholder="Цена"
                            value={houseData.price}
                            onChange={(e) => setHouseData({...houseData, price: e.target.value})}
                        />
                        <input
                            placeholder="Старая цена"
                            value={houseData.old_price}
                            onChange={(e) => setHouseData({...houseData, old_price: e.target.value})}
                        />
                        <input
                            placeholder="Скидка"
                            value={houseData.discount}
                            onChange={(e) => setHouseData({...houseData, discount: e.target.value})}
                        />
                        <input
                            placeholder="Площадь"
                            value={houseData.area}
                            onChange={(e) => setHouseData({...houseData, area: e.target.value})}
                        />
                        <input
                            placeholder="Этажи"
                            value={houseData.floors}
                            onChange={(e) => setHouseData({...houseData, floors: e.target.value})}
                        />
                        <input
                            placeholder="Количество комнат"
                            value={houseData.rooms}
                            onChange={(e) => setHouseData({...houseData, rooms: e.target.value})}
                        />
                        <input
                            placeholder="Жилая площадь"
                            value={houseData.living_area}
                            onChange={(e) => setHouseData({...houseData, living_area: e.target.value})}
                        />
                        <input
                            placeholder="Кухня"
                            value={houseData.kitchen_area}
                            onChange={(e) => setHouseData({...houseData, kitchen_area: e.target.value})}
                        />
                        <input
                            placeholder="Спальни"
                            value={houseData.bedrooms}
                            onChange={(e) => setHouseData({...houseData, bedrooms: e.target.value})}
                        />
                        <input
                            placeholder="Гараж"
                            value={houseData.garage ? 'Да' : 'Нет'}
                            onChange={(e) => setHouseData({...houseData, garage: e.target.value === 'Да'})}
                        />
                        <input
                            placeholder="Цель"
                            value={houseData.purpose}
                            onChange={(e) => setHouseData({...houseData, purpose: e.target.value})}
                        />
                        <textarea
                            placeholder="Описание"
                            value={houseData.description}
                            onChange={(e) => setHouseData({...houseData, description: e.target.value})}
                        />
                        <div className="image-gallery">
                            {houseData.images.length > 0 && houseData.images.map((image, index) => (
                                <img key={index} src={`${config.API_URL}${image.image}`} alt={`House Image ${index + 1}`}
                                     className="image-preview"/>
                            ))}
                        </div>
                        <label>
                            Добавить изображения:
                            <input type="file" multiple onChange={handleFileChange}/>
                        </label>
                        <button className="button is-primary" onClick={handleSubmitHouse}>
                            Сохранить
                        </button>
                        <button className="button is-secondary" onClick={handleUpload}>
                            Загрузить изображения
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default HousesTable;
