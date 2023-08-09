//import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "../estilos/pedidos.css";
import Encabezado from "./Header";

function Pedidos() {
  return (
    <div className="container-pedidos">
      <div className="Encabezado">
        <Encabezado />
      </div>

      <div className="titulo-pedidos">
        <h1 className="title">PEDIDOS</h1>
      </div>

      <div className="container-productos">
      <div className="container-orden">
        <p className="orden">Orden:</p>
      </div>

      <div className="header-comanda">
        <p className="info-producto">PRODUCTO</p>
        <p className="info-precio">CANTIDAD</p>
      </div>

      <div className="container-pedidos">
        <p className="litapedidos">cafe</p>
        <p className="listacantidad">1</p>
      </div>

      <div className="estado">
        <p>pendiente</p>
      </div>

      <div className="btnEstado">
        <button>ESTADO</button>
      </div>

      </div>

    </div>
  );
}

export default Pedidos;
