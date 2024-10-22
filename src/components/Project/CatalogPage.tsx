import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FilterBar from "./FilterBar.tsx";
import {AppDispatch, RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchProjectsByCategory} from "../../redux/features/house/houseProjectsSlice.ts";
import CatalogMenu from "./CatalogMenu.tsx";
// @ts-ignore
import {ROUTES} from "../../utils/routes";
import {formatNumber} from "../../utils/formatNumber.ts";

const CatalogPage: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const { houseProjects, categoryInfo, loading, error } = useSelector((state: RootState) => state.houseProjects);
    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        if (category) {
            dispatch(fetchProjectsByCategory(category));
        }
    }, [category, dispatch]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!categoryInfo) {
        return <p>Категория не найдена.</p>;
    }


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
                                        <Link to={ROUTES.ProjectDetail.replace(':id', project.id.toString())}>
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
                                            {project.price && <span className="new-price text-main">{formatNumber(project.price)} ₽</span>}
                                            {project.discount && (
                                                <div className="discount">
                                                    <span className="old-price text-main">{formatNumber(project.old_price)} ₽</span>
                                                    <span className="discount-price">- {formatNumber(project.discount)} ₽</span>
                                                </div>
                                            )}
                                        </div>
                                        <Link to={`/project/details/${project.id}`} className="button is-primary">
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