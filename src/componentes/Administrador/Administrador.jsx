import { useState, useEffect } from "react";
import { GetUsers, editUser, deleteUseRequest } from "../../servicios/servicios.js";
import { useNavigate } from "react-router-dom";
import Encabezado from "../Header/Header";
import "../Administrador/empleados.css";
import Modal from "../modal/Modal.jsx";
import EditarEmpleados from "./EditarUsuarios";
import AgregarEmpleado from "./AgregarEmpleado.jsx";
import { showAlertError } from "../../alert/alerts";
import { addUser } from "../../servicios/servicios.js";

function Administrador() {
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
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
    editUsers(userId, newPassword, newRole);
    setOpenModalId(null); // Cerrar el modal después de editar

  };

  const handleAddUsers = (email, password, role) => {
    if (!email) {
      showAlertError("ingresa el correo");
      return;
    }
    if (!password) {
      showAlertError("ingresa una contraseña");
      return;
    }
    if (!role || role == "ELIGA EL ROL") {
      showAlertError("ingresa el rol");
      return;
    }
    const body = { email, password, role };
    const options = {
      onSuccess: () => {
        setAddEmploye(false);
        GetUsers().then((users) => {
          setUsers(users);
        });
      },
    };
    addUser(body, options);
    setOpenModalId(null); // Cerrar el modal después de editar
  };


  /*------------------------------------- FUNCION PARA EDITAR USERS --------------------------------------*/
  function editUsers(userId, newPassword, newRole) {
    const options = {
      onSuccess: () => {
        setAddEmploye(false);
        GetUsers().then((users) => {
          setUsers(users);
        });
      },
    };
    editUser(userId, newPassword, newRole, bearerToken, options)
  }

  /*------------------------------------- PETICIÓN PARA ELIMINAR USERS --------------------------------------*/
  function deleteUser(userId) {
    const options = {
      onSuccess: () => {
        setAddEmploye(false);
        GetUsers().then((users) => {
          setUsers(users);
        });
      },
    };
  deleteUseRequest(userId,bearerToken, options);

  }
  /*------------------------------------- PETICIÓN PARA AGREGAR USERS --------------------------------------*/

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
                  onClick={() => deleteUser(user.id)} //ejecuta la petición para eliminar
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
