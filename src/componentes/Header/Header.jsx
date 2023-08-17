import logo from "../../Imagenes/logo.png";
import fotoMesero from "../../Imagenes/usuario.jpg";
import fotoCocinero from "../../Imagenes/cocinero.png";
import fotoAdmin from "../../Imagenes/admin.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.css";

function Encabezado() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); //NUEVO traemos el rol del local

  function LogOut() {
    localStorage.clear();
    navigate("/");
  }

  const location = useLocation(); //es un hook que permite acceder a la información de la ubicación actual
  const currentPath = location.pathname; //esto da la parte de la URL que representa la ruta de la página actual

  function buttonActive(buttonPath) {
    //con esta función evaluamos que sean iguales
    return currentPath === buttonPath;
  }

  return (
    <div className="containerHeader">
      <div className="header">
        <div className="containerLogo">
          <img src={logo} className="logoPequeño" />
        </div>
        <div className="containerBotones">
          {userRole === "WAITER" && (
            <button
              className={`boton ${buttonActive("/Menu") ? "active" : ""}`}
              onClick={() => navigate("/Menu")}
            >
              HOME
            </button>
          )}
          ;
          {userRole === "WAITER" && (
            <button
              className={`boton ${buttonActive("/Pedidos") ? "active" : ""}`}
              onClick={() => navigate("/Pedidos")}
            >
              PEDIDOS
            </button>
          )}
          ;
          {userRole === "ADMIN" && (
            <button
              className={`boton ${
                buttonActive("/Administrador") ? "active" : ""
              }`}
              onClick={() => navigate("/Administrador")}
            >
              EMPLEADOS
            </button>
          )}
          {userRole === "ADMIN" && (
            <button
              className={`boton ${buttonActive("/Inventario") ? "active" : ""}`}
              onClick={() => navigate("/Inventario")}
            >
              PRODUCTOS
            </button>
          )}
          <button className="boton" onClick={() => LogOut()}>
            SALIR
          </button>
        </div>
        {userRole === "WAITER" && (
          <div className="foto">
            <img src={fotoMesero} className="usuario" />
          </div>
        )}

        {userRole === "CHEF" && (
          <div className="foto">
            <img src={fotoCocinero} className="usuario" />
          </div>
        )}

        {userRole === "ADMIN" && (
          <div className="foto">
            <img src={fotoAdmin} className="usuario" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Encabezado;
