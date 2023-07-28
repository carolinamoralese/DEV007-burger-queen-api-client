import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './componentes/Login'
import Product from './componentes/Product'


function App() {

  return (
    
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/Menu' element={<Product />} />
    </Routes>
    /*<>
    <Login />;
    <Product />;
    </>*/
  )
}

export default App
