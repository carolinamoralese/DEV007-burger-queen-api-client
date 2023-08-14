import usuario from "../../Imagenes/usuario.jpg";
import logo from "../../Imagenes/logo.png";

function EncabezadoAdmin(){
    return(
        <div className="containerHeader">
        <div className="header">
          <div className="containerLogo">
            <img src={logo} className="logoPequeño" />
          </div>
          <div className="containerBotones">   
              <button className="boton">
                EMPLEADOS
              </button>
            ;
              <button className="boton">
                PRODUCTOS
              </button>
            ;
            <button className="boton">
              SALIR
            </button>
          </div>
          <div className="foto">
            <img src={usuario} className="usuario" />
          </div>
        </div>
      </div>
    )
}

export default EncabezadoAdmin;