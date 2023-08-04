import "../estilos/desayunos.css";
import Encabezado from "./Header";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { getRequestOptions } from "../servicios/getRequestOptions";
import Comanda from "./Comanda";

function Home() {
const [productos, setProductos] = useState([]);
const [order, setOrder] = useState({ productos: [] });
//const [selectProduct, setSelectProduct] = useState(null);

// function addProducts(product) {
//     setOrder({ ...order, productos: [...order.productos, product] });
//     console.log(selectProduct);
// }

{
    /* PETICIÓN A LA API PARA MOSTRAR LOS OBJETOS EN LA INTERFAZ */
}
useEffect(() => {
    fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .then((responseJson) => {
        //console.log(responseJson, 15);
        setProductos(responseJson);
    })
    .catch((error) => {
        console.error(error.mensaje);
    });
}, []);

return (
    <>

    {/* {productos.map((producto, index) => (
    //<button onClick={() => addProducts(productos)}>botonprueba</button>
    //{order.productos.map((producto, index) => (
        <div key={index}>
        <p>{producto.name}</p>
        <p>{producto.price}</p>
        {/*<p>{producto.cantidad}</p>*/}
        {/* <button onClick={() => setSelectProduct(producto)}>Seleccionar</button>
        </div>
    ))} */} 

    {/* {selectProduct && (
        <div>
            <p>{selectProduct.name}</p>
            <p>{selectProduct.price}</p>
            <button onClick={() => addProducts(selectProduct)}>Agregar</button>
        </div>
    )} */}

    <Encabezado />
    <Menu productos={productos} />
    <Comanda order={order} />
    </>
);
}

export default Home;
