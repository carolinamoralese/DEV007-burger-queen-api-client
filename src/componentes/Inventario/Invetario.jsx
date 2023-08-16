import React, { useState, useEffect } from "react";
import { getProducts } from "../../servicios/servicios.js";
import { useNavigate } from "react-router-dom";
import Encabezado from "../Header/Header.jsx";
import "../Inventario/inventarios.css";

function Inventario() {
  const [products, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      navigate("/");
      return;
    }
    getProducts().then((products) => {
      setProductos(products);
      console.log(products, 20);
    });
  }, []);

  return (
    <>
      <div className="container-inventario">
        <Encabezado />
        <div className="container-title-productos">
          <h1 className="title">PRODUCTOS</h1>
        </div>
        <div className="container-allproducts">
          <div className="info-products">
            <div className="title-product">
              <p>PRODUCTO</p>
            </div>
            <div className="title-qty">
              <p>CANTIDAD</p>
            </div>
            <div className="title-price">
              <p>PRECIO</p>
            </div>
            <div className="title-options">
              <p>OPCIONES</p>
            </div>
          </div>
          {products.map((product, index) => (
            <div className="container-listproducts" key={index}>
              <p className="productName">{product.name}</p>
              <p className="productQty">{product.quantity}</p>
              <p className="productPrice">{product.price}</p>
              <div className="button-option-product">
                <button className="button-edit-product">EDITAR</button>
                <button className="button-delete-product">ELIMINAR</button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-product">AGREGAR PRODUCTO</button>
      </div>
    </>
  );
}

export default Inventario;
