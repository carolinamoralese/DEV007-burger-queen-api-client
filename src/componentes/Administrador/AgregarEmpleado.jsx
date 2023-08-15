import { useState } from "react";

function AgregarEmpleado (onSaveChanges){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")

  const handleSaveChanges = () => {

    onSaveChanges(newPassword, newRole); //SE LLAMA AL EJECUTAR EL MODAL
  };

  return (
    <h1>Holajaja</h1>
  // <div className="container-editor-empleados">
  //     <h1 className="title-editar">AGREGAR EMPLEADOS</h1>
  //     <input
  //       className="nueva-contraseña"
  //       placeholder="Ingresa nueva contraseña"
  //       value={email} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
  //       onChange={(e) => setNewPassword(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
  //     ></input>
  //     <select
  //       className="nuevo-rol"
  //       value={newRole} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
  //       onChange={(e) => setNewRole(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
  //     >
  //       <option disabled selected>
  //         ELIGA EL ROL
  //       </option>
  //       <option className="option">CHEF</option>
  //       <option className="option">WAITER</option>
  //       <option className="option">ADMIN</option>
  //     </select>
  //     <button className="btn-aceptar-cambios" onClick={handleSaveChanges}>
  //       REALIZAR CAMBIOS
  //     </button>
  //   </div>
  )
}


export default AgregarEmpleado;
