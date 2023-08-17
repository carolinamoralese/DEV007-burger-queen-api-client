import React, { useState, useEffect } from "react";
import { getProducts } from "../../servicios/servicios.js";
import { useNavigate } from "react-router-dom";
import Encabezado from "../Header/Header.jsx";
import "../Inventario/inventarios.css";
import Modal from "../modal/Modal.jsx";
import EditarProductos from "./EditarProductos";
import AgregarProducto from "./AgregarProducto.jsx";

function Inventario() {
  const [products, setProductos] = useState([]);
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem("token");
  const [AddProduct, setAddProduct] = useState(false);

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
const handleAddProducts = (name, price, image, type) => {
    AddProducts(name, price, image, type);
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
function AddProducts(name, price, image, type) {
    const AddProductsOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
        },
        body: JSON.stringify({
            name: name,
            price: price,
            image: image,
            type: type,
        }),
    };
   
    if (!type) {
        return;
      }

    fetch(`http://localhost:8080/products/`,AddProductsOptions)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('producto creado', responseJson);
        setProductos((prevProducts) => [...prevProducts, responseJson]);
    })
    .catch((error) => {
        console.log('producto no creado', error);
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
        <button className="add-product" onClick={() => setAddProduct(true)}>AGREGAR PRODUCTO</button>
        <Modal isOpen={AddProduct} onClose={() => setAddProduct(false)}>
          <AgregarProducto onSaveChanges= {handleAddProducts} />
        </Modal>
      </div>
    </>
  );
}

export default Inventario;
