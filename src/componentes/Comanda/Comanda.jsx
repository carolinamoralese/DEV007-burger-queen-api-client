import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Comanda/comanda.css";

function Comanda({
  onMount,
  order,
  onAddProduct,
  onLessProduct,
  onDeleteItem,
  onResetOrder,
}) {
  useEffect(() => {
    onMount();
  }, []);

  // Calcula el total de los productos en la orden
  const totalCuenta = order.productos.reduce(
    (suma, producto) => suma + producto.quantity * producto.price,
    0
  );

  function addProduct(product) {
    onAddProduct(product);
  }

  function lessProduct(product) {
    onLessProduct(product);
  }

  function showAlertSucces() {
    Swal.fire({
      icon: "success",
      title: "Tu orden ha sido creada con exito!",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  function showAlertError() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error con tu orden, verifica tu pedido!",
    });
  }

  //guarda el nombre del cliente
  const [client, setClient] = useState(""); //declaramos el estado del nombre del cliente

  const handleClient = (event) => {
    const nombreCliente = event.target.value;
    if (nombreCliente) {
      setClient(nombreCliente);
    }
  };

  //guarda el pedido
  function PeticionPostOrders() {
    const bearerToken = localStorage.getItem("token");
    if (client && order.productos.length > 0) {
      console.log(order, 611111111);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
        body: JSON.stringify({
          client: client,
          products: order.productos,
          status: "pending",
          dataEntry: new Date().toLocaleString(),
          cantidad: order.quantity,
          startTime: new Date(),
        }),
      };
      fetch("http://localhost:8080/orders", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          showAlertSucces();
          localStorage.removeItem("order");
          onResetOrder();
          setClient("");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      showAlertError();
      console.log("error");
    }
  }

  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input
          className="cliente"
          placeholder="NOMBRE CLIENTE"
          value={client}
          onChange={handleClient}
        ></input>
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
                <p className="precio">${producto.price}</p>{" "}
                {/* usar P sólo cuando sean párrafos */}
              </div>
              <div className="botonesCantidad">
                <button className="mas" onClick={() => addProduct(producto)}>
                  +
                </button>
                <p className="suma-cantidad">{producto.quantity}</p>
                <button
                  className="menos"
                  onClick={() => lessProduct(producto.id)}
                  aria-label="Restar un XXX"
                >
                  -
                </button>
                {/* <button
                  className="eliminar"
                  onClick={() => onDeleteItem(index)}
                >
                  ELIMINAR
                </button> */}
                <button class="eliminar" onClick={() => onDeleteItem(index)}>
                  <span class="icono-basura">&#10060;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="container-total">
          <p className="info-pedidos">TOTAL</p>
          <p className="info-total">
            <p className="suma-precio">${totalCuenta}</p>
          </p>
          <button className="boton-orden" onClick={PeticionPostOrders}>
            CREAR ORDEN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comanda;
/// este es un comentario
