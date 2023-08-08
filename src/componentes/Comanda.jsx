import { useEffect, useState } from "react";
import "../estilos/comanda.css";

function Comanda({ onMount, order, onDeleteItem }) {
  useEffect(() => {
    onMount();
  }, []);
  
  //let cantidad = 1

  const [cantidad, setCantidad] = useState(1); //Declaramos cantidad de forma correcta

  // Calcula el total de los productos en la orden
  const totalCuenta = order.productos.reduce((suma, producto) => (
    suma + (cantidad * producto.price)
  ), 0);

  const aumentar = () => {
    setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };


  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input className="cliente" placeholder="NOMBRE CLIENTE"></input>
        <div className="container-pedido">
          <p className="info-producto">PRODUCTO</p>
          <p className="info-precio">PRECIO</p>
          <p className="info-cantidad">CANTIDAD</p>
        </div>
        <div className="lista-productos">
        {order.productos.map((producto, index) => (
          <div className="container-lista" key={index}>
            <div className="nombre">
            <p className="listaComida">{producto.name}</p>
            </div>
            <div className="container-precio">
            <p className="precio">{producto.price}</p>
            </div>
            <div className="botonesCantidad">
            <button className="mas" onClick={aumentar}>+</button>
            <p className="suma">{cantidad}</p>
            <button className="menos" onClick={disminuir}>-</button>
            <button className="eliminar" onClick={() => onDeleteItem(index)}>Eliminar</button>
            </div>
          </div>
        ))}
        </div>
        <div className="container-total">
          <p className="info-pedidos">TOTAL</p>
          <p className="info-total">
            <span>${totalCuenta}</span>
          </p>
          <button className="boton-orden">CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}

export default Comanda;
