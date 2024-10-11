import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [activeSection, setActiveSection] = useState<'characteristics' | 'description' | 'finishing' | 'documents'>('characteristics');

    return (
        <div className="container">
            <div className="breadcrumbs">
                <Link to="/">Главная</Link> &gt;{" "}
                <Link to="/projects">Типовые проекты</Link> &gt;{" "}
                <Link to="/projects/karkasnye-doma">Каркасные дома</Link> &gt;{" "}
                <span>Проект каркасного дома «Нова»</span>
            </div>

            <section className="main-image-section">
                <img
                    className="house-image"
                    src="../../public/house514x514.png"
                    alt={`Проект каркасного дома ${id}`}
                />
                <div className="house-info">
                    <div className="section-house__title title-main white">
                        <h1>Проект каркасного дома «Нова»</h1>
                    </div>
                    <div className="block-special text-main white">
                        <div className="block-special__item">
                            <span>Площадь, м²</span>
                            <span>272</span>
                        </div>
                        <div className="block-special__item">
                            <span>Этажей</span>
                            <span>3</span>
                        </div>
                        <div className="block-special__item">
                            <span>Количество комнат</span>
                            <span>5</span>
                        </div>
                        <Link to="/projects/karkasnye-doma/nova/characteristics" className="block-special__item">
                            Все характеристики
                        </Link>
                    </div>
                </div>
            </section>
            <section className="info-house">
                <div className="info-house__content">
                    <section className="gallery-section">
                        <div className="gallery-item">
                            <img src="../../public/catalog3.png" alt="Interior 1"/>
                        </div>
                        <div className="gallery-item">
                            <img src="../../public/catalog2.png" alt="Interior 2"/>
                        </div>
                        <div className="gallery-item">
                            <img src="../../public/house514x514.png" alt="Interior 2"/>
                        </div>
                        <div className="gallery-item">
                            <img src="../../public/house514x514.png" alt="Interior 2"/>
                        </div>
                        <div className="gallery-item">
                            <img src="../../public/house514x514.png" alt="Interior 2"/>
                        </div>
                    </section>
                    <section className="tizer-block">
                        <div className="tizer-list">
                            <div className="tizer-list__item">
                                <article>
                                    <h4>Подготавливаем площадь</h4>
                                    <p>Ровняем местность, проводим коммуникации и заливаем фундамент</p>
                                </article>
                            </div>
                            <div className="tizer-list__item">
                                <article>
                                    <h4>Строим дом</h4>
                                    <p>Устанавливаем и утепляем стены, кроем крышу и застилаем пол</p>
                                </article>
                            </div>
                            <div className="tizer-list__item">
                                <article>
                                    <h4>Добавляем комфорта</h4>
                                    <p>Устанавливаем двери, проводим внешнюю и внутреннюю отделку, подключаем к
                                        электросети</p>
                                </article>
                            </div>
                        </div>
                    </section>
                    <section className="layout-block">
                        <h2 className="title-main layout-title">Планировка</h2>
                        <div className="layouts">
                            <img src="../../public/planirovka.jpg" alt=""/>
                            <img src="../../public/planirovka.jpg" alt=""/>
                        </div>
                    </section>
                    <section className="interior-block">
                        <h2 className="title-main interior-title">Интерьер</h2>
                        <div className="interiors">
                            <img src="../../public/interier1.jpg" alt=""/>
                            <img src="../../public/interier1.jpg" alt=""/>
                        </div>
                    </section>
                    <section className="facade-block">
                        <h2 className="title-main facade-title">Фасады</h2>
                        <div className="facades">
                            <img src="../../public/fasade.jpg" alt=""/>
                            <img src="../../public/fasade.jpg" alt=""/>
                        </div>
                    </section>
                    <section className="house-nav">
                        <nav>
                            <ul className='tabs-nav text-main'>
                                <li
                                    className={activeSection === 'characteristics' ? 'active' : ''}
                                    onClick={() => setActiveSection('characteristics')}
                                >
                                    Характеристика
                                </li>
                                <li
                                    className={activeSection === 'description' ? 'active' : ''}
                                    onClick={() => setActiveSection('description')}
                                >
                                    Описание
                                </li>
                                <li
                                    className={activeSection === 'finishing' ? 'active' : ''}
                                    onClick={() => setActiveSection('finishing')}
                                >
                                    Варианты отделки
                                </li>
                                <li
                                    className={activeSection === 'documents' ? 'active' : ''}
                                    onClick={() => setActiveSection('documents')}
                                >
                                    Документы
                                </li>
                            </ul>
                        </nav>
                    </section>

                    {activeSection === 'characteristics' && (
                        <section className='characteristics-block all-section'>
                            <h2>Характеристика</h2>
                            <p>Информация о характеристиках дома...</p>
                        </section>
                    )}
                    {activeSection === 'description' && (
                        <section className='description-block all-section'>
                            <h2>Описание</h2>
                            <p>
                                «Нова» — просторный трехэтажный коттедж в стиле модерн. В нем есть все для комфортной жизни большой семьи. В пяти больших комнатах легко расположить домашних и принять гостей. Есть два санузла, которые просто необходимы для такой площади.
                                Дом легко разделить на зоны и выделить кабинеты для удаленной работы. Просторная гостиная станет любимым местом сбора всей семьи. Благодаря панорамным окнам вы сможете любоваться природой каждое утро. Начинайте свой день с пения птиц, а не пробок и шума!
                            </p>
                            <p>
                                <br/><strong className='subtitle-main'>Отличительные особенности :</strong>
                                <ul>
                                    <li>
                                        Эксклюзивный дизайн, разработанный конструкторским бюро в Италии.
                                    </li>
                                    <li>
                                        Все включено: комплекс строительных работ выполняется под ключ.
                                    </li>
                                    <li>
                                        Альпийские горки в саду и домики для сусликов.
                                    </li>
                                    <li>
                                        При заказе проекта дома до 20 мая беседка – в подарок!
                                    </li>
                                </ul>
                            </p>
                        </section>
                    )}
                    {activeSection === 'finishing' && (
                        <section className="finishing-block all-section">
                            <h2>Варианты отделки</h2>
                            <p>Информация о вариантах отделки...</p>
                        </section>
                    )}
                    {activeSection === 'documents' && (
                        <section className="documents-block all-section">
                            <h2>Документы</h2>
                            <p>Документы, касающиеся проекта...</p>
                        </section>
                    )}

                </div>
                <div className="price-section">
                    <div className="project-price">
                        <h2 className="text-main project-info__title">Проект каркасного дома «Нова»</h2>
                        <span className="new-price text-main">100000 ₽</span>
                        <div className="discount">
                            <span className="old-price text-main">130000 ₽</span>
                            <span className="discount-price">- 5000 ₽</span>
                        </div>
                    </div>
                    <button className="order-button">Заказать
                    </button>
                    <div className="info-buttons">
                        <button className="question-button"><span><i
                            className="fa-solid fa-question"></i> </span> Задать
                            вопрос
                        </button>
                        <button className="comparison-button">
                            <span className="icon">
                                <i className="fas fa-balance-scale"></i>
                            </span>
                        </button>
                    </div>
                    <p className="guarantee-info">
                        <span className="icon">
                            <i className="fa-solid fa-circle-exclamation"></i>
                        </span>
                        Гарантия распространяется на материалы и коммуникации.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default ProjectDetail;
