import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ROUTES } from "../utils/routes.js";
import { Link } from "react-router-dom";

import sprite from "../../public/sprite.svg";

interface HeaderProps {
  color: string;
}

const Header: React.FC<HeaderProps> = ({ color }) => {
  const [isScrolled, setIsScrolled] = useState(false);


  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <header className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'} container`}>
        <div className="navbar-logo">
          <Link to={ROUTES.Home}>
            <svg className='logo' width={190} height={25}>
              <use xlinkHref={sprite + "#logo"}/>
            </svg>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Link className={`navbar-item mr-5 text-main`} to={ROUTES.Project}>
              Проекты
            </Link>
            <Link className={`navbar-item mr-5 text-main`} to={ROUTES.About}>
              О нас
            </Link>
            <Link className={`navbar-item mr-5 text-main`} to={ROUTES.Reviews}>
              Отзывы
            </Link>
            <Link className={`navbar-item mr-5 text-main`} to={ROUTES.Contacts}>
              Контакты
            </Link>
          </div>
          <div className="navbar-end">
            <a className="navbar-item" href="https://wa.me/380507774450">
            <span className="icon" style={{ color: color }}>
              <i className="fab fa-whatsapp"></i>
            </span>
            </a>
            <a className="navbar-item" href="https://t.me/username">
            <span className="icon" style={{ color: color }}>
              <i className="fab fa-telegram"></i>
            </span>
            </a>
            <a className="navbar-item" style={{ color: color }} href="https://instagram.com/username">
            <span className="icon" style={{ color: color }}>
              <i className="fab fa-instagram"></i>
            </span>
            </a>
            <span className="navbar-item">
            <a className={`text-main`} style={{ color: color }} href="tel:+380507774450">
              +38 (050) 777-44-50
            </a>
          </span>
          </div>
        </div>
      </header>
  );
};

export default Header;
