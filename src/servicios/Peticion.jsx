import { getRequestOptions } from "./getRequestOptions";

export function GetUsers() {
  return fetch("http://localhost:8080/users", getRequestOptions("get"))
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}
