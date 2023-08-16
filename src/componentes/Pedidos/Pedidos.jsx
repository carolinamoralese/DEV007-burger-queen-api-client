import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pedidos/pedidos.css";
import Encabezado from "../Header/Header";

function calculateOrderTime(startTime) {
  const now = new Date();
  const orderTimeDifference = now - new Date(startTime);
  const seconds = Math.floor(orderTimeDifference / 1000);
  const minutes = Math.trunc(seconds / 60);
  return `${minutes} Minutos`;
}

function Pedidos() {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // Estado para la hora actual
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState("pending");
  const userRole = localStorage.getItem("role"); //NUEVO traemos el rol del local
  const bearerToken = localStorage.getItem("token");
  useEffect(() => {
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
        setRequestStatus("error");
      });

    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualizar cada segundo
  }, []);

  //Petición para actualizar el estado de la orden
  function updateOrder(orderId, newStatus) {
    const updateOrderOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        id: orderId,
        status: newStatus,
      }),
    };

    fetch(`http://localhost:8080/orders/${orderId}`, updateOrderOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("respuesta exitosa", responseJson);
        // Actualizar el estado de las órdenes
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      })
      .catch((error) => {
        setRequestStatus("error");
      });
  }

  //Petición para ELIMINAR la orden
  function deleteOrder(orderId) {
    const deleteOrderOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
    };

    fetch(`http://localhost:8080/orders/${orderId}`, deleteOrderOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("eliminación exitosa", responseJson);

        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
      })
      .catch((error) => {
        setRequestStatus("error");
      });
  }

  return (
    <>
      <Encabezado />
      <div className="container-pedidos">
        <div className="titulo-pedidos">
          <h1 className="title">PEDIDOS</h1>
        </div>

        <div className="container-comandas">
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
                  {userRole === "WAITER" && ( //condicional para solo mostrar el precio al mesero
                    <p className="pedido-precio">PRECIO</p>
                  )}
                </div>
                <div className="tiempo-transcurrido">
                  TIEMPO: {calculateOrderTime(order.startTime)}
                </div>

                <div className="listado-comida-container">
                  {order.products.map((producto, index) => (
                    <div className="container-comida" key={index}>
                      <p className="pedido-food">{producto.name}</p>
                      <p className="pedido-qty">{producto.quantity}</p>
                      {userRole === "WAITER" && ( //condicional para solo mostrar el precio al mesero
                        <p className="pedido-price">{producto.price}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="estado">
                  <p>Estado: {order.status}</p>
                </div>
                <div className="container-btnEstado">
                  {userRole === "CHEF" &&
                    order.status === "pending" && ( //condicional para solo mostrar el boton de actualizar al chef
                      <button
                        className="btnEstado"
                        onClick={() => updateOrder(order.id, "delivered")}
                      >
                        ACTUALIZAR
                      </button>
                    )}
                  {userRole === "WAITER" && order.status === "delivered" && (
                    <button
                      className="btn-cerrar-orden"
                      onClick={() => deleteOrder(order.id)}
                    >
                      CERRAR ORDEN
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Pedidos;
