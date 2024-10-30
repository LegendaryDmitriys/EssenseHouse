import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilterBar from "./FilterBar";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategoryInfo, fetchProjectsByCategory} from "../../redux/features/house/houseProjectsSlice";
import CatalogMenu from "./CatalogMenu";
// import CatalogPageSkeleton from "../Skeleton/CatalogPageSkeleton";
import HouseProjectList from "./product/HouseProjectList";

export interface ProjectImage {
    image: string;
}

export interface HouseProject {
    id: number;
    title: string;
    price?: number;
    old_price?: number;
    discount?: number;
    best_seller?: string;
    new?: boolean;
    images: ProjectImage[];
}



const CatalogPage: React.FC = () => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const dispatch: AppDispatch = useDispatch();
    const { houseProjects, categoryInfo, loading, error } = useSelector((state: RootState) => state.houseProjects);
    const { category } = useParams();

    useEffect(() => {
        if (category) {
            dispatch(fetchCategoryInfo(category));
        }
    }, [category, dispatch]);


    useEffect(() => {
        if (category) {
            dispatch(fetchProjectsByCategory({ category, filters }));
        }
    }, [category, filters, dispatch]);

    const handleFilterChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
    };


    if (loading) {
        // return <CatalogPageSkeleton />;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!categoryInfo) {
        return <p>Информация о категории не найдена.</p>;
    }

    return (
        <div className="container">
            <article className="catalog-href">
                <span className="text-main grey">Главная - Типовые проекты - {categoryInfo.name}</span>
                <h1 className='title-main black'>{categoryInfo.name}</h1>
                <p>{categoryInfo.short_description}</p>
            </article>

            <div className="columns">
                <aside className="column is-one-quarter">
                    <CatalogMenu />
                </aside>
                <div className="column is-three-quarters">
                    <FilterBar onFilterChange={handleFilterChange} />
                    {houseProjects.length === 0 ? (
                        <div className="no-results">
                            <p>Ничего не найдено по выбранным фильтрам.</p>
                        </div>
                    ) : (
                        <HouseProjectList houseProjects={houseProjects} />
                    )}
                    <p className="mt-5 text-main grey">{categoryInfo.long_description}</p>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
