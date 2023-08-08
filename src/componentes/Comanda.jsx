import { useEffect, useState } from "react";
import "../estilos/comanda.css";


function Comanda({ onMount, order, onAddProduct, onLessProduct, onDeleteItem }) {
  useEffect(() => {
    onMount();
  }, []);
 
function addProduct(product) {
    onAddProduct(product);
  }

function lessProduct(product) {
  onLessProduct(product);
  }

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
            <button className="mas" onClick={() => addProduct(producto)}>+</button>
            {producto.quantity}
            <button className="menos"  onClick={() => lessProduct(producto.id)}>-</button>
            <button className="eliminar" onClick={() => onDeleteItem(index)}>Eliminar</button>
            </div>
          </div>
        ))}
        </div>
        <div className="container-total">
          <p className="info-pedidos">TOTAL</p>
          <p className="info-total">
            <span>$</span>
          </p>
          <button className="boton-orden">CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}

export default Comanda;
