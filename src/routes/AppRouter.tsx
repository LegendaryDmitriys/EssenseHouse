import React from 'react';
// @ts-ignore
import { ROUTES } from "../utils/routes.js";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Project from '../pages/Project';
import ContactsPage from "../pages/ContactsPage.tsx";
import About from "../pages/About.tsx";
import Reviews from "../pages/Reviews.tsx";
import CatalogPage from "../components/Project/CatalogPage.tsx";
import ProjectDetail from "../pages/ProjectDetail.tsx";
import CompletedProject from "../pages/CompletedProject.tsx";
import ComparisonList from "../pages/ComparisonList.tsx";


const AppRoutes: React.FC = () => {
    return (
        <div>
            <div>
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
                </Routes>
            </div>
        </div>
    );
}

export default AppRoutes;