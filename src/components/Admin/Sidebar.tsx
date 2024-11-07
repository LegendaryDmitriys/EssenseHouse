import React, { useState } from 'react';
import '../../styles/admin/Sidebar.css';
import { ROUTES } from "../../utils/routes";
import sprite from "../../../public/sprite.svg";
import { Link } from "react-router-dom";


const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!isCollapsed && (
                    <div className="logo">
                        <Link to={ROUTES.Home}>
                            <svg className="logo-icon" width={190} height={25} style={{color:"black"}}>
                                <use xlinkHref={sprite + "#logo"} />
                            </svg>
                        </Link>
                    </div>
                )}
                <button onClick={toggleSidebar} className="toggle-button">
                    <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                </button>
            </div>
            <nav className="menu">
                <ul>
                    <li>
                        <Link to={ROUTES.AdminDashboard}>
                            <i className="fas fa-th-large"></i>
                            <span className="menu-text">Дэшборд</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.AdminPurchaseHouse}>
                            <i className="fas fa-home"></i>
                            <span className="menu-text">Cтроительство домов</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.AdminOrders}>
                            <i className="fas fa-home"></i>
                            <span className="menu-text">Заказы</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.AdminComment}>
                            <i className="fas fa-comment"></i>
                            <span className="menu-text">Комментарии</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.AdminQuestions}>
                            <i className="fas fa-comment"></i>
                            <span className="menu-text">Вопросы</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.AdminTable}>
                            <i className="fa-solid fa-database"></i>
                            <span className="menu-text">База-данных</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
