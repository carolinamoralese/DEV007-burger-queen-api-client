import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Encabezado from "./Header";
import Pedidos from "./Pedidos";

function OrdenChef() {
    return(
    <Pedidos />
    )
//   const [orders, setOrders] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date()); // Estado para la hora actual
  const navigate = useNavigate();

//   function LogOut() {
//     localStorage.clear();
//     navigate("/");
//   }

//   useEffect(() => {
//     const bearerToken = localStorage.getItem("token");
//     if (!bearerToken) {
//       navigate("/");
//       return;
//     }

//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + bearerToken,
//       },
//     };

//     fetch("http://localhost:8080/orders", requestOptions)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log("respuesta exitosa", responseJson);
//         setOrders(responseJson);
//       })
//       .catch((error) => {
//         console.error("error en la peticion", error);
//       });

//     setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000); // Actualizar cada segundo
//   }, []);

//   function calculateOrderTime(startTime) {
//     const now = new Date();
//     const orderTimeDifference = now - new Date(startTime);
//     const seconds = Math.floor(orderTimeDifference / 1000);
//     const minutes = Math.trunc(seconds / 60);
//     return `${minutes} Minutos`; // Cambia esto según tu necesidad
//   }

//   return (
//     <div className="container-pedidos">
//       <div className="Encabezado">
//       <button className="boton" onClick={() => LogOut()}>
//             SALIR
//           </button>
//       </div>
//       <div className="titulo-pedidos">
//         <h1 className="title">PEDIDOS</h1>
//       </div>

//       <div className="container-comandas">
//         {" "}
//         {/* este es espacio que contiene todos los pedidos*/}
//         {orders.map((order, index) => (
//           <div className="pedido" key={index}>
//             <div className="container-client">
//               <p className="name-client">Orden: {order.client}</p>
//             </div>
//             <div className="header-comanda">
//               <p className="pedido-producto">PRODUCTO</p>
//               <p className="pedido-cantidad">CANTIDAD</p>
//               <p className="pedido-precio">PRECIO</p>
//             </div>
//             <div className="tiempo-transcurrido">
//               Tiempo transcurrido: {calculateOrderTime(order.startTime)}
//             </div>
//             {order.products.map((producto, index) => (
//               <div className="container-comida" key={index}>
//                 <div className="listado-comida">
//                   <p className="pedido-food">{producto.name}</p>
//                 </div>
//                 <p className="pedido-price">{producto.price}</p>
//                 <p className="pedido-qty">{producto.quantity}</p>
//               </div>
//             ))}
//             <div className="estado">
//               <p>pendiente</p>
//             </div>

//             <div className="container-btnEstado">
//               <button className="btnEstado">ESTADO</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
}

export default OrdenChef