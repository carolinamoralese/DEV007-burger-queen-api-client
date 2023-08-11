import { useEffect, useState } from "react";
import logo from "../Imagenes/logo.png";
//import { GetUsers } from "./Peticion";
import { useNavigate } from "react-router-dom";
import "../estilos/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userRole = localStorage.getItem("role"); //llamamos al rol guardado en el local

  /* useEffect(() => {
    if (user) {
      navigate("/Menu");
    }
  }, [user]); */

  useEffect(() => {
    //NUEVO
    if (userRole === "waiter") {
      navigate("/menu"); // Cambia la ruta a "/menu" si es mesero
    } else if (userRole === "admin") {
      navigate("/Cocinero"); // Cambia la ruta a "/cocinero" si es admin
    }
  }, [userRole, navigate]);

  function handleLoginClick() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("http://localhost:8080/login", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.user) {
          localStorage.setItem("token", responseJson.accessToken);
          localStorage.setItem("role", responseJson.user.role); //CAMBIOS
          setUser(true);
        } else {
          console.log("Autenticacion fallida");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container-login">
      <div className="container-form">
        <h1 className="titulo">
          Comida todo el día, <br></br>todos los días
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <input
            className="ingresar"
            type="email"
            id="email"
            value={email}
            placeholder="INGRESA CORREO"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <br></br>
          <br></br>
          <br></br>
          <input
            className="ingresar"
            type="password"
            id="password"
            value={password}
            placeholder="INGRESA CONTRASEÑA"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <br></br>
          <br></br>
          <br></br>

          <button className="ingresarDatos" onClick={() => handleLoginClick()}>
            INGRESAR
          </button>
        </div>
      </div>
      <div className="container-logo">
        <img src={logo} className="logo" />
      </div>
    </div>
  );
}

export default Login;
