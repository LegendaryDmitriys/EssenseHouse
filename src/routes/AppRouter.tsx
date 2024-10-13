import React from 'react';
// @ts-ignore
import { ROUTES } from "../utils/routes.js";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Project from '../pages/Project';
import GlulamHouse from '../pages/GlulamHouse.js';
import LogHouse from '../pages/LogHouse.js';
import FrameHouse from '../pages/FrameHouse.js';
import ProjectDetail from "../pages/ProjectDetail.tsx";
import ContactsPage from "../pages/ContactsPage.tsx";

const AppRoutes: React.FC = () => {
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={ROUTES.Project} element={<Project/>}/>
                    <Route path={ROUTES.GlulamHouse} element={<GlulamHouse/>}/>
                    <Route path={ROUTES.LogHouse} element={<LogHouse/>}/>
                    <Route path={ROUTES.FrameHouse} element={<FrameHouse/>}/>
                    <Route path={ROUTES.GlulamHouseDetails} element={<ProjectDetail />} />
                    <Route path={ROUTES.LogHouseDetails} element={<ProjectDetail />} />
                    <Route path={ROUTES.FrameHouseDetails} element={<ProjectDetail />} />
                    <Route path={ROUTES.Contacts} element={<ContactsPage/>} />
                </Routes>
            </div>
        </div>
    );
}

export default AppRoutes;