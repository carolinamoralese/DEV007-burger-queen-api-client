import { useState } from "react";
import "./editarProductos.css";


/*---------------------------- COMPONENTE QUE MUESTRA EL FORM PARA ACTULIZAR DATOS DEL PRODUCTO -----------------------*/

const EditarProductos = ({ onSaveChanges }) => {
    const [newPrice, setNewPrice] = useState("");
    
    const handleSaveChanges = () => {
        onSaveChanges(newPrice);
    };

    return (
        <div className="container-editor-productos">
            <h1 className="title-editar">EDITAR PRODUCTOS</h1>
            <input 
            className="nuevo-precio"
            placeholder="Ingresa nuevo precio"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            ></input>
            <button className="btn-aceptar-cambios" onClick={handleSaveChanges}>
                REALIZAR CAMBIOS
            </button>
        </div>
    );
};

export default EditarProductos;