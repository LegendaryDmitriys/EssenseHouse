import React from 'react';
// @ts-ignore
import { ROUTES } from "../utils/routes.js";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from '../pages/Home';
import Project from '../pages/Project';
import ContactsPage from "../pages/ContactsPage.tsx";
import About from "../pages/About.tsx";
import Reviews from "../pages/Reviews.tsx";
import CatalogPage from "../components/Project/CatalogPage.tsx";
import ProjectDetail from "../pages/ProjectDetail.tsx";
import CompletedProject from "../pages/CompletedProject.tsx";
import ComparisonList from "../pages/ComparisonList.tsx";
import Login from "../components/Auth/Login.tsx";
import Dashboard from "../components/Admin/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Header from "../components/Header.tsx";
import CommentsList from "../components/Admin/CommentsList.tsx";
import AdminOrders from "../components/Admin/AdminOrders.tsx";


const AppRoutes: React.FC = () => {
    const location = useLocation();


    const noHeaderPaths = [ROUTES.AdminLogin, ROUTES.AdminDashboard, ROUTES.AdminComment, ROUTES.AdminOrders];
    const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

    return (
        <div>
            {shouldShowHeader && <Header color="black" />}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={ROUTES.Project} element={<Project/>}/>
                    <Route path={ROUTES.Contacts} element={<ContactsPage/>} />
                    <Route path={ROUTES.About} element={<About/>} />
                    <Route path={ROUTES.Reviews} element={<Reviews />} />
                    <Route path={ROUTES.CatalogCategory} element={<CatalogPage />} />
                    <Route path={ROUTES.ProjectDetail} element={<ProjectDetail/>} />
                    <Route path={ROUTES.CompletedProject} element={<CompletedProject/>} />
                    <Route path={ROUTES.ComparisonProject} element={<ComparisonList/>} />
                    <Route path={ROUTES.AdminLogin} element={<Login/>} />

                    <Route element={<ProtectedRoute />}>
                        <Route path={ROUTES.AdminDashboard} element={<Dashboard />} />
                        <Route path={ROUTES.AdminComment} element={<CommentsList />} />
                        <Route path={ROUTES.AdminOrders} element={<AdminOrders />} />
                    </Route>
                </Routes>
        </div>
    );
}

export default AppRoutes;