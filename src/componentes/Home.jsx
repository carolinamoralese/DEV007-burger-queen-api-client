import '../estilos/desayunos.css'
import Encabezado from './Header';
import Desayuno from './Desayuno';
import { useEffect, useState } from 'react';
import { getRequestOptions } from './utils';

function Home() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
    fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson, 15);
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
    </>
    )
}

export default Home;

//crear un estado con usesstate y responseJson se asigna como valor al usstate y debe iniciar con un array vacio y despues cuadno se suleva obtiene a responsejSON
// primero a desayuno y despues a desayunos 