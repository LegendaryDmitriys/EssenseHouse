import React from 'react';
import {HouseProject} from "../../../redux/features/house/houseProjectsSlice.ts";


const HousesTable: React.FC<{ houses: HouseProject[] }> = ({ houses }) => {
    return (
        <table className="table is-fullwidth is-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Категория</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {houses.map((house) => (
                <tr key={house.id}>
                    <td>{house.id}</td>
                    <td>{house.title}</td>
                    <td>{house.price} ₽</td>
                    <td>{house.category.name}</td>
                    <td>
                        <button className="button is-small is-danger">Удалить</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default HousesTable;
