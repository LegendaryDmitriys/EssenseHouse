import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CatalogMenu from "./Project/CatalogMenu.tsx";
import axios from "axios";
import config from "../api/api.ts";

interface Category {
    id: number;
    name: string;
    slug: string;
    random_image_url: string;
}

const Catalog: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.API_URL}category/`);
                setCategories(response.data);
            } catch (err) {
                setError('Ошибка загрузки категорий.');
            }
        };

        fetchCategories();
    }, []);


    if (error) {
        return <div>{error}</div>;
    }

    if (categories.length === 0) {
        return <div></div>;
    }

    return (
        <div className="container">
            <article className="catalog-href">
                <span className="text-main grey">Главная - Типовые проекты</span>
            </article>

            <div className="columns">
                <aside className="column is-one-quarter">
                    <CatalogMenu />
                </aside>

                <div className="column is-three-quarters">
                    <h1 className="title-main">Каталог</h1>
                    <p className="text-main">
                        Наша компания предлагает дома и дополнительные строения под ключ. Мы возводим дома из любых
                        материалов и используем актуальные технологии. Гарантируем высокое качество строения и
                        коммуникаций и всегда укладываемся в срок.
                    </p>
                    <p className="text-main">
                        У нас большой опыт работы, мы сотрудничаем только с проверенными поставщиками. Все материалы
                        отличаются высоким качеством. Отточенный рабочий процесс позволяет избежать заминок при
                        строительстве.
                    </p>

                    <div className="columns mt-5">
                        {categories.map((category) => (
                            <div className="column" key={category.id}>
                                <Link to={`/catalog/${category.slug}`}>
                                    <figure className="">
                                        <img src={`${config.API_URL}${category.random_image_url}`} alt={category.name} className="category-img" />
                                    </figure>
                                </Link>
                                <p className="has-text-centered grey">{category.name}</p>
                            </div>
                        ))}
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
