import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login/Login";
import Home from "./componentes/Home/Home";
import Pedidos from "./componentes/Pedidos/Pedidos";
import Cocinero from "./componentes/Cocinero/Cocinero";
import Administrador from "./componentes/Administrador/Administrador"
import Inventario from "./componentes/Inventario/Invetario"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Menu" element={<Home />} />
      <Route path="/Pedidos" element={<Pedidos />} />
      <Route path="/Cocinero" element={<Cocinero />} />
      <Route path="/Administrador" element={<Administrador />} />
      <Route path="/Inventario" element={<Inventario />} />
    </Routes>
  );
}

export default App;
