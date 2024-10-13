import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ROUTES } from "../utils/routes";
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
      <header className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'} container section`}>
        <div className="navbar-logo">
          {/*<img src="../../public/logo-white.png" alt="Essense House" className="logo" />*/}
          <svg className='logo' width={134} height={51}>
            <use xlinkHref={sprite + "#logo"}/>
          </svg>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Link className={`navbar-item mr-5 text-main`} style={{ color: color }} to={ROUTES.Project}>
              Проекты
            </Link>
            <Link className={`navbar-item mr-5 text-main`} style={{ color: color }} to="#about">
              О нас
            </Link>
            <Link className={`navbar-item mr-5 text-main`} style={{ color: color }} to="#pricing">
              Стоимость
            </Link>
            <Link className={`navbar-item mr-5 text-main`} style={{ color: color }} to={ROUTES.Contacts}>
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
