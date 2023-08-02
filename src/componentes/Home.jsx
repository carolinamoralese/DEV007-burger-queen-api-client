import "../estilos/desayunos.css";
import Encabezado from "./Header";
import Desayuno from "./Desayuno";
import { useEffect, useState } from "react";
import { getRequestOptions } from "../servicios/getRequestOptions";
import GetOrder from "./Comanda";

function Home() {
  const [productos, setProductos] = useState([]);
  const [order, setOrder] = useState({ productos: [] });

  function addProducts(product) {
    setOrder({ ...order, productos: [...order.productos, product] });
    console.log(order)
  }

  {
    /* PETICIÓN A LA API PARA MOSTRAR LOS OBJETOS EN LA INTERFAZ */
  }
  useEffect(() => {
    fetch("http://localhost:8080/products", getRequestOptions("GET"))
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson, 15);
        setProductos(responseJson);
      })
      .catch((error) => {
        console.error(error.mensaje);
      });
  }, []);
  
  return (
    <>
    <button onClick={() => addProducts(productos)}>botonprueba</button>
    {order.productos.map((producto, index) => (
  <div key={index}>
    <p>{producto.nombre}</p>
    <p>{producto.precio}</p>
    <p>{producto.cantidad}</p>
  </div>
))}
      <Encabezado />
      <Desayuno productos={productos} />
      <GetOrder order={order} />
    </>
  );
}

export default Home;

