import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css'
import AppRoutes from './routes/AppRouter';
import Header from "./components/Header.tsx";
import React from "react";


const App: React.FC = () => {

  return (
    <>
        <Header color="black"/>
        <AppRoutes/>
    </>
  )
}

export default App
