import { useState } from "react";
import "./editarUsuarios.css";

const EditarEmpleados = ({ onSaveChanges }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleSaveChanges = () => {
    console.log("New password:", newPassword, 999);
    console.log("New role:", newRole, 1000);
    onSaveChanges(newPassword, newRole);
  };

  return (
    <div className="container-editor-empleados">
      <h1 className="title-editar">EDITAR EMPLEADOS</h1>
      <input
        className="nueva-contraseña"
        placeholder="Ingresa nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      ></input>
      <select
        className="nuevo-rol"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
      >
        <option disabled selected>
          ELIGA EL ROL
        </option>

        <option className="option">CHEF</option>
        <option className="option">WAITER</option>
        <option className="option">ADMIN</option>
      </select>
      <button className="btn-aceptar-cambios" onClick={handleSaveChanges}>
        REALIZAR CAMBIOS
      </button>
      <button className="btn-volver">VOLVER</button>
    </div>
  );
};

export default EditarEmpleados;
