import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../../api/api.ts";
import Modal from "../../Modal.tsx";
import {HouseProject} from "../../../redux/features/house/houseProjectsSlice.ts";

interface HouseProjectsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: HouseProject[];
}

const HousesTable: React.FC = () => {
    const [houses, setHouses] = useState<HouseProject[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHouses = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get<HouseProjectsResponse[]>(`${config.API_URL}houses/`);
            setHouses(response.data.results);
        } catch {
            setError("Ошибка загрузки данных домов");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHouses();
    }, []);

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
        construction_technology: null
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
    type ImageType = 'images' | 'layout_images' | 'interior_images' | 'facade_images';

    const handleDeleteImage = async (houseId: number, imageId: number, imageType: ImageType) => {
        try {

            await axios.delete(`${config.API_URL}houses/${houseId}/images/${imageId}/delete/${imageType}/`);

            setHouseData((prevData) => {
                const newImages = prevData[imageType].filter((image) => image.id !== imageId);
                return { ...prevData, [imageType]: newImages };
            });
        } catch (error) {
            console.error('Error deleting image:', error);
        }
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

        (Object.keys(houseData) as (keyof typeof houseData)[]).forEach((key) => {
            const value = houseData[key];
            if (Array.isArray(houseData[key])) {
                houseData[key].forEach((item) => {
                    if (item instanceof File) {
                        formData.append(key, item);
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
            console.log('Sending FormData:', formData);

            if (editingHouseId) {
                const response = await axios.patch(`${config.API_URL}houses/update/${editingHouseId}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setHouses(houses.map(house => (house.id === editingHouseId ? { ...house, ...houseData } : house)));
            } else {
                const response = await axios.post(`${config.API_URL}houses/create`, formData, {
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
            category: null,
            construction_technology: null
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

    if (isLoading) {
        return <div>Загрузка данных домов...</div>;
    }

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }


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

                        <input placeholder="Название" name="title" value={houseData.title} onChange={handleChange}/>
                        <input placeholder="Цена" name="price" type="number" value={houseData.price || ''}
                               onChange={handleChange}/>
                        <input placeholder="Старая цена" name="old_price" type="number"
                               value={houseData.old_price || ''} onChange={handleChange}/>
                        <input placeholder="Скидка" name="discount" type="number" value={houseData.discount || ''}
                               onChange={handleChange}/>
                        <input placeholder="Площадь" name="area" type="number" value={houseData.area || ''}
                               onChange={handleChange}/>
                        <input placeholder="Этажи" name="floors" type="number" value={houseData.floors || ''}
                               onChange={handleChange}/>
                        <input placeholder="Комнаты" name="rooms" type="number" value={houseData.rooms || ''}
                               onChange={handleChange}/>
                        <input placeholder="Жилая площадь" name="living_area" type="number"
                               value={houseData.living_area || ''} onChange={handleChange}/>
                        <input placeholder="Кухонная площадь" name="kitchen_area" type="number"
                               value={houseData.kitchen_area || ''} onChange={handleChange}/>
                        <input placeholder="Спальни" name="bedrooms" type="number" value={houseData.bedrooms || ''}
                               onChange={handleChange}/>
                        <input placeholder="Тип сторительства" name="construction_technology" type="number" value={houseData.construction_technology || ''}
                               onChange={handleChange}/>
                        <label>
                            <input type="checkbox" name="garage" checked={houseData.garage}
                                   onChange={handleChange}/> Есть гараж
                        </label>
                        <input placeholder="Вместимость гаража" name="garage_capacity" type="number"
                               value={houseData.garage_capacity || ''} onChange={handleChange}/>
                        <input placeholder="Цель использования" name="purpose" value={houseData.purpose || ''}
                               onChange={handleChange}/>
                        <input placeholder="Ванные комнаты" name="bathrooms" type="number"
                               value={houseData.bathrooms || ''} onChange={handleChange}/>
                        <input placeholder="Время строительства (в днях)" name="construction_time" type="number"
                               value={houseData.construction_time || ''} onChange={handleChange}/>
                        <input placeholder="Гарантия (в годах)" name="warranty" type="number"
                               value={houseData.warranty || ''} onChange={handleChange}/>
                        <textarea placeholder="Описание" name="description" value={houseData.description || ''}
                                  onChange={handleChange}/>
                        <select name="category" value={houseData.category || ''} onChange={handleChange}>
                            <option value="">Выберите категорию</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div>
                            <label>Изображения</label>
                            <input type="file" multiple onChange={(e) => handleFileChange(e, 'images')}/>
                            {houseData.images.map((image) => (
                                <div key={image.id}>
                                    <img src={`${config.API_URL}${image.image}`} alt={`Image ${image.id}`} width={100}/>
                                    <button type="button"
                                            onClick={() => handleDeleteImage(houseData.id, image.id, 'images')}>
                                        Удалить
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label>Планировка</label>
                            <input type="file" multiple onChange={(e) => handleFileChange(e, 'layout_images')}/>
                            {houseData.layout_images.map((image) => (
                                <div key={image.id}>
                                    <img src={`${config.API_URL}${image.image}`} alt={`Layout Image ${image.id}`}
                                         width={100}/>
                                    <button type="button"
                                            onClick={() => handleDeleteImage(houseData.id, image.id, 'layout_images')}>
                                        Удалить
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label>Интерьер</label>
                            <input type="file" multiple onChange={(e) => handleFileChange(e, 'interior_images')}/>
                            {houseData.interior_images.map((image) => (
                                <div key={image.id}>
                                    <img src={`${config.API_URL}${image.image}`} alt={`Interior Image ${image.id}`}
                                         width={100}/>
                                    <button type="button"
                                            onClick={() => handleDeleteImage(houseData.id, image.id, 'interior_images')}>
                                        Удалить
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label>Фасад</label>
                            <input type="file" multiple onChange={(e) => handleFileChange(e, 'facade_images')}/>
                            {houseData.facade_images.map((image) => (
                                <div key={image.id}>
                                    <img src={`${config.API_URL}${image.image}`} alt={`Facade Image ${image.id}`}
                                         width={100}/>
                                    <button type="button"
                                            onClick={() => handleDeleteImage(houseData.id, image.id, 'facade_images')}>
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
