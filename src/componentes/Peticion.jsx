import {useState} from "react";
export default function PeticionLogin(email, password) {

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
}

export function GetUsers() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" ,
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhby5ob3BwZXJAc3lzdGVycy54eXoiLCJpYXQiOjE2OTA1NTk1NDUsImV4cCI6MTY5MDU2MzE0NSwic3ViIjoiNCJ9.nYZ7sFKJ3UVOMBYZX9LNsm5lPCUj6LnwqMTwcgItkes"
    },

    };
    fetch("http://localhost:8080/users", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  
