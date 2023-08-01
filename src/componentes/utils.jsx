//import data from '../data.js';

//export function Productos() {


export function getRequestOptions(method, bearerToken=null){
    const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY5MDkzMjY1OSwiZXhwIjoxNjkwOTM2MjU5LCJzdWIiOiIyIn0.NEErT-oQ1ext9EBXBraiNaWhr46QbiVCV2jYKN2XZ4Q"
    let requestOptions = {
        method: method,
        headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " 
            
        }, // debe ser variable el bearer cada que se ha
    }

    if(true==true){
        requestOptions['headers']['authorization'] = "Bearer " + tokenMock
    }

    return requestOptions
  
};


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

export function Desayunos(props) {
    console.log(props.productos)
//   const breakfast = productos.productos.filter(
//     (producto) => producto.carta === "desayuno"
//   );

    console.log(props.productos, 666)
    if(props.productos.length > 0){
        
        return props.productos.map((producto) => (
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

  
}
/// productos debe venir por props
///