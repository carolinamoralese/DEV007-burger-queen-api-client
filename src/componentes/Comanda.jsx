import { useState } from "react"; //NUEVO
import "../estilos/comanda.css";



function  Comanda(props) {
  const [order, setOrder] = useState([]);


  window.addEventListener('storage', (event) => {
    const orderLocalStorage = JSON.parse(localStorage.getItem("order"))
    console.log(orderLocalStorage.productos, 5555);
    setOrder(orderLocalStorage.productos);
    console.log(order);
  });
  
  
  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input className="cliente" placeholder="Cliente"></input>
        <div className="container-pedido">
          <p className="info-producto">PRODUCTO</p>
          <p className="info-precio">PRECIO</p>
          <p className="info-cantidad">CANTIDAD</p>
        </div>
        
    
        {order.map((producto, index) => (
      <div key={index}>
        <p>{producto.name}</p>
        </div>
      ))}
        
      
        <div className="container-total">
          <p className="info-pedidos">TOTAL</p>
          <p className="info-pedidos">
            <span>$</span>
          </p>
          <button className="boton-orden">CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}

export default Comanda;

//probar la funcion haciendo un boton para ver producto por producto, llamarlo order,