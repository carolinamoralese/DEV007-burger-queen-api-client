import { useState, useEffect } from "react";
import { GetUsers } from "../../servicios/users.js";
import { useNavigate } from "react-router-dom";
import Encabezado from "../Header/Header";
import "../Administrador/empleados.css";
import Modal from "../modal/Modal.jsx";
import EditarEmpleados from "./EditarUsuarios";

function Administrador() {
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")

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

  //Fx para editar empleados
  function EditUsers(userId, newPassword, newRole) {
    const editUsersOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        id: userId,
        password: newPassword,
        role: newRole,
      }),
    };

    fetch(`http://localhost:8080/users/${userId}`, editUsersOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("edición exitosa", responseJson);

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

  const handleEditUsers = (userId, newPassword, newRole) => {
    console.log("EditUsers called with:", userId, newPassword, newRole);
    EditUsers(userId, newPassword, newRole);
    setModal(false); // Cerrar el modal después de editar
  };

  //Petición para eliminar usuario
  function DeleteUser(userId) {
    const deleteUserOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
    };

    fetch(`http://localhost:8080/users/${userId}`, deleteUserOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("eliminación exitosa", responseJson);

        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log("no sirve");
      });
  }

  function addUser(){
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role
      })
    };
    fetch("http://localhost:8080/users", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson,106);
        if(responseJson){
          console.log("usuario agregado exitosmente")
        }
      })
      .catch((error) => {
        console.error(error);
      });
     
  }

  return (
    <>
      <div className="container-administrador">
        <Encabezado />;
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

              <p>{user.id}</p>
              <div className="button-option-employe">
                <button
                  className="button-edit-employe"
                  /* onClick={() => EditUsers(user.id, "123456", "chef")} */
                  /* onClick={EditUsers} */
                  onClick={() => setModal(true)}
                >
                  EDITAR
                </button>
                <button
                  className="button-delete-employe"
                  onClick={() => DeleteUser(user.id)}
                >
                  
                  ELIMINAR
                </button>
              </div>
              <Modal isOpen={modal} onClose={() => setModal(false)}>
                <EditarEmpleados
                  onSaveChanges={(userId, newPassword, newRole) =>
                    handleEditUsers(user.id, newPassword, newRole)
                  }
                />
              </Modal>
            </div>
          ))}
        </div>
        <button className="add-employe"  onClick={() => addUser()}>AGREGAR EMPLEADOS</button>
      </div>
    </>
  );
}
export default Administrador;

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
