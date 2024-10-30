import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import {ROUTES} from "../../../utils/routes";
import {formatNumber} from "../../../utils/formatNumber.ts";


export interface ProjectImage {
    image: string;
}

export interface HouseProject {
    id: number;
    title: string;
    price?: number;
    old_price?: number;
    discount?: number;
    best_seller?: string;
    new?: boolean;
    images: ProjectImage[];
}



interface HouseProjectCardProps {
    project: HouseProject;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const HouseProjectCard: React.FC<HouseProjectCardProps> = ({ project, index, hoveredIndex, setHoveredIndex }) => {
    return (
        <div
            className="card project-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div className="card-image">
                <Link to={ROUTES.ProjectDetail.replace(':id', project.id.toString())}>
                    <figure className="image is-4by3">
                        <img
                            src={
                                hoveredIndex === index && project.images.length > 1
                                    ? `http://192.168.0.103:8000${project.images[1]?.image}`
                                    : `http://192.168.0.103:8000${project.images[0]?.image}`
                            }
                            alt={project.title}
                            className="project-image"
                        />
                    </figure>
                </Link>
                <div className="tags-wrapper">
                    {project.best_seller === 'Акция' && <span className="tag is-warning">Акция</span>}
                    {project.new && <span className="tag is-success">Новинка</span>}
                </div>
            </div>
            <div className="card-content">
                <p className="project-title">{project.title}</p>
                <div className="project-price">
                    {project.price && <span className="new-price text-main">{formatNumber(project.price)} ₽</span>}
                    {project.discount && (
                        <div className="discount">
                            <span className="old-price text-main">{formatNumber(project.old_price!)} ₽</span>
                            <span className="discount-price">- {formatNumber(project.discount)} ₽</span>
                        </div>
                    )}
                </div>
                <Link to={`/project/details/${project.id}`} className="button is-primary">
                    Подробнее
                </Link>
            </div>
        </div>
    );
};

export default HouseProjectCard;
