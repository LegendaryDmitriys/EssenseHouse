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
                        <a href="#characteristics" className="block-special__item">
                            Все характеристики
                        </a>
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
                        <section className='characteristics-block all-section' id='characteristics'>
                            <h2 className='characteristics-title'>Характеристика</h2>
                            <div className='characteristics-info title-main '>
                                <table>
                                    <tr>
                                        <td>Площадь, м²</td>
                                        <td>272</td>
                                    </tr>
                                    <tr>
                                        <td>Этажей</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Количество комнат</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td>Жилая площадь, м²</td>
                                        <td>245</td>
                                    </tr>
                                    <tr>
                                        <td>Площадь кухни, м²</td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td>Количество спален</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Гараж</td>
                                        <td>на 2 машины</td>
                                    </tr>
                                    <tr>
                                        <td>Назначение</td>
                                        <td>для больших участков</td>
                                    </tr>
                                    <tr>
                                        <td>Количество санузлов</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>Срок строительства, дней</td>
                                        <td>от 60</td>
                                    </tr>
                                    <tr>
                                        <td>Гарантия, лет</td>
                                        <td>15</td>
                                    </tr>
                                </table>
                            </div>
                        </section>
                    )}
                    {activeSection === 'description' && (
                        <section className='description-block all-section'>
                            <h2 className='description-title'>Описание</h2>
                            <p>
                                «Нова» — просторный трехэтажный коттедж в стиле модерн. В нем есть все для комфортной
                                жизни большой семьи. В пяти больших комнатах легко расположить домашних и принять
                                гостей. Есть два санузла, которые просто необходимы для такой площади.
                                Дом легко разделить на зоны и выделить кабинеты для удаленной работы. Просторная
                                гостиная станет любимым местом сбора всей семьи. Благодаря панорамным окнам вы сможете
                                любоваться природой каждое утро. Начинайте свой день с пения птиц, а не пробок и шума!
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
                            <h2 className='tariff-title'>Варианты отделки</h2>
                            <div className='tarrif-list'>
                                <div className='tarrif-list__item'>
                                    <div className='tarrif-list__head'>
                                        <img src="../../public/otdelka.png" alt="" className="tarrif-img"/>
                                        <h3 className='subtitle'>Косметический ремонт</h3>
                                    </div>
                                    <div>
                                        <div className='tarrif-list__info'>
                                            <div className='tarrif-list__text'>
                                                <p>Прекрасное решение для обновления интерьера помещения, улучшения его
                                                    эстетики.</p>
                                                <ul>
                                                    <li>Демонтажные работы</li>
                                                    <li>Монтаж натяжных потолков</li>
                                                    <li>Шпатлевка стен под обои</li>
                                                    <li>Покраска стен</li>
                                                    <li>Установка плинтусов</li>
                                                </ul>
                                            </div>
                                            <div className='tarrif-list__price'>
                                                <p>от 3 500 ₽ за 1 м²</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tarrif-list__item'>
                                    <div className='tarrif-list__head'>
                                        <img src="../../public/otdelka.png" alt="" className="tarrif-img"/>
                                        <h3 className='subtitle'>Косметический ремонт</h3>
                                    </div>
                                    <div>
                                        <div className='tarrif-list__info'>
                                            <div className='tarrif-list__text'>
                                                <p>Прекрасное решение для обновления интерьера помещения, улучшения его
                                                    эстетики.</p>
                                                <ul>
                                                    <li>Демонтажные работы</li>
                                                    <li>Монтаж натяжных потолков</li>
                                                    <li>Шпатлевка стен под обои</li>
                                                    <li>Покраска стен</li>
                                                    <li>Установка плинтусов</li>
                                                </ul>
                                            </div>
                                            <div className='tarrif-list__price'>
                                                <p>от 3 500 ₽ за 1 м²</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tarrif-list__item'>
                                    <div className='tarrif-list__head'>
                                        <img src="../../public/otdelka.png" alt="" className="tarrif-img"/>
                                        <h3 className='subtitle'>Косметический ремонт</h3>
                                    </div>
                                    <div>
                                        <div className='tarrif-list__info'>
                                            <div className='tarrif-list__text'>
                                                <p>Прекрасное решение для обновления интерьера помещения, улучшения его
                                                    эстетики.</p>
                                                <ul>
                                                    <li>Демонтажные работы</li>
                                                    <li>Монтаж натяжных потолков</li>
                                                    <li>Шпатлевка стен под обои</li>
                                                    <li>Покраска стен</li>
                                                    <li>Установка плинтусов</li>
                                                </ul>
                                            </div>
                                            <div className='tarrif-list__price'>
                                                <p>от 3 500 ₽ за 1 м²</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {activeSection === 'documents' && (
                        <section className="documents-block all-section">
                            <h2 className='documents-title'>Документы</h2>
                            <div className='documents-list'>
                                <div className='documents-list__item'>
                                    <img src="../../public/doc.png" alt=""/>
                                    <div className='documents-list__info'>
                                        <article>
                                            <p>Коммерческое предложение</p>
                                            <p>29 байт</p>
                                        </article>
                                        <i className="fas fa-download download-icon"></i>
                                    </div>
                                </div>
                                <div className='documents-list__item'>
                                    <img src="../../public/doc.png" alt=""/>
                                    <div className='documents-list__info'>
                                        <article>
                                            <p>Коммерческое предложение</p>
                                            <p>29 байт</p>
                                        </article>
                                        <i className="fas fa-download download-icon"></i>
                                    </div>
                                </div>
                            </div>
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
