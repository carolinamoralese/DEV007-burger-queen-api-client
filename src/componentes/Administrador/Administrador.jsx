import { useState, useEffect } from "react";
import { GetUsers } from "../../servicios/users.js";
import { useNavigate } from "react-router-dom";
import Encabezado from "../Header/Header";
import "../Administrador/empleados.css";
import Modal from "../modal/Modal.jsx";
import EditarEmpleados from "./EditarUsuarios";
import AgregarEmpleado from "./AgregarEmpleado.jsx";

function Administrador() {
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  // const [modal, setModal] = useState(false);
  const [addEmploye, setAddEmploye] = useState(false);

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

  /*-------------------------------------LÓGICA MODAL Y PETICIÓN PARA EDITAR USERS -----------------------*/

  const [openModalId, setOpenModalId] = useState(null); //maneja el modal con el id del user

  //abre el modal
  const handleEditClick = (userId) => {
    setOpenModalId(userId);
  };

  //cierra el modal
  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  //Ejecuta la petición y le pasa los parametros necesarios
  const handleEditUsers = (userId, newPassword, newRole) => {
    /* console.log("editado:", userId, newPassword, newRole); */
    EditUsers(userId, newPassword, newRole);
    setOpenModalId(null); // Cerrar el modal después de editar
  };

  const handleAddUsers = (email, password, role) => {
    addUser(email, password, role);
    setOpenModalId(null); // Cerrar el modal después de editar
  };

  //Petición para editar empleados
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
        /* console.log("edición exitosa", responseJson); */
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

  /*------------------------------------- PETICIÓN PARA ELIMINAR USERS --------------------------------------*/
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

  function addUser(email, password, role) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
      }),
    };
    fetch("http://localhost:8080/users", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, 106);
        if (responseJson) {
          console.log("usuario agregado exitosmente");
          setAddEmploye(false);
          GetUsers().then((users) => {
            setUsers(users);
          });
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
              <div className="button-option-employe">
                <button
                  className="button-edit-employe"
                  onClick={() => handleEditClick(user.id)} //abre el modal para editar
                >
                  EDITAR
                </button>
                <button
                  className="button-delete-employe"
                  onClick={() => DeleteUser(user.id)} //ejecuta la petición para eliminar
                >
                  ELIMINAR
                </button>
              </div>
              <Modal //Se renderiza el modal
                isOpen={openModalId === user.id} //verifica que sólo se abra el modal del user
                onClose={handleCloseModal} //para cerrarlo
              >
                <EditarEmpleados //Se pasa el compo como children para mostrarse dentro del modal
                  onSaveChanges={(newPassword, newRole) => {
                    handleEditUsers(user.id, newPassword, newRole);
                    handleCloseModal();
                  }}
                />
              </Modal>
            </div>
          ))}
        </div>
        <button className="add-employe" onClick={() => setAddEmploye(true)}>
          AGREGAR EMPLEADOS
        </button>
        <Modal isOpen={addEmploye} onClose={() => setAddEmploye(false)}>
          <AgregarEmpleado onSaveChanges={handleAddUsers} />
        </Modal>
      </div>
    </>
  );
}
export default Administrador;
