import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import AppRoutes from './routes/AppRouter';
import React from "react";
import {AuthProvider} from "./services/AuthContext.tsx";


const App: React.FC = () => {

  return (
    <>
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    </>
  )
}

export default App
