import { useState, useEffect } from "react"; //NUEVO
import "../estilos/comanda.css";



function  Comanda({onMount, order}) {



  useEffect(() => {
    onMount()
}, [])
  /// react agrega eventos, el manejo del dom lo debe hacer react
  /// react debe escuchar eventos con el api react
  /// manejo de dom react

  ///los componente son fnciones par crear elem en el dom, no hay control total de cuantas veces es llamada la funcion
  /// el codigo que esta en el componente se ejecuta n cantidad de veces
  ///windos.addEve... no se puede hacer en el cuerpo de componente


  /// investigar: ciclo de vida de un componente en react
  ///es componente es montado en el nav, aparece en el dom , cuando se monta se renderiza por primera vez y se puede rerenderizar tantas veces sea neceseario
  ///renderizar de la mejor manera
  //inmont - se desmonta el componente del dom, se desaparece
  /// se debe hacer una vez y remover evelintenes durante el mont
  /// se debe usar usesEffect y no windos.addE... 
  /// forma segura de utilizarlo, es usarlo para ejecutar algo en el primer render

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
        
    
        {order.productos.map((producto, index) => (
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