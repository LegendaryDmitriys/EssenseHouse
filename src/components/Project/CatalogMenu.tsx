import React from 'react';
import { Link, useLocation } from "react-router-dom";
import {ROUTES} from "../../utils/routes";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore


const CatalogMenu: React.FC = () => {
    const location = useLocation();

    const isLinkActive = (route: string) => {
        return location.pathname === route;
    };

    return (
        <aside className="column is-one-quarter">
            <nav className="panel">
                <h3 className="panel-heading">
                    Каталог
                </h3>
                <div className="panel-blocks">
                    <Link className={`panel-block ${isLinkActive(ROUTES.FrameHouse) ? 'is-active' : ''}`} to={ROUTES.FrameHouse}>
                        Каркасные дома
                    </Link>
                    <Link className={`panel-block ${isLinkActive(ROUTES.LogHouse) ? 'is-active' : ''}`} to={ROUTES.LogHouse}>
                        Дома из оцилиндрованного бревна
                    </Link>
                    <Link className={`panel-block ${isLinkActive(ROUTES.GlulamHouse) ? 'is-active' : ''}`} to={ROUTES.GlulamHouse}>
                        Дома из клееного бруса
                    </Link>
                </div>
            </nav>
        </aside>
    );
};

export default CatalogMenu;
