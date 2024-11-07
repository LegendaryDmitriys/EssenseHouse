import React from "react";

const CategoriesTable: React.FC<{ categories: { id: number; name: string }[] }> = ({ categories }) => {
    return (
        <table className="table is-fullwidth is-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((category) => (
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CategoriesTable