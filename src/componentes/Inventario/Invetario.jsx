import React, { useState, useEffect } from "react";
import { getProducts } from "../../servicios/servicios.js";
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
const handleEditProducts = (productId, newPrice) => {
    EditProducts(productId, newPrice);
    setOpenModalId(null);
};

    //Ejecuta la peticion y le pasa los paramentros necesarios **ME QUEDE AQUI
const handleAddProducts = (productId, name, price, image, type) => {
    addProducts(productId, name, price, image, type);
    setOpenModalId(null);
};

    /*------------------------------------- PETICIÓN PARA EDITAR USERS --------------------------------------*/
    function EditProducts(productId, newPrice) {
    const EditProductOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
          body: JSON.stringify({
            id: productId,
            price: newPrice,
          }),
    };

    fetch(`http://localhost:8080/products/${productId}`, EditProductOptions)
    .then((response) => response.json())
    .then((responseJson) => {
        const updateProducts = products.map((product) =>
        product.id === productId
        ? { ...product, price: newPrice }
        : product
        );
        setProductos(updateProducts);
    })
    .catch((error) => {
        console.log("no se ejecuta")
    });
}


    /*------------------------------------- PETICIÓN PARA ELIMINAR USERS --------------------------------------*/
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

    /*------------------------------------- PETICIÓN PARA AGREGAR USERS --------------------------------------*/
function AddProduct(productId, name, price, image, type) {
    const AddProductsOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
        },
        body: JSON.stringify({
            id: productId,
            name: name,
            price: price,
            image: image,
            type: type,
        }),
    };

    fetch(`http://localhost:8080/products/${productId}`,AddProductsOptions)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('producto creado');
        })
    .catch((error) => {
        console.log('producto no creado');
    });
}



return (
    <>
      <div className="container-inventario">

        <Encabezado />
        <div className="container-title-productos">
          <h1 className="title">PRODUCTOS</h1>
        </div>
        <div className="container-allproducts">
            <div className="info-products">
                <div className="title-id">
                <p>ID</p>
                </div>
                <div className="title-product">
                <p>PRODUCTO</p>
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
                <p className="productId">{product.id}</p>
                <p className="productName">{product.name}</p>
                <p className="productPrice">{product.price}</p>
                <div className="button-option-product">
                <button className="button-edit-product"
                onClick={() => handleEditClick(product.id)}
                >EDITAR
                </button>
                <Modal 
                isOpen={openModalId === product.id}
                onClose={handleCloseModal}
                >
                <EditarProductos
                onSaveChanges={(newPrice) => {
                    handleEditProducts(product.id, newPrice);
                    handleCloseModal();
                }}
                />
                </Modal>
                <button className="button-delete-product" onClick={() => DeleteProduct(product.id)}>ELIMINAR</button>
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
