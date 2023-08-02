import {useState} from "react";
/*export default function PeticionLogin(email, password) {

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
      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
}*/

import { getRequestOptions } from "../servicios/getRequestOptions";

export function GetUsers() {
  

  
  return fetch("http://localhost:8080/users", getRequestOptions("get"))
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson
    })
    .catch((error) => {
      console.error(error);
      return error
    });
}
  
  
