import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css'
import AppRoutes from './routes/AppRouter';



const App: React.FC = () => {

  return (
    <>
      {/* <Home/>
      <Project/> */}
      <AppRoutes/>
    </>
  )
}

export default App
