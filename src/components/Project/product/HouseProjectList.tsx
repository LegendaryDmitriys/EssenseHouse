import React from 'react';
import HouseProjectCard from './HouseProjectCard';

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
    results: any[];
}


interface HouseProjectListProps {
    houseProjects: HouseProject[];
}

const HouseProjectList: React.FC<HouseProjectListProps> = ({ houseProjects }) => {
    return (
        <div className="columns is-multiline mt-5">
            {houseProjects.map((project) => (
                <div className="column is-one-third" key={project.id}>
                    <HouseProjectCard project={project} />
                </div>
            ))}
        </div>
    );
};

export default HouseProjectList;