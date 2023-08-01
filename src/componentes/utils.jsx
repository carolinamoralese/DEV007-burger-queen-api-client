import data from '../data.js';

export function Productos() {
const productos = data.productos;

return (
    productos.map((producto) => (
    <div key={producto.id} className='product'>
    <img className='imagen' src={producto.imagen} alt='Coffee'></img>
    <div className='container-description'>
        <p className='description'>
        {producto.producto}<br />{producto.precio}
        </p>
        <button className='add'>+</button>
    </div>
    </div>
    ))
);
}

export function Desayunos() {
const breakfast = data.productos.filter(producto => producto.carta === 'desayuno');

return (
    breakfast.map(producto => (
        <div key={producto.id} className='product'>
        <img className='imagen' src={producto.imagen} alt='Coffee'></img>
        <div className='container-description'>
        <p className='description'>
            {producto.producto}<br />{producto.precio}
        </p>
        <button className='add'>+</button>
        </div>
    </div>
    ))
);
}