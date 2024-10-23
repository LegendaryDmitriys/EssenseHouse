import React, {useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store.ts";
import {fetchCategories} from "../../redux/features/category/categorySlice.ts";
import CatalogMenuSkeleton from "../Skeleton/CatalogMenuSkeleton.tsx";

const useFetchCategories = () => {
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector((state: RootState) => state.categories.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);
};


const CatalogMenu: React.FC = React.memo(() => {
    const [isActive, setIsActive] = useState(false);

    useFetchCategories();

    const categories = useSelector((state: RootState) => state.categories.items);
    const status = useSelector((state: RootState) => state.categories.status);
    const error = useSelector((state: RootState) => state.categories.error);

    const toggleDropdown = useCallback(() => {
        setIsActive((prevState) => !prevState);
    }, []);

    if (status === 'loading') {
        return <div>
            <CatalogMenuSkeleton/>
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
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
});

export default CatalogMenu;
