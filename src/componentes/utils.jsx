//import data from '../data.js';

//export function Productos() {

    const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json" ,
          "authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhby5ob3BwZXJAc3lzdGVycy54eXoiLCJpYXQiOjE2OTA5MTEyNDYsImV4cCI6MTY5MDkxNDg0Niwic3ViIjoiNCJ9.fzphPU_EiUY0L8shxVB2i9hMG3KH8WQThUc10_lfVdc"
      },// debe ser variable el bearer cada que se ha
        };
        fetch("http://localhost:8080/products", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            console.error(error.mensaje);
        });


    
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
const breakfast = productos.filter(producto => producto.carta === 'desayuno');

return (
    breakfast.map(producto => (
        <div key={producto.id} className='product'>
        <img className='imagen' src={producto.image} alt='Coffee'></img>
        <div className='container-description'>
        <p className='description'>
            {producto.name}<br />{producto.price}
        </p>
        <button className='add'>+</button>
        </div>
    </div>
    ))
);
}