import { useState } from "react";

const AgregarProducto = ({ onSaveChanges }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("");

    const handleSaveChanges = () => {
        onSaveChanges(name, price, image, type);
    };

    return (
        <div className="container-agregar-productos">
            <h1 className="tittle-editar">AGREGAR PRODUCTO</h1>
            <input 
            className="name-producto"
            placeholder="Ingrese el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></input>
            <input 
            className="price-producto"
            placeholder="Ingrese el precio"
            value={price}
            onChange={(e) => setPrice(e.target.price)}
            ></input>
            <input 
            className="image-producto"
            placeholder="Ingrese la url de la imagen"
            value={image}
            onChange={(e) => setImage(e.target.image)}
            ></input>
            <select
            className="type-producto"
            value={type}
            onChange={(e) => setType(e.target.type)}
            >
                <option className="opcion" disabled selected>
                    ELIGE EL TIPO DE COMIDA
                </option>
                <option className="opcion">Desayuno</option>
                <option className="opcion">Almuerzo</option>
            </select>
            <button className="btn-aceptar-cambios3" onClick={handleSaveChanges}>
                AGREGAR PRODUCTO
            </button>
        </div>
    );
};

export default AgregarProducto;