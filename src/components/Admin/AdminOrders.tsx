import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../redux/features/orders/ordersSlice.ts";
import Sidebar from "./Sidebar.tsx";
import {Link} from "react-router-dom";


const AdminOrders: React.FC = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state: any) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleUpdateStatus = (id: number, newStatus: "pending" | "approved" | "rejected") => {
        dispatch(updateOrderStatus({ id, status: newStatus }));
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    if (loading) return <p>Загрузка заказов...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className="dashboard-container">
            <Sidebar/>
            <main className="main-content">
                <h2 className="subtitle-main">Управление заказами домов</h2>
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-item">
                            {order.house && order.finishing_option ? (
                                <div className="order-details">
                                    <Link to={`/project/details/${order.house.id}`}>
                                        <h3 className="subtitle is-5">{order.house.title} {order.house.id}</h3>
                                    </Link>
                                    <p>Данные покупателя</p>
                                    <p className="text-main">Имя {order.name}</p>
                                    <p className="text-main">Номер телефона - {order.phone}</p>
                                    <p className="text-main">Электронная почта - {order.email}</p>
                                    <p className="text-main">Заявленное место строительства - {order.construction_place}</p>
                                    <p className="text-main">Выбранная отделка для дома {order.finishing_option.title}</p>
                                    <p className="text-main">Дата заказа: {formatDate(order.data_created)}</p>
                                    <p className="text-main">Статус:
                                        <span className={`tag ${order.status === "approved" ? "is-success" : order.status === "rejected" ? "is-danger" : "is-warning"}`}>
                        {order.status === "approved" ? "Подтвержден" : order.status === "rejected" ? "Отменен" : "В обработке"}
                    </span>
                                    </p>
                                </div>
                            ) : (
                                <p>Некорректные данные заказа</p>
                            )}
                            <div className="order-actions">
                                <button
                                    className="button is-small is-warning"
                                    onClick={() => handleUpdateStatus(order.id, "pending")}
                                    disabled={order.status === "pending"}
                                >
                                    В обработке
                                </button>
                                <button
                                    className="button is-small is-success"
                                    onClick={() => handleUpdateStatus(order.id, "approved")}
                                    disabled={order.status === "approved"}
                                >
                                    Подтвердить
                                </button>
                                <button
                                    className="button is-small is-danger"
                                    onClick={() => handleUpdateStatus(order.id, "rejected")}
                                    disabled={order.status === "rejected"}
                                >
                                    Отменить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
);
};

export default AdminOrders;
