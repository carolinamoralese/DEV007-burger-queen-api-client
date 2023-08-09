import { getRequestOptions } from "./getRequestOptions";

export const getProducts = () => {
    return fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .catch((error) => {
      console.error(error.mensaje);
      throw error.mensaje;
    });
}