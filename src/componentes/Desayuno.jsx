import '../estilos/desayunos.css';
import data from '../data.js';

function Prueba() {
  const productos = data.productos;
  const productosJSX = productos.map((producto) => (
    <div key={producto.id} className='product'>
      <img className='imagen' src={producto.imagen} alt='Coffee'></img>
      <div className='container-description'>
        <p className='description'>
          {producto.producto}<br />{producto.precio}
        </p>
        <button className='add'>+</button>
      </div>
    </div>
  ));

  return <div>{productosJSX}</div>;
}



function Desayuno() {
  return (
    <div className='container-home'>
      <div className='titulo-desayunos'>
        <h1 className='title'>DESAYUNOS</h1>
      </div>

      <div className='container-buttons'>
        <button className='break-fast'>DESAYUNOS</button>
        <button className='dinner'>COMIDAS</button>
      </div>

      <div className='container-menu' id='carta'>
      <Prueba/>

        {/*<div className='product'>
            <img className='imagen' src={cafe}></img>
            <div className='container-description'>
            <p className='description'>Cafe Americano<br />$5.00</p>
            <button className='add'>+</button>
            </div>
        </div>
        
        <div className='product'>
            <img src=''></img>
            <p></p>
            <button></button>
        </div>

        <div className='product'>
            <img src=''></img>
            <p></p>
            <button></button>
        </div>

        <div className='product'>
            <img src=''></img>
            <p></p>
            <button></button>
  </div>*/}
      </div>

    </div>
  );
}

export default Desayuno;
