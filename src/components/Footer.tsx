import React from 'react'



const Footer: React.FC = () => {
    return (
        <>
            <footer className='footer navbar'>
                <div className="navbar-logo">
                    <img  src="../../public/logo-white.png" alt="Essense House" className="logo" />
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <a className="navbar-item mr-5" href="#projects">
                        Проекты
                        </a>
                        <a className="navbar-item mr-5" href="#about">
                        О нас
                        </a>
                        <a className="navbar-item mr-5" href="#pricing">
                        Стоимость
                        </a>
                        <a className="navbar-item mr-5" href="#contacts">
                        Контакты
                        </a>
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