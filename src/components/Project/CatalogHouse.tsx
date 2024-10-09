import React from 'react';
import Card from './Card';

const houses = [
    {
        id: 1,
        title: "Проект дома из клееного бруса «Рино»",
        price: 2160000,
        originalPrice: 2650000,
        imageUrl: "/path/to/image1.jpg",
    },
    {
        id: 2,
        title: "Проект дома из клееного бруса «Кламат»",
        price: 1700000,
        originalPrice: 2300000,
        imageUrl: "/path/to/image2.jpg",
    },
    {
        id: 3,
        title: "Проект дома из клееного бруса «Редлин»",
        price: 4550000,
        originalPrice: 4550000,
        imageUrl: "/path/to/image3.jpg",
    },
];

const CatalogHouse: React.FC = () => {
    return (
        <div className="catalog">
            <h1 className="title">Дома из клееного бруса</h1>
            <p className="description">
                Дома из клееного бруса — это экологичный выбор для загородной жизни...
            </p>
            <div className="columns is-multiline">
                {houses.map((house) => (
                    <div className="column is-one-third" key={house.id}>
                        <Card house={house} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatalogHouse;
