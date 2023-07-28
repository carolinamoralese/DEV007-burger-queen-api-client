import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './componentes/Login'
import Product from './componentes/Product'


function App() {
  

  //if(user){
    //return <Login setUser={setUser} />;
  //}

  return (
    <Routes>
      <Route path='/login' element={<Login  />} />
      <Route path='/Menu' element={<Product />} />
    </Routes>
  )
}

export default App
