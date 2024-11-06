import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import sprite from "../../public/sprite.svg";
import {formatNumber} from "../utils/formatNumber.ts";
import {useFullScreen} from "../hooks/useFullScreen.ts";
import FullScreenModal from "../components/FullSreen/FullScreenModal.tsx";
import OrderFormModal from "../components/Project/OrderFormModal.tsx";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import QuestionFormModal from "../components/Project/QuestionFormModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {fetchProjectById} from "../redux/features/house/houseProjectsSlice.ts";
import ProjectDetailSkeleton from "../components/Skeleton/ProjectDetailSkeleton.tsx";



const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isFullScreen, closeFullScreenModal, setIsFullScreen  } = useFullScreen();
    const [activeSection, setActiveSection] = useState<'characteristics' | 'description' | 'finishing' | 'documents'>('characteristics');
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { selectedProject, loading, error } = useSelector((state: RootState) => state.houseProjects);

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(fetchProjectById(Number(id)));
        }
    }, [dispatch, id]);

    if (loading) {
        return<><ProjectDetailSkeleton /></>
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!selectedProject) {
        return <></>;
    }


    const openFullScreenModal = (image: string) => {
        setCurrentImage(image);
        setIsFullScreen(true);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addToComparison = () => {
        const existingComparison = JSON.parse(localStorage.getItem('comparisonProjects') || '[]');

        if (!existingComparison.some((project: any) => project.id === selectedProject.id)) {
            existingComparison.push(selectedProject);
            localStorage.setItem('comparisonProjects', JSON.stringify(existingComparison));
            window.dispatchEvent(new Event("comparisonUpdated"));
        } else {
            alert('Проект уже добавлен для сравнения.');
        }
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
                    src={selectedProject.images[0].image}
                    alt={`${selectedProject.title}-${selectedProject.images[0].id} ${id}`}
                />
                <div className="house-info">
                    <div className="section-house__title title-main white">
                        <h1>{selectedProject.title}</h1>
                    </div>
                    <div className="block-special text-main white">
                        <div className="block-special__item">
                            <span>Площадь, м²</span>
                            <span>{formatNumber(selectedProject.area)}</span>
                        </div>
                        <div className="block-special__item">
                            <span>Этажей</span>
                            <span>{selectedProject.floors}</span>
                        </div>
                        <div className="block-special__item">
                            <span>Количество комнат</span>
                            <span>{selectedProject?.rooms}</span>
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
                        {selectedProject.images.map((image, index) => (
                            <div key={index} className="gallery-item">
                                <LazyLoadImage
                                    src={image.image}
                                    alt={`House-images-${image.id}`}
                                    onClick={() => openFullScreenModal(image.image)}
                                    style={{ cursor: 'pointer' }}
                                    effect="blur"
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
                    {selectedProject.layout_images.length > 0 && (
                        <section className="layout-block">
                        <h2 className="title-main layout-title">Планировка</h2>
                            <div className="layouts">
                                {selectedProject.layout_images.map((layout, index) => (
                                    <div key={index} className="layout">
                                        <LazyLoadImage
                                            src={layout.image}
                                            alt={`House-images-layout${layout.id}`}
                                            onClick={() => openFullScreenModal(layout.image)}
                                            style={{ cursor: 'pointer' }}
                                            effect="blur"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {selectedProject.interior_images.length > 0 && (
                        <section className="interior-block">
                            <h2 className="title-main interior-title">Интерьер</h2>
                            <div className="interiors">
                                {selectedProject.interior_images.map((interior, index) => (
                                    <div key={index} className="interior">
                                        <LazyLoadImage
                                            src={interior.image}
                                            alt={`House-images-interior${interior.id}`}
                                            onClick={() => openFullScreenModal(interior.image)}
                                            style={{ cursor: 'pointer' }}
                                            effect="blur"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {selectedProject.facade_images.length > 0 && (
                        <section className="facade-block">
                            <h2 className="title-main facade-title">Фасады</h2>
                            <div className="facades">
                                {selectedProject.facade_images.map((facade, index) => (
                                    <div key={index} className="facade">
                                        <LazyLoadImage
                                            src={facade.image}
                                            alt={`House-images-facades${facade.id}`}
                                            onClick={() => openFullScreenModal(facade.image)}
                                            style={{ cursor: 'pointer' }}
                                            effect="blur"
                                        />

                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
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
                                {selectedProject.finishing_options.length > 0 && (
                                    <li
                                        className={activeSection === 'finishing' ? 'active' : ''}
                                        onClick={() => setActiveSection('finishing')}
                                    >
                                        Варианты отделки
                                    </li>
                                )}
                                {selectedProject.documents.length > 0 && (
                                    <li
                                        className={activeSection === 'documents' ? 'active' : ''}
                                        onClick={() => setActiveSection('documents')}
                                    >
                                        Документы
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </section>

                    {activeSection === 'characteristics' && (
                        <section className='characteristics-block all-section' id='characteristics'>
                            <h2 className='characteristics-title'>Характеристика</h2>
                            <div className='characteristics-info title-main '>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Площадь, м²</td>
                                            <td>{formatNumber(selectedProject.area)}</td>
                                        </tr>
                                        <tr>
                                            <td>Этажей</td>
                                            <td>{selectedProject.floors}</td>
                                        </tr>
                                        <tr>
                                            <td>Количество комнат</td>
                                            <td>{selectedProject.rooms}</td>
                                        </tr>
                                        <tr>
                                            <td>Жилая площадь, м²</td>
                                            <td>{formatNumber(selectedProject.living_area)}</td>
                                        </tr>
                                        <tr>
                                            <td>Площадь кухни, м²</td>
                                            <td>{formatNumber(selectedProject.kitchen_area)}</td>
                                        </tr>
                                        <tr>
                                            <td>Количество спален</td>
                                            <td>{selectedProject.bedrooms}</td>
                                        </tr>
                                        {selectedProject.garage  !== null && selectedProject.garage_capacity !== null &&(
                                            <tr>
                                                <td>Гараж</td>
                                                <td>
                                                    {selectedProject.garage
                                                    ? selectedProject.garage_capacity  : "Отсутсвует"}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td>Назначение</td>
                                            <td>{selectedProject.purpose}</td>
                                        </tr>
                                        {selectedProject.bathrooms !== null && (
                                            <tr>
                                                <td>Количество санузлов</td>
                                                <td>{selectedProject.bathrooms}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td>Срок строительства, дней</td>
                                            <td>от {selectedProject.construction_time}</td>
                                        </tr>
                                        <tr>
                                            <td>Гарантия, лет</td>
                                            <td>{selectedProject.warranty}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    {activeSection === 'description' && (
                        <section className='description-block all-section'>
                            <h2 className='description-title'>Описание</h2>
                            <p>
                                {selectedProject.description}
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
                                {selectedProject.finishing_options.map((finishingOption, index) => (
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
                            {selectedProject.documents.map((document, index) => (
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
                        <h2 className="text-main project-info__title">{selectedProject.title}</h2>
                        <span className="new-price text-main">{formatNumber(selectedProject.price)} ₽</span>
                        {selectedProject.old_price && selectedProject.discount ? (
                            <div className="discount">
                                <span className="old-price text-main">{formatNumber(selectedProject.old_price)} ₽</span>
                                <span className="discount-price">- {formatNumber(selectedProject.discount)} ₽</span>
                            </div>
                        ) : null}
                    </div>
                    <button className="order-button" onClick={openModal}>
                        Заказать
                    </button>

                    <div className="info-buttons">
                        <button className="question-button" onClick={() => setQuestionModalOpen(true)}><span><i
                            className="fa-solid fa-question"></i> </span> Задать
                            вопрос
                        </button>
                        <button className="comparison-button" onClick={addToComparison}>
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
            {isModalOpen && <OrderFormModal
                onClose={closeModal}
                projectName={selectedProject.title}
                finishOptions={selectedProject.finishing_options}
                houseId={selectedProject.id}
            />}
            {isQuestionModalOpen && (
                <QuestionFormModal
                    onClose={() => setQuestionModalOpen(false)}
                    projectName={selectedProject.title}
                    houseId={selectedProject.id}
                />
            )}
        </div>
    );
};

export default ProjectDetail;
