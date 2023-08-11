import "../Home/home.css";
import Encabezado from "../Header/Header";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import { getProducts } from "../../servicios/products";
import { useNavigate } from "react-router-dom";
import Comanda from "../Comanda/Comanda";

function Home() {
  const [productos, setProductos] = useState([]);
  const [order, setOrder] = useState({ productos: [] });
  const navigate = useNavigate();

  function resetOrder() {
    setOrder({ productos: [] });
  }

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
      //console.log(localStorage.getItem("order"));
      const localStorageOrder = JSON.parse(localStorage.getItem("order"));
      if (localStorageOrder) {
        setOrder(localStorageOrder);
      }
    }
  };

  const DeleteItem = (indexItem) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      productos: prevOrder.productos.filter((_, index) => index !== indexItem),
    }));
  };

  const plusProduct = (productId) => {
    const newOrderProducts = order.productos.map(function (product) {
      if (product.id === productId) {
        product.quantity += 1;
      }
      return product;
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
    getProducts().then((responseJson) => {
      setProductos(responseJson);
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
        onResetOrder={resetOrder}
      />
    </>
  );
}

export default Home;
