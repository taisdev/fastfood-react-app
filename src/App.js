import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, Login, Register, Reset, Cart } from './pages/index'
import { Header, Footer } from './components/index'

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/'  element={ <Home /> }/>
        <Route path='/login'  element={ <Login /> }/>
        <Route path='/register'  element={ <Register /> }/>
        <Route path='/reset'  element={ <Reset /> }/>
        <Route path='/cart'  element={ <Cart /> }/>
      </Routes>
      <Footer /> 
    </BrowserRouter>
      
    </>
  );
}

export default App;
