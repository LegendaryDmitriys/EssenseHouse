import React from 'react';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/admin/dashboard.css'
import Sidebar from "./Sidebar.tsx";


const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <section className="hero is-light is-bold">
                    <div className="hero-body">
                        <p className="title">Админ-дэшборд</p>
                        <p className="subtitle">Добро пожаловать в панель управления!</p>
                    </div>
                </section>

                <section className="section stats">
                    <div className="columns is-multiline">
                        <div className="column is-one-quarter">
                            <div className="box notification is-primary has-text-centered">
                                <p className="title">150</p>
                                <p className="subtitle">Пользователей</p>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="box notification is-info has-text-centered">
                                <p className="title">75</p>
                                <p className="subtitle">Активных задач</p>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="box notification is-warning has-text-centered">
                                <p className="title">23</p>
                                <p className="subtitle">Новые сообщения</p>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="box notification is-danger has-text-centered">
                                <p className="title">5</p>
                                <p className="subtitle">Ошибки системы</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="box">
                        <h2 className="title is-4">Последние события</h2>
                        <ul>
                            <li>Пользователь <strong>admin@example.com</strong> вошел в систему</li>
                            <li>Задача <strong>#123</strong> была выполнена</li>
                            <li>Новое сообщение от пользователя <strong>user1@example.com</strong></li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};


export default Dashboard;
