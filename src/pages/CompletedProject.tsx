import React, { useEffect, useState } from "react";
import UserCompletedHouseMap from "../components/CompletedHouse/UserCompletedHouseMap.tsx";
import { Link } from "react-router-dom";
// @ts-ignore
import { ROUTES } from "../utils/routes";
import config from "../api/api.ts";
import CompletedProjectSkeleton from "../components/Skeleton/CompletedProjectSkeleton.tsx";

interface Image {
    id: number;
    image: string;
}

interface PurchaseHouse {
    id: number;
    house: {
        title: string;
        images: Image[];
        area: number;
        id: number;
    };
    house_id: number;
    purchase_date: string;
    buyer_name: string;
    latitude: number;
    longitude: number;
}

const CompletedProject: React.FC = () => {
    const [purchases, setPurchases] = useState<PurchaseHouse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHouses = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${config.API_URL}houses/purchase/`);
                const data = await response.json();
                setPurchases(data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных купленных домов:', error);
                setError('Ошибка загрузки данных');
                setLoading(false);
            }
        };

        fetchHouses();
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <CompletedProjectSkeleton />
                </>
            ) : (
                <div className="container">
                    <h1 className="title-main">ГОТОВЫЕ ДОМА</h1>
                    <div className="completed-house__map">
                        {purchases.length > 0 && <UserCompletedHouseMap purchases={purchases} />}
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="line-block">
                        <p>Готовые дома</p>
                    </div>
                    <div className="completed-house">
                        <div className="columns is-multiline">
                            {purchases.map((purchase) => (
                                <div className="card-white card-margin" key={purchase.id}>
                                    <Link to={`${ROUTES.ProjectDetail.replace(':id', purchase.house.id.toString())}`}>
                                        <div className="card-image">
                                            {purchase.house.images.length > 0 ? (
                                                <img
                                                    src={purchase.house.images[0].image}
                                                    alt={`Project ${purchase.house.title}`}
                                                    className="completed-house__image"
                                                    style={{ width: "425px", height: '350px' }}
                                                />
                                            ) : (
                                                <div className="no-image">Нет изображения</div>
                                            )}
                                            <div
                                                className="has-text-white is-size-4 has-text-weight-bold"
                                                style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                                            >
                                                <span className="completed-house__span text-main white">Готовые дома</span>
                                                <p className="completed-house__text white">{purchase.house.title}, {purchase.house.area}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CompletedProject;