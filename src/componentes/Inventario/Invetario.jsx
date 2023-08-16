import React, { useState, useEffect } from "react";
import { getProducts } from "../../servicios/products";
import { useNavigate } from "react-router-dom";
import Encabezado from "../Header/Header.jsx";
import "../Inventario/inventarios.css";
import Modal from "../modal/Modal.jsx";
import EditarProductos from "./EditarProductos";

function Inventario() {
  const [products, setProductos] = useState([]);
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem("token");

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

/*-------------------------------------LÓGICA MODAL Y PETICIÓN PARA EDITAR USERS -----------------------*/

const [openModalId, setOpenModalId] = useState(null);

    //abre el modal
const handleEditClick = (productId) => {
    setOpenModalId(productId);
};

    //cierra el modal
const handleCloseModal = () => {
    setOpenModalId(null);
};

    //Ejecuta la petición y le pasa los parametros necesarios
const handleEditProducts = (productId, newPrice, newQuantity) => {
    EditProducts(productId, newPrice, newQuantity);
    setOpenModalId(null);
};

    //Peticion para editar produtos
    function EditProducts(productId, newPrice, newQuantity) {
    const EditProductOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
          body: JSON.stringify({
            id: productId,
            password: newPrice,
            role: newQuantity,
          }),
    };

    fetch(`http://localhost:8080/users/${productIdId}`, EditProductOptions)
    .then((response) => response.json())
    .then((responseJson) => {
        const updateProducts = products.map((product) =>
        product.id === productId
        ? { ...product, price: newPrice, quantity: newQuantity }
        : product
        );
        setProductos(updateProducts);
    })
    .catch((error) => {
        console.log("no se ejecuta")
    });
}






//Peticion para eliminar producto
function DeleteProduct(productId) {
    const deleteProductoptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + bearerToken,
        },
    };

    fetch(`http://localhost:8080/products/${productId}`, deleteProductoptions)
    .then((response) => response.json())
    .then((responseJson) =>{
        console.log("eliminar funciona", responseJson);

        const updateProducts = products.filter((product) => product.id !== productId);
        setProductos(updateProducts);
    })
    .catch((error) => {
        console.log("no se ejecuto");
    });
}

//Peticion para agregar producto


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
                <p>{product.id}</p>
                <div className="button-option-product" onClick={() => DeleteProduct(product.id)}>
                <button className="button-edit-product"
                onClick={() => handleEditClick(product.id)}
                >EDITAR
                </button>
                <Modal 
                isOpen={openModalId === product.id}
                onClose={handleCloseModal}
                >
                <EditarProductos
                onSaveChanges={(newPrice, newQuantity) => {
                    handleEditProducts(product.id, newPrice, newQuantity);
                    handleCloseModal();
                }}
                />
                </Modal>
                <button className="button-delete-product">ELIMINAR</button>
                </div>
                {/* <Modal 
                isOpen={openModalId === product.id}
                onClose={handleCloseModal}
                >
                <EditarProductos
                onSaveChanges={(newPrice, newQuantity) => {
                    handleEditProducts(product.id, newPrice, newQuantity);
                    handleCloseModal();
                }}
                />
                </Modal> */}
            </div>
        ))}
        </div>
        <button className="add-product">AGREGAR PRODUCTO</button>
    </div>
    </>
  );
}

export default Inventario;
