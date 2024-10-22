import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store.ts";
import {fetchCategories} from "../../redux/features/category/categorySlice.ts";


const CatalogMenu: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.items);
    const status = useSelector((state: RootState) => state.categories.status);
    const error = useSelector((state: RootState) => state.categories.error);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Загрузка категорий...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



    const toggleDropdown = () => {
        setIsActive(!isActive);
    };
    //
    // if (error) {
    //     return <div>{error}</div>;
    // }
    //
    // if (categories.length === 0) {
    //     return <div>Категории не найдены.</div>;
    // }

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
