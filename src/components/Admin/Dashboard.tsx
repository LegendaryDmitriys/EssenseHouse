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
            </main>
        </div>
    );
};


export default Dashboard;
