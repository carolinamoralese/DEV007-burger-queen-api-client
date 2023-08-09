import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PeticionGetOrders() {
  const [orders, setOrders] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      navigate("/");
      return;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + bearerToken,
      },
    };

    fetch("http://localhost:8080/orders", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('respuesta exitosa',responseJson)
        setOrders(responseJson);
      })
      .catch((error) => {
        console.error("error en la peticion", error);
      });
  },[]);
}

export default PeticionGetOrders;
