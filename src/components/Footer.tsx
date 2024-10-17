import React from 'react'
import sprite from "../../public/sprite.svg";
import {Link} from "react-router-dom";
// @ts-ignore
import {ROUTES} from "../utils/routes.js";



const Footer: React.FC = () => {
    return (
        <>
            <footer className='footer navbar'>
                <div className="navbar-logo">
                    <Link to={ROUTES.Home}>
                        <svg className='logo-footer' width={190} height={21} fill="white">
                            <use xlinkHref={sprite + "#logo"}/>
                        </svg>
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <Link className="navbar-item mr-5" to={ROUTES.Project}>
                            Проекты
                        </Link>
                        <Link className="navbar-item mr-5" to={ROUTES.About}>
                            О нас
                        </Link>
                        <a className="navbar-item mr-5" href="#pricing">
                            Стоимость
                        </a>
                        <Link className="navbar-item mr-5" to={ROUTES.Contacts}>
                            Контакты
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <a className="navbar-item" href="https://wa.me/380507774450">
                        <span className="icon">
                            <i className="fab fa-whatsapp"></i>
                        </span>
                        </a>
                        <a className="navbar-item" href="https://t.me/username">
                        <span className="icon">
                            <i className="fab fa-telegram"></i>
                        </span>
                        </a>
                        <a className="navbar-item" href="https://instagram.com/username">
                        <span className="icon">
                            <i className="fab fa-instagram"></i>
                        </span>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;