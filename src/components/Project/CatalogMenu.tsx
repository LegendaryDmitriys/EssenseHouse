import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface CatalogMenuProps {}

interface Category {
    id: number;
    name: string;
    slug: string;
}

const CatalogMenu: React.FC<CatalogMenuProps> = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://192.168.0.103:8000/category/');
                setCategories(response.data);
            } catch (err) {
                setError('Ошибка загрузки категорий.');
            }
        };

        fetchCategories();
    }, []);

    const toggleDropdown = () => {
        setIsActive(!isActive);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (categories.length === 0) {
        return <div>Категории не найдены.</div>;
    }

    return (
        <nav className="panel">
            <h3 className="panel-heading" onClick={toggleDropdown} style={{cursor: 'pointer'}}>
                Каталог
                <span className="icon is-small" style={{marginLeft: '10px'}}>
                    <i className={`fas ${isActive ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                </span>
            </h3>
            <div className={`panel-blocks ${isActive ? '' : 'is-hidden'}`}>
                {categories.map((category) => (
                    <Link key={category.id} className="panel-block" to={`/catalog/${category.slug}`}>
                        {category.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default CatalogMenu;
