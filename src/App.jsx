import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Pedidos from "./componentes/Pedidos";
import "./App.css";
import Cocinero from "./componentes/Cocinero";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Menu" element={<Home />} />
      <Route path="/Pedidos" element={<Pedidos />} />
      <Route path="/Cocinero" element={<Cocinero />} />
    </Routes>
  );
}

export default App;
