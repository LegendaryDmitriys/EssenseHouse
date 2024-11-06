import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthContext.tsx';
import { ROUTES } from "../utils/routes";

const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({ redirectPath = ROUTES.Home }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        console.log("Пользователь не аутентифицирован. Редирект на:", redirectPath);
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
