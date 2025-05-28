
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export const ProtectedRoute = ({
                                                                  children,
                                                                  adminOnly = false
                                                              }: ProtectedRouteProps) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};