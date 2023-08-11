import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Pedidos from "./componentes/Pedidos";
import "./App.css";
import OrdenChef from "./componentes/OrdenChef";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Menu" element={<Home />} />
      <Route path="/Pedidos" element={<Pedidos />} />
      <Route path="/Chef" element={<OrdenChef />} />
    </Routes>
  );
}

export default App;
