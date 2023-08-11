import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/pedidos.css";
import Encabezado from "./Header";

function calculateOrderTime(startTime) {
  const now = new Date();
  const orderTimeDifference = now - new Date(startTime);
  const seconds = Math.floor(orderTimeDifference / 1000);
  const minutes = Math.trunc(seconds / 60);
  return `${minutes} Minutos`; // Cambia esto según tu necesidad
}

function Pedidos() {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // Estado para la hora actual
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState("pending");
  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      navigate("/");
      return;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + bearerToken,
      },
    };

    fetch("http://localhost:8080/orders", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("respuesta exitosa", responseJson);
        setOrders(responseJson);
        setRequestStatus("success");
      })
      .catch((error) => {
        /* console.error("error en la peticion", error); */
        setRequestStatus("error");
      });

    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualizar cada segundo
  }, []);

  return (
    <div className="container-pedidos">
      <div className="container-encabezado">
        <Encabezado />
      </div>
      <div className="titulo-pedidos">
        <h1 className="title-pedidos">PEDIDOS</h1>
      </div>

      <div className="container-comandas">
        {" "}
        {/* este es espacio que contiene todos los pedidos*/}
        {requestStatus === "pending" ? (
          <span style={{ color: "white" }}>CARGANDO</span>
        ) : (
          orders.map((order, index) => (
            <div className="pedido" key={index}>
              <div className="container-client">
                <p className="name-client">Orden: {order.client}</p>
              </div>
              <div className="header-comanda">
                <p className="pedido-producto">PRODUCTO</p>
                <p className="pedido-cantidad">CANTIDAD</p>
                <p className="pedido-precio">PRECIO</p>
              </div>
              <div className="tiempo-transcurrido">
                Tiempo: {calculateOrderTime(order.startTime)}
              </div>

              <div className="listado-comida-container">
                {order.products.map((producto, index) => (
                  <div className="container-comida" key={index}>
                    <p className="pedido-food">{producto.name}</p>
                    <p className="pedido-price">{producto.price}</p>
                    <p className="pedido-qty">{producto.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="estado">
                <p>Estado: pendiente</p>
              </div>
              <div className="container-btnEstado">
                <button className="btnEstado">ACTUALIZAR</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Pedidos;
/// este es un comentario
