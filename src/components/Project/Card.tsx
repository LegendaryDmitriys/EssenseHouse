import React from 'react';

interface House {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
}

interface CardProps {
    house: House;
}

const Card: React.FC<CardProps> = ({ house }) => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={house.imageUrl} alt={house.title} />
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">{house.title}</p>
                <p className="price">
                    {house.price.toLocaleString()} Р <span className="original-price">{house.originalPrice.toLocaleString()} Р</span>
                </p>
                <button className="button is-primary">Заказать</button>
            </div>
        </div>
    );
};

export default Card;
