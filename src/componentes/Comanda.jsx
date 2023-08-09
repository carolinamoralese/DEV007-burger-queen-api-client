import { useEffect, useState } from "react";
import "../estilos/comanda.css";
import Reloj from "./reloj";


function Comanda({ onMount, order, onAddProduct, onLessProduct, onDeleteItem }) {
  useEffect(() => {
    onMount();
  }, []);

  // Calcula el total de los productos en la orden
  const totalCuenta = order.productos.reduce((suma, producto) => (
    suma + (producto.quantity * producto.price)
  ), 0);

function addProduct(product) {
    onAddProduct(product);
  }

function lessProduct(product) {
  onLessProduct(product);
  }


  //guarda el nombre del cliente 
  const [client, setClient] = useState(""); //declaramos el estado del nombre del cliente

  const handleClient = (event) => {
    const nombreCliente = event.target.value
    console.log(nombreCliente);
    if (nombreCliente) {
        setClient(nombreCliente);
    }
};

//guarda el pedido
function PeticionPostOrders() {
  const bearerToken = localStorage.getItem("token");
  if (client) {
    console.log(order, 611111111);
    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + bearerToken,
        },
        body: JSON.stringify({
        client: client,
        products: order.productos, 
        status: "pending",
        dataEntry: '2022-03-05 15:00',
        cantidad: order.quantity
        })
      } 
  fetch("http://localhost:8080/orders", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
      console.log('respuesta exitosa', responseJson);
      })
      .catch((error) => {
      console.error("error en la petición", error);
      });
    } else {
      console.log('error');
    }
}

  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input className="cliente" placeholder="NOMBRE CLIENTE" value={client} onChange={handleClient}></input>
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
            <span>${totalCuenta}</span>
          </p>
          <button className="boton-orden" onClick={PeticionPostOrders}>CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}


export default Comanda;
