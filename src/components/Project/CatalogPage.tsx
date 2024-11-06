import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilterBar from "./FilterBar";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategoryInfo, fetchProjectsByCategory} from "../../redux/features/house/houseProjectsSlice";
import CatalogMenu from "./CatalogMenu";
import HouseProjectList from "./product/HouseProjectList";
import Skeleton from "react-loading-skeleton";


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
        return <article className="catalog-href">
            <span className="text-main grey"><Skeleton width="35%" count={1} height={40}/></span>
            <h1 className='title-main skeleton-text'><Skeleton width="40%" count={1} height={40}/></h1>
            <p className="skeleton-text"><Skeleton width="100%" count={2} height={20}/></p>
        </article>
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
                            <div className="icon-result">
                                <i className="fa-regular fa-circle-xmark fa-shake fa-4x" style={{color: '#000'}}></i>
                            </div>
                            <article>
                                <p className='text-main'>К сожалению, раздел пуст</p>
                                <span className="text-span">В данный момент нет активных товаров</span>
                            </article>
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
