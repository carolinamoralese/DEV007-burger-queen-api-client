import { useState, useEffect } from "react";
import { GetUsers } from "../../servicios/users.js";
import { useNavigate } from "react-router-dom";
import EncabezadoAdmin from "./EncabezadoAdmin.jsx";
import "../Administrador/empleados.css";
//import Swal from "sweetalert2";
import Modal from "../modal/Modal.jsx";

function Administrador() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem("token");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      navigate("/");
      return;
    }
    GetUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  //PopUp para editar empleados
  /* function PopupEditEmployed() {
    const { value: formValues } = Swal.fire({
      title: "EDITAR EMPLEADO",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Ingresa la nueva contraseña">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Ingresa el nuevo rol">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const idUser = users.find((user) => user.id === userId);
      const [newPassword, newRole] = formValues;
      const userId = idUser;

      EditUsers(userId, newPassword, newRole);
    }
  } */

  //Fx para editar empleados
  function EditUsers(userId, newPassword, newRole) {
    const editUsersOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        email: "chef.hopper@systers.xyz",
        password: newPassword,
        role: newRole,
      }),
    };

    fetch(`http://localhost:8080/orders/${userId}`, editUsersOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("edición exitosa", responseJson);
        // Actualizar el estado de las órdenes
        const updatedUsers = users.map((user) =>
          user.id === userId
            ? { ...user, password: newPassword, role: newRole }
            : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log("no sirve");
      });
  }

  return (
    <>
      <div className="container-administrador">
        <EncabezadoAdmin />;
        <div className="container-title-employe">
          <h1 className="title">EMPLEADOS</h1>
        </div>
        <div className="container-employed">
          <div className="info-employe">
            <div className="title-name">
              <p>NOMBRE</p>
            </div>
            <div className="title-role">
              <p>PUESTO</p>
            </div>
            <div className="title-option">
              <p>OPCIONES</p>
            </div>
          </div>
          {users.map((user, index) => (
            <div className="container-users" key={index}>
              <p className="employeName">{user.email}</p>
              <p className="role">{user.role}</p>
              <div className="button-option-employe">
                <button
                  className="button-edit-employe"
                  /* onClick={() => EditUsers(user.id, "123456", "chef")} */
                  /* onClick={EditUsers} */
                  onClick={() => setModal(true)}
                >
                  EDITAR
                </button>
                <button className="button-delete-employe">ELIMINAR</button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-employe">AGREGAR EMPLEADOS</button>
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <h2>Probando</h2>
        </Modal>
      </div>
    </>
  );
}
export default Administrador;
