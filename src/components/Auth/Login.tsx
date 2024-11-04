import React, { useState } from 'react';
import { useAuth } from '../../services/AuthContext.tsx';
import {ROUTES} from "../../utils/routes";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            if (isAuthenticated) {
                navigate(ROUTES.AdminDashboard);
            }
        } catch (err) {
            setError('Неверные учетные данные');
        }
    };

    return (
        <div className="section" style={{backgroundColor: '#f5f7fa', minHeight: '100vh'}}>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <h2 className="title-main has-text-centered">Вход в админку</h2>
                        <form onSubmit={handleSubmit} className="box" style={{backgroundColor: '#ffffff', borderRadius: '8px', padding: '2rem', height: 'auto' }}>
                            <div className="field">
                                <label className="label" style={{color: '#4a4a4a'}}>Почта *</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input is-light"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{backgroundColor: 'transparent', borderColor: '#e5e5e5', color: '#000'}}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color: '#4a4a4a'}}>Пароль *</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input is-light"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{backgroundColor: 'transparent', borderColor: '#e5e5e5', color: '#000'}}
                                    />
                                    <span className="icon is-small is-left" >
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            {error && (
                                <p className="help is-danger">{error}</p>
                            )}
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-primary is-fullwidth">
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
