import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


import axios from 'axios';
import FilterBar from "./FilterBar.tsx";
import {ROUTES} from "../../utils/routes";
import CatalogMenu from "./CatalogMenu.tsx";
import project from "../../pages/Project.tsx";

interface HouseProject {
    id: number;
    title: string;
    images: { id: number; image: string }[];
    price?: number;
    old_price?: number;
    discount?: number;
    best_seller?: string;
    new?: boolean;
    short_description?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    long_description: string;
}


const CatalogPage: React.FC = () => {
    const [houseProjects, setHouseProjects] = useState<HouseProject[]>([]);
    const [categoryInfo, setCategoryInfo] = useState<Category[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://192.168.0.103:8000/houses?category=${category}`);
                setHouseProjects(response.data);
                setCategoryInfo(response.data[0].category);

            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchProjects();
    }, [category]);





    return (
        <div className="container">
            <article className="catalog-href">
                <span className="text-main grey">Главная - Типовые проекты - {categoryInfo.name}</span>
                <h1 className='title-main'>{categoryInfo.name}</h1>
                <p>{categoryInfo.short_description}</p>
            </article>

            <div className="columns">
                <aside className="column is-one-quarter">
                    <CatalogMenu/>
                </aside>
                <div className="column is-three-quarters">
                    <FilterBar/>
                    <div className="columns is-multiline mt-5">
                        {houseProjects.map((project, index) => (
                            <div className="column is-one-third" key={project.id}>
                                <div
                                    className="card project-card"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className="card-image">
                                        <Link to={`${ROUTES.GlulamHouse}/${project.id}`}>
                                            <figure className="image is-4by3">
                                                <img
                                                    src={
                                                        hoveredIndex === index && project.images.length > 1
                                                            ? `http://192.168.0.103:8000${project.images[1]?.image}`
                                                            : `http://192.168.0.103:8000${project.images[0]?.image}`
                                                    }
                                                    alt={project.title}
                                                    className="project-image"
                                                />
                                            </figure>
                                        </Link>
                                        <div className="tags-wrapper">
                                            {project.best_seller === 'Акция' ? <span className="tag is-warning">Акция</span> : null}
                                            {project.new ? <span className="tag is-success">Новинка</span> : null}
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <p className="project-title">{project.title}</p>
                                        <div className="project-price">
                                            {project.price && <span className="new-price text-main">{project.price} ₽</span>}
                                            {project.discount && (
                                                <div className="discount">
                                                    <span className="old-price text-main">{project.old_price} ₽</span>
                                                    <span className="discount-price">- {project.discount} ₽</span>
                                                </div>
                                            )}
                                        </div>
                                        <p>{project.id}</p>
                                        <Link to={`/project/details/${project.id}/:category`} className="button is-primary">
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-5 text-main grey">{categoryInfo.long_description}</p>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
