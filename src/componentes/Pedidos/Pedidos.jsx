import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pedidos/pedidos.css";
import Encabezado from "../Header/Header";
import {
  peticionUpdateOrder,
  peticionGetOrders,
  peticionDeleteOrder,
} from "../../servicios/servicios";

  /*------------------------------------- FUNCION PARA CALCULAR EL TIEMPO DE LA ORDEN  --------------------------------------*/
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
    peticionGetOrders(bearerToken).then((orders) => {
      setOrders(orders);
      setRequestStatus("success")
    });
  }, []);


  /*------------------------------------- FUNCION PARA ACTUALIZAR EL ESTADO DE LA ORDEN --------------------------------------*/
  function updateOrder(orderId, newStatus) {
    const options = {
      onSuccess: () => {
        peticionGetOrders(bearerToken, options).then((orders) => {
          setOrders(orders);
          setRequestStatus("success")
        });
      },
      onError: () => {
        setRequestStatus("error");
      },
    };
    peticionUpdateOrder(orderId, newStatus, bearerToken, options);
  }


  /*------------------------------------- FUNCION PARA ELIMINAR LA ORDEN --------------------------------------*/
  function deleteOrder(orderId) {
    const options = {
      onSuccess: () => {
        peticionGetOrders(bearerToken, options).then((orders) => {
          setOrders(orders);
          setRequestStatus("success")
        });
      },
      onError: () => {
        setRequestStatus("error");
      },
    };
    peticionDeleteOrder(orderId, bearerToken, options);
  }

  /*------------------------------------- RENDERIZAR COMPONENTE --------------------------------------*/
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
