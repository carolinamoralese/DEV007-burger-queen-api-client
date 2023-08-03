import '../estilos/desayunos.css';

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


