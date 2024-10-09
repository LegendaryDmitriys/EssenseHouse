import React from 'react';


interface HeaderProps {
  color: string; 
}

const Header: React.FC<HeaderProps> = ({ color }) => {
  return (
    <header className="navbar navbar-transparent container section">
      <div className="navbar-logo">
        <img src="../../public/logo-white.png" alt="Essense House" className="logo" />
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <a className={`navbar-item mr-5 text-main`} style={{ color: color }} href="#projects">
            Проекты
          </a>
          <a className={`navbar-item mr-5 text-main`} style={{ color: color }} href="#about">
            О нас
          </a>
          <a className={`navbar-item mr-5 text-main`} style={{ color: color }} href="#pricing">
            Стоимость
          </a>
          <a className={`navbar-item mr-5 text-main`} style={{ color: color }} href="#contacts">
            Контакты
          </a>
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
