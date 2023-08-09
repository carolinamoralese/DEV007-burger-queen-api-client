import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/pedidos.css";
import Encabezado from "./Header";


function Pedidos() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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
      })
      .catch((error) => {
        console.error("error en la peticion", error);
      });
  }, []);

  return (
    <div className="container-pedidos">
      <div className="Encabezado">
        <Encabezado />
      </div>
      <div className="titulo-pedidos">
        <h1 className="title">PEDIDOS</h1>
      </div>

      <div className="container-comandas"> {/* este es espacio que contiene todos los pedidos*/}
          {orders.map((order, index) => (
            <div className="pedido" key={index}>
              <div className="container-client">
                <p className="name-client">Orden:{order.client}</p>
              </div>
              <div className="header-comanda">
                <p className="info-producto">PRODUCTO</p>
                <p className="info-precio">CANTIDAD</p>
              </div>
              <div className="nombre">
                {/* <p className="listaComida">{order.client}</p> */}
              </div>
              {order.products.map((producto, index) => (
                <div className="container-lista" key={index}>
                  <div className="nombre">
                    <p className="listaComida">{producto.name}</p>
                  </div>
                  <div className="container-precio">
                    <p className="precio">{producto.price}</p>
                  </div>
                  <div className="container-precio">
                    <p className="precio">{producto.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="estado">
          <p>pendiente</p>
        </div>

        <div className="btnEstado">
          <button>ESTADO</button>
        </div>
      
    </div>
  );
}

export default Pedidos;
/// este es un comentario