import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css'
import AppRoutes from './routes/AppRouter';
import Header from "./components/Header.tsx";
import React from "react";
import Footer from "./components/Footer.tsx";



const App: React.FC = () => {

  return (
    <>
        <Header color="black"/>
        <AppRoutes/>
        <Footer/>
    </>
  )
}

export default App
