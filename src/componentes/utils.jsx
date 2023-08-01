//import data from '../data.js';

//export function Productos() {

export const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY5MDkxNzIxOCwiZXhwIjoxNjkwOTIwODE4LCJzdWIiOiIyIn0.tsTnxWWTXyx5wDoWHyWE5gLMKcoJNb8QhhnPXodqkCw",
  }, // debe ser variable el bearer cada que se ha
};


const productos = requestOptions;

// return (
//     productos.map((producto) => (
//     <div key={producto.id} className='product'>
//     <img className='imagen' src={producto.image} alt='Coffee'></img>
//     <div className='container-description'>
//         <p className='description'>
//         {producto.name}<br />{producto.price}
//         </p>
//         <button className='add'>+</button>
//     </div>
//     </div>
//     ))
// );
//}

export function Desayunos() {
  const breakfast = productos.filter(
    (producto) => producto.carta === "desayuno"
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
/// productos debe venir por props
///