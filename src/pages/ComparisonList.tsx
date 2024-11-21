import React, { useEffect, useState } from 'react';
import {formatNumber} from "../utils/formatNumber.ts";
import {Link} from "react-router-dom";
import config from "../api/api.ts";

interface ConstructionTechnology {
    id: number;
    name: string;
}

interface Image {
    id: number;
    image: string;
}

interface Project {
    id: string;
    title: string;
    area: string;
    bathrooms: number | null;
    bedrooms: number;
    best_seller: string | null;
    construction_technology: ConstructionTechnology | null;
    construction_time: string | null;
    description: string | null;
    discount: string | null;
    documents: any[];
    facade_images: Image[];
    finishing_options: any[];
    floors: number;
    garage: boolean;
    garage_capacity: number | null;
    images: Image[];
    interior_images: Image[];
    kitchen_area: string | null;
    layout_images: Image[];
    living_area: string;
    new: boolean;
    new_price?: number;
    price: string;
    purpose: string;
    rooms: number;
    warranty: string | null;
}

const ComparisonList: React.FC = () => {
    const [comparisonProjects, setComparisonProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadComparisonProjects = () => {
            const existingComparison = JSON.parse(localStorage.getItem('comparisonProjects') || '[]');
            setComparisonProjects(existingComparison);
        };

        loadComparisonProjects();

        const updateComparisonList = () => {
            loadComparisonProjects();
        };

        window.addEventListener("comparisonUpdated", updateComparisonList);
        window.addEventListener("storage", updateComparisonList);

        return () => {
            window.removeEventListener("comparisonUpdated", updateComparisonList);
            window.removeEventListener("storage", updateComparisonList);
        };
    }, []);

    const removeFromComparison = (projectId: string) => {
        const updatedComparison = comparisonProjects.filter((project) => project.id !== projectId);
        localStorage.setItem('comparisonProjects', JSON.stringify(updatedComparison));
        setComparisonProjects(updatedComparison);
        window.dispatchEvent(new Event("comparisonUpdated"));
    };

    console.log(comparisonProjects)

    return (
        <div className="section">
            <div className="container">
                <h2 className="title-main">Сравнение проектов</h2>
                {comparisonProjects.length === 0 ? (
                    <p>Нет проектов для сравнения.</p>
                ) : (
                    <div className="comparison-content">
                        {comparisonProjects.map((project) => (
                            <div key={project.id} className="comparison-project">
                                <div className="comparison-head">
                                    <button onClick={() => removeFromComparison(project.id)}
                                            className="remove-comparison-button">
                                        <i className="fa-solid fa-trash fa-1x"></i>
                                    </button>
                                    <img
                                        src={project.images?.[0]?.image ? `${config.API_URL}${project.images[0].image}` : "/house.jpg"}
                                        alt={project.title || "house"}
                                        style={{width: "200px", height: "100px"}}
                                    />
                                    <h3 className="text-span comparison-header">{project.title}</h3>
                                    <div className="price-container">
                                        {project.new_price ? (
                                            <>
                                               <span className="old-price text-span">{formatNumber(project.new_price)} ₽</span>
                                            </>
                                        ) : (
                                            <span className="new-price text-span">{formatNumber(project.price)} ₽</span>
                                        )}
                                    </div>
                                    <Link to={`/project/details/${project.id}`}>
                                        <button className="order-button">Заказать</button>
                                    </Link>
                                </div>
                                <table className="comparison-table">
                                    <tbody className="text-span">
                                    <tr>
                                        <td className="span-text grey">Площадь, м²</td>
                                        <td>{project.area || '—'}</td>
                                    </tr>
                                    <tr>
                                        <td>Этажей</td>
                                        <td>{project.floors || '—'}</td>
                                    </tr>
                                    <tr>
                                        <td>Количество комнат</td>
                                        <td>{project.rooms || '—'}</td>
                                    </tr>
                                    <tr>
                                        <td>Жилая площадь, м²</td>
                                        <td>{project.living_area || '—'}</td>
                                    </tr>
                                    <tr>
                                        <td>Площадь кухни, м²</td>
                                        <td>{project.kitchen_area || '—'}</td>
                                    </tr>
                                    <tr>
                                        <td>Стоимость</td>
                                        <td>{project.price ? `${formatNumber(project.price)} ₽` : '—'}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonList;
