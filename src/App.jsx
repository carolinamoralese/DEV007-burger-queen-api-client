import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './componentes/Login'
import Home from './componentes/Home'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Login  />} />
      <Route path='/Menu' element={<Home />} />
    </Routes>
  )
}

export default App
