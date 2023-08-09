import "../estilos/desayunos.css";
import Encabezado from "./Header";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { getRequestOptions } from "../servicios/getRequestOptions";
import { useNavigate } from "react-router-dom";
import Comanda from "./Comanda";

function Home() {
  const [productos, setProductos] = useState([]);
  const [order, setOrder] = useState({ productos: [] });
  const navigate = useNavigate();

  const handleAddProduct = (product) => {
    if (!order.productos.includes(product)) {
      product["quantity"] = 1;
      setOrder((prevOrder) => ({
        ...prevOrder,
        productos: [...prevOrder.productos, product],
      }));
    } else {
      plusProduct(product.id);
    }
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
      productos: prevOrder.productos.filter(
        (product, index) => index !== indexItem
      ),
    }));
  };

  const plusProduct = (productId) => {
    const newOrderProducts = order.productos.map(function (product) {
      if (product.id === productId) {
        product.quantity += 1;
        return product;
      } else {
        return product;
      }
    });
    setOrder({ productos: newOrderProducts });
    console.log(newOrderProducts);
  };

  const lessProduct = (productId) => {
    const newOrderProducts = order.productos.map(function (product) {
      if (product.id === productId) {
        if (product.quantity > 0) {
          product.quantity -= 1;
        }
        return product;
      } else {
        return product;
      }
    });
    // Eliminar productos con cantidad 0
    const filteredProducts = newOrderProducts.filter(
      (product) => product.quantity > 0
    );
    setOrder({ productos: filteredProducts });
  };

  /* PETICIÓN A LA API PARA MOSTRAR LOS OBJETOS EN LA INTERFAZ */
  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      navigate("/");
      return;
    }

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
      <Comanda
        order={order}
        onMount={handleComandaMount}
        onDeleteItem={DeleteItem}
        onAddProduct={handleAddProduct}
        onLessProduct={lessProduct}
      />
    </>
  );
}

export default Home;
