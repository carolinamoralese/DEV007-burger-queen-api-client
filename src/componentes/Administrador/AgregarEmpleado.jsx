import { useState } from "react";
import "./agregarEmpleados.css";

const AgregarEmpleado = ({ onSaveChanges }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSaveChanges = () => {
    onSaveChanges(email, password, role); //SE LLAMA AL EJECUTAR EL MODAL
  };

  return (
    <div className="container-agregar-empleados">
      <h1 className="title-editar">AGREGAR EMPLEADOS</h1>
      <input
        className="correo-user"
        placeholder="Ingrese el correo"
        value={email} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
        onChange={(e) => setEmail(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
      ></input>
      <input
        className="nueva-contraseña"
        placeholder="Ingrese la contraseña"
        value={password} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
        onChange={(e) => setPassword(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
      ></input>
      <select
        className="nuevo-rol"
        value={role} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
        onChange={(e) => setRole(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
      >
        <option className="option" disabled selected>
          ELIGA EL ROL
        </option>
        <option className="option">CHEF</option>
        <option className="option">WAITER</option>
        <option className="option">ADMIN</option>
      </select>
      <button className="btn-aceptar-cambios2" onClick={handleSaveChanges}>
        AGREGAR EMPLEADO
      </button>
    </div>
  );
};

export default AgregarEmpleado;
