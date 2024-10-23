import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(x => x);
        return paths.map((path, index) => {
            const url = `/${paths.slice(0, index + 1).join('/')}`;
            return { name: path, url };
        });
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Главная</Link>
                    </li>
                    {breadcrumbs.map((crumb, index) => (
                        <li className="breadcrumb-item" key={index}>
                            <Link to={crumb.url}>{crumb.name}</Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumbs;