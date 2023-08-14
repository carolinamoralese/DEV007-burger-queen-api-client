import React, { useState, useEffect } from "react";
import { GetUsers } from "../../servicios/users.js";
import { useNavigate } from "react-router-dom";
import EncabezadoAdmin from "./EncabezadoAdmin.jsx";
import "../Administrador/empleados.css";

function Administrador() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
  return (
    <>
      <EncabezadoAdmin />;
      <div className="container-employed">
        <div>
          <h1 className="title-employe">EMPLEADOS</h1>
        </div>
        <div className="info-employe">
          <div className="title-name">
          <p >NOMBRE</p>
          </div>
          <div  className="title-role">
          <p>PUESTO</p>
          </div>
          <div  className="title-option">
          <p>OPCIONES</p>
          </div>
          
        </div>
        {users.map((user, index) => (
          <div className="container-users" key={index}>
            <p className="employeName">{user.email}</p>
            <p className="role">{user.role}</p>
            <div className="button-option-employe">
            <button className="button-edit-employe">EDITAR</button>
            <button className="button-delete-employe">ELIMINAR</button>
            </div>
          </div>
        ))}
       
      </div>
      <button className="add-employe">AGREGAR EMPLEADOS</button>
    </>
  );
}
export default Administrador;
