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


const handleAddProduct = (product)=>{
    setOrder((prevOrder) =>({ ...prevOrder, productos: [...prevOrder.productos, product] }))
}
//localStorage.setItem("order", JSON.stringify({ ...order, productos: [...order.productos, product] }))
const handleComandaMount = () => {
if(!order.productos.length){
    console.log(localStorage.getItem('order'))
    const localStorageOrder =  JSON.parse(localStorage.getItem("order"))
    if(localStorageOrder){
        setOrder(localStorageOrder)
    }
}

}
///cuando se utiliza un set es para cambiar valor a un estado, entonces cuadno el nuevo valor dependa del valor anterior la mejor forma de hacer es un calbcks
/// nuevo valor depende del anterior se debe pasar un calback, porque set es un llamda asycrona cuando el nuevo estado dep del atenrior 

/* PETICIÓN A LA API PARA MOSTRAR LOS OBJETOS EN LA INTERFAZ */
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


useEffect(() => {
    if(order.productos.length){
localStorage.setItem("order", JSON.stringify(order))
    }
},[order])

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
    <Menu productos={productos}  onAddProduct={handleAddProduct}/>
    <Comanda order={order} onMount={handleComandaMount} />
    </>
);
}

export default Home;


///levantar el estado, cuandos dos componente necesitan compartir la info y tiene un padre en comun para que el reparta los estados a sus hijos
/// no siempre se puede hacer, depende 
/// se comparte por medio de props, se crea en el padre y reparte
// modificar estado se hace por el SET... para pasarlo se debe hacer por callbacks a los hijos