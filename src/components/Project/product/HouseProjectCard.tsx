import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from "../../../utils/routes";
import { formatNumber } from "../../../utils/formatNumber.ts";

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
    results: []
}

interface HouseProjectCardProps {
    project: HouseProject;
}

const HouseProjectCard: React.FC<HouseProjectCardProps> = ({ project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [cachedImages, setCachedImages] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = () => {
            const images = project.images.map(img => {
                const image = new Image();
                image.src = `http://192.168.0.103:8000${img.image}`;
                return image.src;
            });
            setCachedImages(images);
        };

        if (project.images.length > 0) {
            loadImages();
        }
    }, [project.images]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { width, left } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;

        if (x < width / 2 && currentImageIndex !== 1 && project.images.length > 1) {
            setCurrentImageIndex(1);
        } else if (x >= width / 2 && currentImageIndex !== 0) {
            setCurrentImageIndex(0);
        }
    };

    console.log(project)

    return (
        <div className="card project-card">
            <div className="card-image">
                <Link to={ROUTES.ProjectDetail.replace(':id', project.id.toString())}>
                    <figure className="image is-4by3" onMouseMove={handleMouseMove}>
                        <img
                            src={cachedImages[currentImageIndex] || '/house.jpg'}
                            alt={project.title}
                            className="project-image"
                            style={{width: '500px', height: '100%'}}
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
                    {project.price && <span className="new-price text-main">{formatNumber(project.new_price)} ₽</span>}
                    {project.new_price && (
                        <div className="discount">
                            <span className="old-price text-main">{formatNumber(project.price!)} ₽</span>
                            <span className="discount-price">- {formatNumber(project.discount)} %</span>
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
