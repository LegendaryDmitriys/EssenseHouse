import React from 'react';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/admin/dashboard.css'
import Sidebar from "./Sidebar.tsx";
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const lineChartData = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
        datasets: [
            {
                label: 'Продажи',
                data: [30, 40, 55, 60, 70, 90],
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.1
            }
        ]
    };

    // Настройки для линейного графика
    const lineChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Продажи за полугодие'
            }
        }
    };

    // Данные для кругового графика
    const doughnutChartData = {
        labels: ['Пользователи', 'Активные задачи', 'Новые сообщения', 'Ошибки'],
        datasets: [
            {
                label: 'Статистика',
                data: [150, 75, 23, 5],
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
                hoverOffset: 4
            }
        ]
    };

    // Настройки для кругового графика
    const doughnutChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Общая статистика'
            }
        }
    };


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
                            <div className="box notification is-primary has-text-centered" style={{height: "auto"}}>
                                <p className="title">150</p>
                                <p className="subtitle">Пользователей</p>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="box notification is-primary has-text-centered" style={{height: "auto"}}>
                                <p className="title">75</p>
                                <p className="subtitle">Активных задач</p>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="box notification is-primary has-text-centered" style={{height: "auto"}}>
                                <p className="title">23</p>
                                <p className="subtitle">Новые сообщения</p>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="box notification is-primary has-text-centered" style={{height: "auto"}}>
                                <p className="title">5</p>
                                <p className="subtitle">Ошибки системы</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section">
                    <div className="columns is-multiline">
                        <div className="column is-half">
                            <div className="box" style={{height: "auto"}}>
                                <h2 className="title is-4">Продажи за полугодие</h2>
                                <Line data={lineChartData} options={lineChartOptions}/>
                            </div>
                        </div>
                        <div className="column is-half">
                            <div className="box" style={{height: "auto"}}>
                                <h2 className="title is-4">Общая статистика</h2>
                                <Doughnut data={doughnutChartData} options={doughnutChartOptions}/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};


export default Dashboard;
