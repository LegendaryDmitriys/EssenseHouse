import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import sprite from "../../public/sprite.svg";
import {formatNumber} from "../utils/formatNumber.ts";
import {useFullScreen} from "../hooks/useFullScreen.ts";
import FullScreenModal from "../components/FullSreen/FullScreenModal.tsx";



interface ProjectData {
    area: number;
    floors: number;
    rooms: number;
    images: { id: number; image: string }[];
    interior_images: { id: number; image: string }[];
    facade_images: { id: number; image: string}[];
    layout_images: { id: number; image: string }[];
    living_area: number;
    kitchen_area: number;
    bedrooms: number;
    garage: boolean;
    garage_capacity: number;
    bathrooms: number;
    construction_time: number;
    warranty: number;
    price: number;
    old_price: number;
    discount: number;
    purpose: string;
    description: string;
    finishing_options: { id: number; title:string; description: string; price_per_sqm: number; image: string }[];
    documents: { id: number; file: string; title: string; size: number }[];
    title: string;

}



const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { elementRef, isFullScreen, closeFullScreenModal, setIsFullScreen  } = useFullScreen();
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [activeSection, setActiveSection] = useState<'characteristics' | 'description' | 'finishing' | 'documents'>('characteristics');
    const [error, setError] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);



    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch(`http://192.168.0.103:8000/houses/${id}`);
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.statusText}`);
                }
                const data = await response.json();
                setProjectData(data);
            } catch (error) {
                setError((error as Error).message);
                console.error("Ошибка при загрузке данных проекта:", error);
            }
        };

        fetchProjectData();
    }, [id]);



    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!projectData) {
        return <p>Загрузка...</p>;
    }

    const openFullScreenModal = (image: string) => {
        setCurrentImage(image);
        setIsFullScreen(true);
    };



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
                    src={projectData.images[0].image}
                    alt={`${projectData.title}-${projectData.images[0].id} ${id}`}
                />
                <div className="house-info">
                    <div className="section-house__title title-main white">
                        <h1>{projectData.title}</h1>
                    </div>
                    <div className="block-special text-main white">
                        <div className="block-special__item">
                            <span>Площадь, м²</span>
                            <span>{formatNumber(projectData?.area)}</span>
                        </div>
                        <div className="block-special__item">
                            <span>Этажей</span>
                            <span>{projectData?.floors}</span>
                        </div>
                        <div className="block-special__item">
                            <span>Количество комнат</span>
                            <span>{projectData?.rooms}</span>
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
                        {projectData.images.map((image, index) => (
                            <div key={index} className="gallery-item">
                                <img src={image.image} alt={`House-images-${image.id}`}
                                     ref={elementRef}
                                     onClick={() => openFullScreenModal(image.image)}
                                     style={{ cursor: 'pointer'}}
                                />
                            </div>
                        ))}
                    </section>
                    <section className="tizer-block">
                        <div className="tizer-list">
                            <div className="tizer-list__item">
                                <article>
                                    <svg className='detail-icon' width={40} height={40}>
                                        <use xlinkHref={sprite + "#square-icon"}/>
                                    </svg>
                                    <h4>Подготавливаем площадь</h4>
                                    <p>Ровняем местность, проводим коммуникации и заливаем фундамент</p>
                                </article>
                            </div>
                            <div className="tizer-list__item">
                                <article>
                                    <svg className='detail-icon' width={40} height={40}>
                                        <use xlinkHref={sprite + "#build-icon"}/>
                                    </svg>
                                    <h4>Строим дом</h4>
                                    <p>Устанавливаем и утепляем стены, кроем крышу и застилаем пол</p>
                                </article>
                            </div>
                            <div className="tizer-list__item">
                                <article>
                                    <svg className='detail-icon' width={40} height={40}>
                                        <use xlinkHref={sprite + "#comfort-icon"}/>
                                    </svg>
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
                            {projectData.layout_images.map((layout, index) => (
                                <div key={index} className="layout">
                                    <img src={layout.image} alt={`House-images-layout${layout.id}`}
                                         ref={elementRef}
                                         onClick={() => openFullScreenModal(layout.image)}
                                         style={{ cursor: 'pointer'}}/>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="interior-block">
                        <h2 className="title-main interior-title">Интерьер</h2>
                        <div className="interiors">
                            {projectData.interior_images.map((interior, index) => (
                                <div key={index} className="interior">
                                    <img src={interior.image} alt={`House-images-interior${interior.id}`}
                                         ref={elementRef}
                                         onClick={() => openFullScreenModal(interior.image)}
                                         style={{ cursor: 'pointer'}}/>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="facade-block">
                        <h2 className="title-main facade-title">Фасады</h2>
                        <div className="facades">
                            {projectData.facade_images.map((facade, index) => (
                                <div key={index} className="facade">
                                    <img src={facade.image} alt={`House-images-facades${facade.id}`}
                                         ref={elementRef}
                                         onClick={() => openFullScreenModal(facade.image)}
                                         style={{ cursor: 'pointer'}}/>
                                </div>
                            ))}
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
                                        <td>{formatNumber(projectData.area)}</td>
                                    </tr>
                                    <tr>
                                        <td>Этажей</td>
                                        <td>{projectData.floors}</td>
                                    </tr>
                                    <tr>
                                        <td>Количество комнат</td>
                                        <td>{projectData.rooms}</td>
                                    </tr>
                                    <tr>
                                        <td>Жилая площадь, м²</td>
                                        <td>{formatNumber(projectData.living_area)}</td>
                                    </tr>
                                    <tr>
                                        <td>Площадь кухни, м²</td>
                                        <td>{formatNumber(projectData.kitchen_area)}</td>
                                    </tr>
                                    <tr>
                                        <td>Количество спален</td>
                                        <td>{projectData.bedrooms}</td>
                                    </tr>
                                    <tr>
                                        <td>Гараж</td>
                                        <td>
                                            {projectData.garage
                                            ? projectData.garage_capacity  : "Отсутсвует"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Назначение</td>
                                        <td>{projectData.purpose}</td>
                                    </tr>
                                    <tr>
                                        <td>Количество санузлов</td>
                                        <td>{projectData.bathrooms}</td>
                                    </tr>
                                    <tr>
                                        <td>Срок строительства, дней</td>
                                        <td>от {projectData.construction_time}</td>
                                    </tr>
                                    <tr>
                                        <td>Гарантия, лет</td>
                                        <td>{projectData.warranty}</td>
                                    </tr>
                                </table>
                            </div>
                        </section>
                    )}
                    {activeSection === 'description' && (
                        <section className='description-block all-section'>
                            <h2 className='description-title'>Описание</h2>
                            <p>
                                {projectData.description}
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
                                {projectData.finishing_options.map((finishingOption, index) => (
                                    <div key={index} className='tarrif-list__item'>
                                        <div className='tarrif-list__head'>
                                            <img src={finishingOption.image} alt={`finishingOption-image${finishingOption.id}`} className="tarrif-img"/>
                                            <h3 className='subtitle'>{finishingOption.title}</h3>
                                        </div>
                                        <div>
                                            <div className='tarrif-list__info'>
                                                <div className='tarrif-list__text'>
                                                    <p>{finishingOption.description}</p>
                                                </div>
                                                <div className='tarrif-list__price'>
                                                    <p>от {formatNumber(finishingOption.price_per_sqm)} ₽ за 1 м²</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {activeSection === 'documents' && (
                        <section className="documents-block all-section">
                            <h2 className='documents-title'>Документы</h2>
                            {projectData.documents.map((document, index) => (
                                <div key={index} className='documents-list'>
                                    <div className='documents-list__item'>
                                        <img src="../../public/doc.png" alt=""/>
                                        <div className='documents-list__info'>
                                            <article>
                                                <p>{document.title}</p>
                                                <p>{document.size} MB</p>
                                            </article>
                                            <a href={document.file} download={document.title}>
                                                <i className="fas fa-download download-icon"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                </div>
                <div className="price-section">
                    <div className="project-price">
                        <h2 className="text-main project-info__title">{projectData.title}</h2>
                        <span className="new-price text-main">{formatNumber(projectData.price)} ₽</span>
                        {projectData.old_price && projectData.discount ? (
                            <div className="discount">
                                <span className="old-price text-main">{formatNumber(projectData.old_price)} ₽</span>
                                <span className="discount-price">- {formatNumber(projectData.discount)} ₽</span>
                            </div>
                        ) : null}
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
            {isFullScreen && currentImage && (
                <FullScreenModal imgSrc={currentImage} onClose={closeFullScreenModal} />
            )}
        </div>
    );
};

export default ProjectDetail;
