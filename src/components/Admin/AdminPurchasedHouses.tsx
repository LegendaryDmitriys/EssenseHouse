import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedHouses, updatePurchasedHouseStatus } from "../../redux/features/orders/ordersSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";
import Sidebar from "./Sidebar.tsx";
import config from "../../api/api.ts";

const AdminPurchasedHouses: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { purchasedHouses, loading, error } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(fetchPurchasedHouses());
    }, [dispatch]);

    const handleStatusChange = (id: number, status: string) => {
        dispatch(updatePurchasedHouseStatus({ id, construction_status: status }));
    };

    return (
        <div className="dashboard-container">
            <Sidebar/>
            <main className="main-content">
                <h1 className="title-main">Строительство домов</h1>
                <a href={`${config.API_URL}export_purchased_houses/`} className="button is-small is-primary" download style={{marginBottom: "20px"}}>
                    Экспортировать в Excel
                </a>
                {loading ? (
                    <div className="has-text-centered">
                        <i className="fa spinner"></i>
                    </div>
                ) : error ? (
                    <p className="has-text-danger">{error}</p>
                ) : (
                    <table className="table is-fullwidth is-striped is-white" style={{color: "#000"}}>
                        <thead>
                        <tr>
                            <th>Дом</th>
                            <th>Покупатель</th>
                            <th>Телефон</th>
                            <th>Почта</th>
                            <th>Статус строительства</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {purchasedHouses.map((house) => (
                            <tr key={house.id}>
                                <td>{house.house.title}</td>
                                <td>{house.buyer_name}</td>
                                <td>{house.buyer_phone}</td>
                                <td>{house.buyer_email}</td>
                                <td>
                                    {house.construction_status === "in_progress" && (
                                        <span className="tag is-warning">
                                               <i className="fa "></i> В процессе
                                            </span>
                                    )}
                                    {house.construction_status === "completed" && (
                                        <span className="tag is-success">
                                               <i className="fa check"></i>  Построен
                                            </span>
                                    )}
                                    {house.construction_status === "not_started" && (
                                        <span className="tag text-main">
                                                <i></i> Не начато
                                            </span>
                                    )}
                                </td>
                                <td>
                                    <div className="buttons">
                                        <button
                                            className="button is-warning is-small"
                                            onClick={() => handleStatusChange(house.id, "in_progress")}
                                            disabled={house.construction_status === "in_progress"}
                                        >
                                            В процессе
                                        </button>
                                        <button
                                            className="button is-success is-small"
                                            onClick={() => handleStatusChange(house.id, "completed")}
                                            disabled={house.construction_status === "completed"}
                                        >
                                            Построен
                                        </button>
                                        <button
                                            className="button is-light is-small"
                                            onClick={() => handleStatusChange(house.id, "not_started")}
                                            disabled={house.construction_status === "not_started"}
                                        >
                                            Не начато
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default AdminPurchasedHouses;
