import React, { useEffect, useState } from 'react';
import { ROUTES } from "../utils/routes.ts";
import { Link } from "react-router-dom";
import sprite from "../../public/sprite.svg";
import {useAuth} from "../services/AuthContext.tsx";

interface HeaderProps {
  color: string;
}

const Header: React.FC<HeaderProps> = ({ color }) => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [comparisonCount, setComparisonCount] = useState(0);



  useEffect(() => {
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    const updateComparisonCount = () => {
      const existingComparison = JSON.parse(localStorage.getItem('comparisonProjects') || '[]');
      setComparisonCount(existingComparison.length);
    };

    updateComparisonCount();

    window.addEventListener("comparisonUpdated", updateComparisonCount);
    window.addEventListener("storage", updateComparisonCount);

    return () => {
      window.removeEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
      window.removeEventListener("comparisonUpdated", updateComparisonCount);
      window.removeEventListener("storage", updateComparisonCount);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
      <header className={`navbar is-fixed-top ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="container">
          <div className="navbar-brand">
            <Link to={ROUTES.Home} className="navbar-item">
              <svg className="logo" width={190} height={25}>
                <use xlinkHref={sprite + "#logo"} />
              </svg>
            </Link>
            <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item has-dropdown"
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}>
                <Link  className={`navbar-item text-main`} to={ROUTES.Project}>
                  Проекты
                </Link>
                {isDropdownOpen && (
                <div className="navbar-dropdown">
                  <Link className="navbar-item__drop" to={ROUTES.CompletedProject}>
                    Готовые дома
                  </Link>
                </div>
                )}
              </div>
              <Link className="navbar-item text-main" to={ROUTES.About}>
                О нас
              </Link>
              <Link className="navbar-item text-main" to={ROUTES.Reviews}>
                Отзывы
              </Link>
              <Link className="navbar-item text-main" to={ROUTES.Contacts}>
                Контакты
              </Link>
              {isAuthenticated && (
                  <Link className="navbar-item text-main" to={ROUTES.AdminDashboard}>
                    Дэшборд
                  </Link>
              )}
            </div>

            <div className="navbar-end">
              <a className="navbar-item" href="https://wa.me/380507774450">
              <span className="icon" style={{ color }}>
                <i className="fab fa-whatsapp"></i>
              </span>
              </a>
              <a className="navbar-item" href="https://t.me/username">
              <span className="icon" style={{ color }}>
                <i className="fab fa-telegram"></i>
              </span>
              </a>
              <a className="navbar-item" href="https://instagram.com/username">
              <span className="icon" style={{ color }}>
                <i className="fab fa-instagram"></i>
              </span>
              </a>
              <div className="navbar-item">
                <a className="is-size-5" style={{ color }} href="tel:+380507774450">
                  +38 (050) 777-44-50
                </a>
              </div>
              <Link to={ROUTES.ComparisonProject} className="navbar-item">
                <i className="fas fa-balance-scale"></i>
                {comparisonCount > 0 && (
                    <span className="comparison-count">{comparisonCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
