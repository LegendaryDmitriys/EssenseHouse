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
            const token = localStorage.getItem("accessToken");
            const response = await axios.get<HouseProjectsResponse[]>(`${config.API_URL}houses/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
        discount_percentage: 0,
        best_seller: '',
        new: false,
        short_description: '',
        area: 0,
        floors: 1,
        rooms: 1,
        living_area: 0,
        kitchen_area: 0,
        bedrooms: 1,
        garage: 0,
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
    const [finishingOptions, setFinishingOptions] = useState([]);
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
        const fetchFinishingOptions = async () => {
            try {
                const finishingResponse = await axios.get(`${config.API_URL}finishing-options/`);
                setFinishingOptions(finishingResponse.data);
            } catch (error) {
                console.error('Ошибка при получении отделок', error);
            }
        };
        fetchFinishingOptions();
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
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${config.API_URL}houses/${houseId}/images/${imageId}/delete/${imageType}/`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setHouseData((prevData) => {
                const newImages = prevData[imageType].filter((image) => image.id !== imageId);
                return { ...prevData, [imageType]: newImages };
            });
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleDeleteDocument = async (houseId: number, documentId: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`${config.API_URL}houses/${houseId}/documents/${documentId}/delete/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHouseData((prevData) => {
                const newDocuments = prevData.documents.filter((doc) => doc.id !== documentId);
                return { ...prevData, documents: newDocuments };
            });

        } catch (error) {
            console.error('Ошибка при удалении документа:', error);
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
            const token = localStorage.getItem('accessToken')

            if (editingHouseId) {
                const response = await axios.patch(`${config.API_URL}houses/update/${editingHouseId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHouses(houses.map(house => (house.id === editingHouseId ? { ...house, ...houseData } : house)));
            } else {
                const response = await axios.post(`${config.API_URL}houses/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
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
            discount_percentage: null,
            best_seller: '',
            new: false,
            short_description: '',
            area: null,
            floors: null,
            rooms: null,
            living_area: null,
            kitchen_area: null,
            bedrooms: null,
            garage: null,
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
            const token = localStorage.getItem('accessToken');
            await axios.delete(`${config.API_URL}houses/${houseId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

    console.log(houseData)

    return (
        <div>
            <table className="table is-fullwidth is-stripedv is-white">
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
                        <td>{house.category_details?.name}</td>
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
            <button className="button is-small is-primary" onClick={handleAddNewHouse}>
                Добавить новый дом
            </button>

            {isModalOpen && (
                <Modal onClose={handleCancelEdit}>
                        <h3 className="subtitle">{editingHouseId ? 'Редактировать дом' : 'Добавить новый дом'}</h3>

                        <input placeholder="Название" name="title" value={houseData.title} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <input placeholder="Цена" name="price" type="number" value={houseData.price || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Скидка" name="discount_percentage" type="number" value={houseData.discount_percentage || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Площадь" name="area" type="number" value={houseData.area || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Этажи" name="floors" type="number" value={houseData.floors || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Комнаты" name="rooms" type="number" value={houseData.rooms || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Жилая площадь" name="living_area" type="number"
                               value={houseData.living_area || ''} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <input placeholder="Кухонная площадь" name="kitchen_area" type="number"
                               value={houseData.kitchen_area || ''} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <input placeholder="Спальни" name="bedrooms" type="number" value={houseData.bedrooms || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Тип сторительства" name="construction_technology" type="number"
                               value={houseData.construction_technology || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Вместимость гаража" name="garage" type="number"
                               value={houseData.garage || ''} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <input placeholder="Цель использования" name="purpose" value={houseData.purpose || ''}
                               onChange={handleChange} className="input is-small white-input text-main"/>
                        <input placeholder="Ванные комнаты" name="bathrooms" type="number"
                               value={houseData.bathrooms || ''} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <input placeholder="Время строительства (в днях)" name="construction_time" type="number"
                               value={houseData.construction_time || ''} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <input placeholder="Гарантия (в годах)" name="warranty" type="number"
                               value={houseData.warranty || ''} onChange={handleChange}
                               className="input is-small white-input text-main"/>
                        <textarea placeholder="Описание" name="description" value={houseData.description || ''}
                                  onChange={handleChange} className="input is-small white-textarea text-main"/>
                        <select name="category" value={houseData.category || ''} onChange={handleChange}
                                className="select is-small white-textarea text-main">
                            <option value="">Выберите категорию</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <select name="finishing_options" value={houseData.finishing_options || ''}
                                onChange={handleChange}
                                className="select is-small white-textarea text-main">
                            <option value="">Выберите отделку</option>
                            {finishingOptions.map((finishingOption) => (
                                <option key={finishingOption.id}
                                        value={finishingOption.id}>{finishingOption.title}</option>
                            ))}
                        </select>
                        <div>
                            <label className="text-main is-small">Изображения</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e, 'images')}
                                className="input is-small white-input text-main"
                            />
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
                            <label className="text-main is-small">Планировка</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e, 'layout_images')}
                                className="input is-small white-input text-main"/>
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
                            <label className="text-main is-small">Интерьер</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e, 'interior_images')}
                                className="input is-small white-input text-main"
                            />
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
                            <label className="text-main is-small">Фасад</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e, 'facade_images')}
                                className="input is-small white-input text-main"
                            />
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
                        <label className="text-main is-small">Документы</label>
                        <input
                            type="file"
                            name="documents"
                            accept=".pdf, .doc, .docx, .txt"
                            onChange={(e) => handleFileChange(e, 'documents')}
                            multiple
                            className="input is-small white-input text-main"
                        />
                        {houseData.documents && houseData.documents.length > 0 && (
                            <div>
                                <h4 className="text-main is-small">Загруженные документы:</h4>
                                <ul>
                                    {houseData.documents.map((doc) => (
                                        <li key={doc.id}>
                                            <a href={`${config.API_URL}${doc.file}`} target="_blank"
                                               rel="noopener noreferrer">
                                                {doc.title}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteDocument(houseData.id, doc.id)}>
                                                Удалить
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button className="button is-primary" onClick={handleSubmitHouse}>
                            {editingHouseId ? 'Обновить дом' : 'Добавить дом'}
                        </button>
                </Modal>
            )}
        </div>
    );
};

export default HousesTable;
