import logo from "../../Imagenes/logo.png";
import usuario from "../../Imagenes/usuario.jpg";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Encabezado() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); //NUEVO traemos el rol del local

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
          {userRole === "waiter" && (
            <button className="boton" onClick={() => navigate("/Menu")}>
              HOME
            </button>
          )}
          ;
          {userRole === "waiter" && (
            <button className="boton" onClick={() => navigate("/Pedidos")}>
              PEDIDOS
            </button>
          )}
          ;
          {userRole === "admin" && (
            <button className="boton" onClick={() => navigate("/Administrador")}>
              EMPLEADOS
            </button>
          )}
            {userRole === "admin" && (
            <button className="boton" onClick={() => navigate("/Inventario")}>
              PRODUCTOS
            </button>
          )}
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
