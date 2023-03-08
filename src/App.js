import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Register, Cart } from './pages/index'
import { Header, Footer } from './components/index'

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/'  element={ <Home /> }/>
        <Route path='/login'  element={ <Login /> }/>
        <Route path='/register'  element={ <Register /> }/>
        <Route path='/cart'  element={ <Cart /> }/>
      </Routes>
      <Footer /> 
    </BrowserRouter>
      
    </>
  );
}

export default App;
