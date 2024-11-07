import React from "react";

const FinishingOptionsTable: React.FC<{
    finishingOptions: {
        id: number;
        title: string;
        description: string;
        price_per_sqm: string;
        image: string | null;
    }[];
}> = ({ finishingOptions }) => {
    return (
        <table className="table is-fullwidth is-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Цена за м²</th>
                <th>Изображение</th>
            </tr>
            </thead>
            <tbody>
            {finishingOptions.map((option) => (
                <tr key={option.id}>
                    <td>{option.id}</td>
                    <td>{option.title}</td>
                    <td>{option.description}</td>
                    <td>{option.price_per_sqm} ₽</td>
                    <td>
                        {option.image ? (
                            <img
                                src={option.image}
                                alt={option.title}
                                style={{ maxWidth: "100px", height: "auto" }}
                            />
                        ) : (
                            <span>Нет изображения</span>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default FinishingOptionsTable;
