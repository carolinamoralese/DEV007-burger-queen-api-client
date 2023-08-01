import '../estilos/desayunos.css'
import Encabezado from './Header';
import Desayuno from './Desayuno';
import { useEffect } from 'react';
import { requestOptions } from './utils';

function Product() {
   
    useEffect(() => {
        fetch("http://localhost:8080/products", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson, 15);
        })
        .catch((error) => {
          console.error(error.mensaje);
        });
    }, [])
    return (
    <>
    <Encabezado  />
    <Desayuno />
    </>
    )
}

export default Product;

//crear un estado con usesstate y responseJson se asigna como valor al usstate y debe iniciar con un array vacio y despues cuadno se suleva obtiene a responsejSON
// primero a desayuno y despues a desayunos 