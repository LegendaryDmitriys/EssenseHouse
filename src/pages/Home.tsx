import React from "react";
import '../styles/min.css'

import Footer from "../components/Footer";
import Outer from "../components/Outer";
import ProjectSection from "../components/ProjectSection";
import HouseCosteCalck from "../components/HouseCosteCalck";
import Stages from "../components/Stages";
import FAQ from "../components/FAQ";
import ContactSection from "../components/ContactSection";
import MainBanner from "../components/MainBanner";

const Home: React.FC = () => {
    return(
        <> 
            <MainBanner/>
            <Outer/>
            <ProjectSection/>
            <HouseCosteCalck/>
            <Stages/>
            <FAQ/>
            <ContactSection/>
            <Footer/>
        </>
    )
}

export default Home
