import { useState } from "react"; //NUEVO
import "../estilos/desayunos.css";
import { ButtonDesayunos, ButtonComidas } from "./BotonesMenu";
//import { FiltroMenu } from "./FiltroMenu";


function Menu(props) {
  const [mostrarDesayunos, setMostrarDesayunos] = useState(false); //MANEJA EL ESTADO DE LOS DESAYUNOS DEL MENU
  const [mostrarComidas, setMostrarComidas] = useState(false); //MANEJA EL ESTADO DE LAS COMIDAS DEL MENU
 


  const breakFast = props.productos.filter(
    (producto) => producto.type === "Desayuno"
  );

  const dinner = props.productos.filter(
    (producto) => producto.type === "Almuerzo"
  );
 ///    localStorage.setItem("order", JSON.stringify({ ...order, productos: [...order.productos, product] }))
  function addProduct(product) {
    props.onAddProduct(product);
}
///compartir estado entre dos componente
/// centralizar la info para que ambos esados conozcan los estads
/// nombre a las variables, props, calbacks se deben hacer para entender

  

  
  function FiltroMenu(productos) {
          return productos.map((producto) => (
            <div key={producto.id} className="product">
                <img className="imagen" src={producto.image} alt="Coffee"></img>
                <div className="container-description">
                  <p className="description">
                    {producto.name}
                    <br />
                    {producto.price}
                  </p>
                  <button className="add" onClick={() => addProduct(producto)}>+</button>
                </div>
              </div>
            ));
  } 



  return (
    <div className="container-home">
      <div className="titulo-desayunos">
        <h1 className="title">MENÚ</h1>
      </div>

      <div className="container-buttons">
        <ButtonDesayunos
          onClick={() => [setMostrarDesayunos(true), setMostrarComidas(false)]}
        >
          DESAYUNOS
        </ButtonDesayunos>
        <ButtonComidas
          onClick={() => [setMostrarComidas(true), setMostrarDesayunos(false)]}
        >
          COMIDAS
        </ButtonComidas>
        {/* SE AGREGA EL onClick para cambiar el estado de comidas y desayunos */}
      </div>

      <div className="container-menu" id="carta">
        {mostrarDesayunos && FiltroMenu(breakFast)}
        {/* PASAMOS PROPS A CADA COMPONENTE */}
        {mostrarComidas && FiltroMenu(dinner)}
      </div>
    </div>
  );
}

export default Menu;
