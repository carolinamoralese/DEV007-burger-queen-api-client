import '../estilos/desayunos.css';

/*--------------------------------- FUNCIÓN PROVISIONAL PARA USAR TOKEN ------------------------------------------------*/


/*--------------------------------- FUNCIÓN MOSTRAR DESAYUNOS EN MENU ------------------------------------------------*/
export function Desayunos(props) {
  const productos = props.productos;
    const breakfast = productos.filter(
    (producto) => producto.type === "Desayuno"
  );
        return breakfast.map((producto) => (
          <div key={producto.id} className="product">
              <img className="imagen" src={producto.image} alt="Coffee"></img>
              <div className="container-description">
                <p className="description">
                  {producto.name}
                  <br />
                  {producto.price}
                </p>
                <button className="add">+</button>
              </div>
            </div>
          ));
} 

/*--------------------------------- FUNCIÓN MOSTRAR COMIDAS EN MENU ------------------------------------------------*/
export function Comidas(props) {
  const productos = props.productos;
  const dinner = productos.filter(
  (comida) => comida.type === "Almuerzo"
);
  if(props.productos.length > 0){
      return dinner.map((comida) => (
          <div key={comida.id} className="product">
            <img className="imagen" src={comida.image} alt="Coffee"></img>
            <div className="container-description">
              <p className="description">
                {comida.name}
                <br />
                {comida.price}
              </p>
              <button className="add">+</button>
            </div>
          </div>
        ));
  }  
}



/* export function Desayunos(props) {
  const menuDiv = document.getElementById('carta')
  menuDiv.innerHTML = ''; 
  const productos = props.productos;
    //console.log(props.productos, 42)
    const breakfast = productos.filter(
    (producto) => producto.type === "Desayuno"
    
  );
  //console.log(breakfast, 666)
  return breakfast 
      if(props.productos.length > 0){ 
        return breakfast.map((producto) => (
          menuDiv.innerHTML += ` 
          <div key={producto.id} className="product">
              <img className="imagen" src={producto.image} alt="Coffee"></img>
              <div className="container-description">
                <p className="description">
                  {producto.name}
                  <br />
                  {producto.price}
                </p>
                <button className="add">+</button>
              </div>
            </div>
          ` 
          ));
    }    
}  */


