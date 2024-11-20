import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../redux/features/orders/ordersSlice.ts";
import Sidebar from "./Sidebar.tsx";
import { Link } from "react-router-dom";
import {AppDispatch} from "../../redux/store.ts";
import { Order } from "../../redux/features/orders/ordersSlice.ts"
import config from "../../api/api.ts";

const AdminOrders: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
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

    console.log(orders);
    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <h2 className="subtitle-main">Управление заказами домов</h2>
                <div className="buttons">
                    <a href={`${config.API_URL}export_orders/`} className="button is-small is-primary" download>
                        Экспортировать в Excel
                    </a>
                </div>
                {loading ? (
                    <div className="has-text-centered">
                        <i className="fa spinner"></i>
                    </div>
                ) : error ? (
                    <p className="has-text-danger">{error}</p>
                ) : (
                    <div className="orders-list">
                        {orders.map((order: Order) => (
                            <div key={order.id} className="box order-item mb-5"
                                 style={{height: "auto", border: "1px solid #e5e5e5"}}>
                                {order.house_details  ? (
                                    <div className="order-details">
                                        <Link to={`/project/details/${order.house.id}`}>
                                            <h3 className="subtitle is-5">
                                                {order.house_details.title} #{order.house_details.id}
                                            </h3>
                                        </Link>
                                        <div className="content">
                                            <p className="text-main">Данные покупателя</p>
                                            <p>Имя: <span className="has-text-weight-medium">{order.name}</span></p>
                                            <p>Номер телефона: <span
                                                className="has-text-weight-medium">{order.phone}</span></p>
                                            <p>Электронная почта: <span
                                                className="has-text-weight-medium">{order.email}</span></p>
                                            <p>Место строительства: <span
                                                className="has-text-weight-medium">{order.construction_place} ({order.latitude}, {order.longitude})</span>
                                            </p>
                                            <p>
                                                {order.finishing_option ? (
                                                    <span
                                                        className="has-text-weight-medium">{order.finishing_option.title}</span>
                                                ) : (
                                                    null
                                                )}
                                            </p>
                                            <p>Дата заказа: <span
                                                className="has-text-weight-medium">{formatDate(order.data_created)}</span>
                                            </p>
                                            <p>Статус:
                                                <span
                                                    className={`tag is-medium ${order.status === "approved" ? "is-success" : order.status === "rejected" ? "is-danger" : "is-warning"} ml-2`}>
                                                <i className={`fas ${order.status === "approved" ? "fa-check-circle" : order.status === "rejected" ? "fa-times-circle" : "fa-spinner"} mr-1`}></i>
                                                    {order.status === "approved" ? "Подтвержден" : order.status === "rejected" ? "Отменен" : "В обработке"}
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="has-text-danger">Некорректные данные заказа</p>
                                )}
                                <div className="order-actions buttons mt-4">
                                    <button
                                        className="button is-small is-info"
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
                )}
            </main>
        </div>
    );
};

export default AdminOrders;
