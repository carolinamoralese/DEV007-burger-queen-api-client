import "../estilos/desayunos.css";
import Encabezado from "./Header";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { getRequestOptions } from "../servicios/getRequestOptions";
import Comanda from "./Comanda";

function Home() {
const [productos, setProductos] = useState([]);
const [order, setOrder] = useState({ productos: [] });

const handleAddProduct = (product) => {
    setOrder((prevOrder) => ({
    ...prevOrder,
    productos: [...prevOrder.productos, product],
    }));
};

const handleComandaMount = () => {
    if (!order.productos.length) {
    console.log(localStorage.getItem("order"));
    const localStorageOrder = JSON.parse(localStorage.getItem("order"));
    if (localStorageOrder) {
        setOrder(localStorageOrder);
    }
    }
};

const DeleteItem = (indexItem) => {
    setOrder((prevOrder) => ({
    ...prevOrder,
    productos: prevOrder.productos.filter((product, index) => index !== indexItem)
}));
};

  /* PETICIÓN A LA API PARA MOSTRAR LOS OBJETOS EN LA INTERFAZ */
useEffect(() => {
    fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .then((responseJson) => {
        setProductos(responseJson);
    })
    .catch((error) => {
        console.error(error.mensaje);
    });
}, []);

useEffect(() => {
    if (order.productos.length) {
    localStorage.setItem("order", JSON.stringify(order));
    }
}, [order]);

return (
    <>
    <Encabezado />
    <Menu productos={productos} onAddProduct={handleAddProduct} />
    <Comanda order={order} onMount={handleComandaMount} onDeleteItem={DeleteItem} />
    </>
);
}

export default Home;
