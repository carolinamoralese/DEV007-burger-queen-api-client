import { useEffect, useState } from "react";
import logo from "../../Imagenes/logo.png";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { showAlertError, showAlertSucces} from "../../alert/alerts";
import { peticionLogin } from "../../servicios/servicios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userRole = localStorage.getItem("role"); //llamamos al rol guardado en el local

  useEffect(() => {
    if (user) {
      navigate("/Menu");
    }
  }, [user]);

  //   useEffect(() => {
  //   //NUEVO
  //   if (userRole == "waiter") {
  //     navigate("/menu"); // Cambia la ruta a "/menu" si es mesero
  //   } else if (userRole == "chef") {
  //     navigate("/Cocinero"); // Cambia la ruta a "/cocinero" si es chef
  //   } else if (userRole == "admin") {
  //     navigate("/Administrador"); // Cambia la ruta a "/menu" si es mesero
  //   }
  // }, [userRole, navigate]); 



  function handleLoginClick() {
    if (!email) {
      showAlertError("Por favor ingrese su correo");
      return;
    }
    if (!password) {
      showAlertError("Por favor ingrese su contraseña");
      return;
    }
  
    peticionLogin(email, password, setUser)
      .then((loginSuccessful) => {
        if (loginSuccessful) {
          showAlertSucces("Usuario logueado");
        } else {
          showAlertError("Autenticación fallida, verifica tus datos de acceso!");
        }
      });
  }

  return (
    <div className="container-login">
      <div className="container-form">
        <div className="container-eslogan">
          <h1 className="eslogan">
            Comida todo el día, <br></br>
          </h1>
          <h1 className="eslogan"> todos los días</h1>
        </div>
        <br></br>
        <input
          className="ingresar-correo"
          type="email"
          id="email"
          value={email}
          placeholder="INGRESA CORREO"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          className="ingresar-contraseña"
          type="password"
          id="password"
          value={password}
          placeholder="INGRESA CONTRASEÑA"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br></br>
        <button className="btn-ingresar" onClick={() => handleLoginClick()}>
          INGRESAR
        </button>
      </div>
      <div className="container-logo">
        <img src={logo} className="logo" />
      </div>
    </div>
  );
}

export default Login;
