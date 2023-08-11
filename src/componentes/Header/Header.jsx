import logo from "../../Imagenes/logo.png";
import usuario from "../../Imagenes/usuario.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./header.css";

function Encabezado() {
  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="containerHeader">
      <div className="header">
        <div className="containerLogo">
          <img src={logo} className="logoPequeño" />
        </div>
        <div className="containerBotones">
          <button className="boton" onClick={() => navigate("/Menu")}>
            HOME
          </button>
          <button className="boton" onClick={() => navigate("/Pedidos")}>
            PEDIDOS
          </button>
          <button className="boton" onClick={() => LogOut()}>
            SALIR
          </button>
        </div>
        <div className="foto">
          <img src={usuario} className="usuario" />
        </div>
      </div>
    </div>
  );
}

export default Encabezado;
