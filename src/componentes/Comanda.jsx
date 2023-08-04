import { useEffect } from "react";
import "../estilos/comanda.css";

function Comanda({ onMount, order }) {
  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input className="cliente" placeholder="Cliente"></input>
        <div className="container-pedido">
          <p className="info-producto">PRODUCTO</p>
          <p className="info-precio">PRECIO</p>
          <p className="info-cantidad">CANTIDAD</p>
        </div>

        {order.productos.map((producto, index) => (
          <div key={index}>
            <p>{producto.name}</p>
          </div>
        ))}

        <div className="container-total">
          <p className="info-pedidos">TOTAL</p>
          <p className="info-pedidos">
            <span>$</span>
          </p>
          <button className="boton-orden">CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}

export default Comanda;
