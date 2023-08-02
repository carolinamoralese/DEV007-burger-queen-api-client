import '../estilos/desayunos.css'
import Encabezado from './Header';
import Desayuno from './Desayuno';
import { useEffect, useState } from 'react';
import { getRequestOptions } from '../servicios/getRequestOptions';
import GetOrder from './Comanda';

function Home() {
    const [productos, setProductos] = useState([])

    {/* PETICIÓN A LA API PARA MOSTRAR LOS OBJETOS EN LA INTERFAZ */}
    useEffect(() => {
    fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .then((responseJson) => {
        //console.log(responseJson, 15);
        setProductos(responseJson)
    })
    .catch((error) => {
        console.error(error.mensaje);
    });
    }, [])

    return (
    <>
    <Encabezado  />
    <Desayuno productos={productos} />
    <GetOrder />
    </>
    )
}

export default Home;
