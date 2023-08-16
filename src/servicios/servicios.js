import { showAlertError, showAlertSucces, showAlertOrderConfirm} from "../alert/alerts";

export function getRequestOptions(method) {
    const bearerToken = localStorage.getItem("token");
    let requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer ",
      },
    };
    if (bearerToken) {
      requestOptions["headers"]["authorization"] = "Bearer " + bearerToken;
    }
    return requestOptions;
  }
  

  export const getProducts = () => {
    return fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .catch((error) => {
      console.error(error.mensaje);
      throw error.mensaje;
    });
}

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
  

export function addUser(body, options) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:8080/users", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, 106);
        if (responseJson) {
            showAlertSucces("Usuario agregado")
          if (options.onSuccess) options.onSuccess();
        }
      })
      .catch((error) => {
        console.error(error);
        showAlertError("Error al crear el usuaio");
      });
  }
  


export async function editUser(userId, newPassword, newRole, bearerToken, options) {
    const editUsersOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        id: userId,
        password: newPassword,
        role: newRole,
      }),
    };
  
    const response = await fetch(`http://localhost:8080/users/${userId}`, editUsersOptions);
    const responseJson = await response.json();
    if (responseJson) {
        showAlertSucces("Usuario editado")
        console.log("usuario editado exitosmente");
        if (options.onSuccess) options.onSuccess();
      }
    return responseJson;
  }

export function deleteUseRequest(userId, bearerToken, options) {
    const deleteUserOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
    };

    fetch(`http://localhost:8080/users/${userId}`, deleteUserOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("eliminación exitosa", responseJson);
        if (responseJson) {
            showAlertSucces("Usuario eliminado")
            console.log("usuario eliminado exitosmente");
            if (options.onSuccess) options.onSuccess();
          }
      })
      .catch((error) => {
        console.log("no sirve");
      });
  }

 export function peticionPostOrders(client, order) {
    const bearerToken = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        client: client,
        products: order.productos,
        status: "pending",
        dataEntry: new Date().toLocaleString(),
        cantidad: order.quantity,
        startTime: new Date(),
      }),
    };

    return new Promise((resolve, reject) => {
      showAlertOrderConfirm().then((orderConfirmed) => {
        if (orderConfirmed) {
          fetch("http://localhost:8080/orders", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              resolve(data); // Resuelve la promesa con los datos recibidos
            })
            .catch((error) => {
              reject(error); // Rechaza la promesa en caso de error
            });
        } else {
          reject(new Error("La orden no fue confirmada"));
        }
      });
    });
  }

export function peticionLogin(email, password, setUser) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
  
    return fetch("http://localhost:8080/login", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.user) {
          localStorage.setItem("token", responseJson.accessToken);
          localStorage.setItem("role", responseJson.user.role);
          setUser(true);
          return true; // Indica que el inicio de sesión fue exitoso
        } else {
          return false; // Indica que el inicio de sesión falló
        }
      })
      .catch((error) => {
        console.error(error);
        return false; // Indica que hubo un error en la petición
      });
  }