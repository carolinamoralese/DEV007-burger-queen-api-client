import { useState } from "react";
import "./editarUsuarios.css";
import { showAlertError } from "../../alert/alerts";

/*---------------------------- COMPONENTE QUE MUESTRA EL FORM PARA ACTULIZAR DATOS DEL USER -----------------------*/

const EditarEmpleados = ({ onSaveChanges }) => {
  const [newPassword, setNewPassword] = useState(""); //SE DECLARA EL ESTADO PARA LA NUEVA CONTRASEÑA
  const [newRole, setNewRole] = useState(""); //SE DECLARA EL ESTADO PARA EL NUEVO ROL

  //ESTA FX VA A GUARDAR LOS NUEVOS DATOS
  const handleSaveChanges = () => {
    console.log(newRole, 90);
    if (!newRole || newRole == "ELIGA EL ROL") {
      showAlertError("Por favor selecione el rol");
      return;
    }
    if (!newPassword) {
      showAlertError("Por favor ingrese la contraseña");
      return;
    }
    onSaveChanges(newPassword, newRole); //SE LLAMA AL EJECUTAR EL MODAL
  };

  /*------------------------------------- RENDERIZADO DEL COMPONENTE --------------------------------------*/
  return (
    <div className="container-editor-empleados">
      <h1 className="title-editar">EDITAR EMPLEADOS</h1>
      <input
        className="nueva-contraseña"
        placeholder="Ingresa nueva contraseña"
        value={newPassword} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
        onChange={(e) => setNewPassword(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
      ></input>
      <select
        className="nuevo-rol"
        value={newRole} //MUY IMPORTANTE GUARDAR EL VALOR CON EL NOMBRE
        onChange={(e) => setNewRole(e.target.value)} //GUARDARÁ EL VALOR INGRESADO
      >
        <option className="option" disabled selected>
          ELIGA EL ROL
        </option>
        <option className="option">CHEF</option>
        <option className="option">WAITER</option>
        <option className="option">ADMIN</option>
      </select>
      <button className="btn-aceptar-cambios" onClick={handleSaveChanges}>
        REALIZAR CAMBIOS
      </button>
    </div>
  );
};

export default EditarEmpleados;
