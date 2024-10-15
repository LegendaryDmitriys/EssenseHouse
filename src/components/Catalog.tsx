import React from 'react';
import { Link } from "react-router-dom";
// @ts-ignore
import { ROUTES } from '../utils/routes.js';
import CatalogMenu from "./Project/CatalogMenu.tsx";



const Catalog: React.FC = () => {
    return (
        <div className="container">
            <article className="catalog-href">
                <span className="text-main grey">Главная - Типовые проекты</span>
            </article>

            <div className="columns">
                <aside className="column is-one-quarter">
                    <CatalogMenu/>
                </aside>

                <div className="column is-three-quarters">
                    <h1 className="title-main">Каталог</h1>
                    <p className="text-main">
                        Наша компания предлагает дома и дополнительные строения под ключ. Мы возводим дома из любых
                        материалов и используем актуальные технологии. Гарантируем высокое качество строения и
                        коммуникаций
                        и всегда укладываемся в срок.
                    </p>
                    <p className="text-main">
                        У нас большой опыт работы, мы сотрудничаем только с проверенными поставщиками. Все материалы
                        отличаются высоким качеством. Отточенный рабочий процесс позволяет избежать заминок при
                        строительстве.
                    </p>

                    <div className="columns mt-5">
                        <div className="column">
                            <Link to={ROUTES.GlulamHouse}>
                                <figure className="image is-4by3">
                                    <img src="../../public/catalog1.png" alt="Дома из клееного бруса"/>
                                </figure>
                            </Link>
                            <p className="has-text-centered grey">Дома из клееного бруса</p>
                        </div>
                        <div className="column">
                            <Link to={ROUTES.LogHouse}>
                                <figure className="image is-4by3">
                                    <img src="../../public/catalog2.png" alt="Дома из оцилиндрованного бревна"/>
                                </figure>
                            </Link>
                            <p className="has-text-centered grey">Дома из оцилиндрованного бревна</p>
                        </div>
                        <div className="column">
                            <Link to={ROUTES.FrameHouse}>
                                <figure className="image is-4by3">
                                    <img src="../../public/catalog3.png" alt="Каркасные дома"/>
                                </figure>
                            </Link>
                            <p className="has-text-centered grey">Каркасные дома</p>
                        </div>
                    </div>

                    <p className="mt-5 text-main grey">
                        Заказать проект дома — легко! Дома под ключ в вашем городе — это отличный способ быстро и
                        недорого переехать в пригород. Готовый проект не означает, что ничего нельзя изменить. Мы всегда
                        готовы пересмотреть планировку дома и его визуал на ваш вкус. Вы можете заказать внутреннюю и
                        внешнюю отделку, а также все коммуникации в короткие сроки.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
