import {
  showAlertError,
  showAlertSucces,
  showAlertOrderConfirm,
} from "../alert/alerts";

 ///----------------------------------------------------REQUEST OPTION PETICIONES-----------------------------------------////
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
///----------------------------------------------------PETICION PARA OBTENER PRODUCTOS------------------------------------------////
export const getProducts = () => {
  return fetch("http://localhost:8080/products", getRequestOptions("GET"))
    .then((response) => response.json())
    .catch((error) => {
      console.error(error.mensaje);
      throw error.mensaje;
    });
};

///----------------------------------------------------PETICION PARA OBTENER USUARIOS------------------------------------------////
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

///----------------------------------------------------PETICION PARA AGREGAR USUARIOS------------------------------------------////
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
        showAlertSucces("Usuario agregado");
        if (options.onSuccess) options.onSuccess();
      }
    })
    .catch((error) => {
      console.error(error);
      showAlertError("Error al crear el usuaio");
    });
}

///----------------------------------------------------PETICION PARA EDITAR USUARIOS------------------------------------------////
export async function editUser(
  userId,
  newPassword,
  newRole,
  bearerToken,
  options
) {
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

  const response = await fetch(
    `http://localhost:8080/users/${userId}`,
    editUsersOptions
  );
  const responseJson = await response.json();
  if (responseJson) {
    showAlertSucces("Usuario editado");
    console.log("usuario editado exitosmente");
    if (options.onSuccess) options.onSuccess();
  }
  return responseJson;
}

///----------------------------------------------------PETICION PARA ELIMINAR USUARIOS------------------------------------------////
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
        showAlertSucces("Usuario eliminado");
        console.log("usuario eliminado exitosmente");
        if (options.onSuccess) options.onSuccess();
      }
    })
    .catch((error) => {
      console.log("no sirve");
    });
}

///----------------------------------------------------PETICION PARA CREAR ORDENES------------------------------------------////
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

///----------------------------------------------------PETICION PARA LOGUEARSE------------------------------------------////
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

///----------------------------------------------------PETICION PARA ACTUALIZAR PEDIDO------------------------------------------////
export function peticionUpdateOrder(orderId, newStatus, bearerToken, options) {
  const updateOrderOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },
    body: JSON.stringify({
      id: orderId,
      status: newStatus,
    }),
  };

  fetch(`http://localhost:8080/orders/${orderId}`, updateOrderOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        if (options.onSuccess) options.onSuccess();
      }
    })
    .catch((error) => {
      if (options.onError) options.onError();
    });
}

///----------------------------------------------------PETICION PARA OBTENER PEDIDOS------------------------------------------////
export function peticionGetOrders(bearerToken) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + bearerToken,
    },
  };
  return fetch("http://localhost:8080/orders", requestOptions)
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
///----------------------------------------------------PETICION PARA ELIMINAR PEDIDO-----------------------------------------////
export function peticionDeleteOrder(orderId, bearerToken, options) {
  const deleteOrderOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },
  };

  fetch(`http://localhost:8080/orders/${orderId}`, deleteOrderOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        if (options.onSuccess) options.onSuccess();
      }
    })
    .catch((error) => {
      if (options.onError) options.onError();
    });
}

///----------------------------------------------------PETICION PARA EDITAR PRODUCTOS-----------------------------------------////
export function editProduct(
  productId,
  newPrice, 
  bearerToken, 
  options
) {
  const EditProductOptions = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        id: productId,
        price: newPrice,
      }),
};

fetch(`http://localhost:8080/products/${productId}`, EditProductOptions)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson) {
          if(options.onSuccess) options.onSuccess()
        }
    })
    .catch((error) => {
        if(options.onError) options.onError()
    });
}

///----------------------------------------------------PETICION PARA ELIMINAR PRODUCTOS-----------------------------------------////
export function deleteProductRequest (productId, bearerToken, options) {
  const deleteProductOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },
  };

  fetch(`http://localhost:8080/products/${productId}`, deleteProductOptions)
  .then((response) => response.json())
  .then((responseJson) =>{
      console.log("eliminar funciona", responseJson);
      if(responseJson) {
        if(options.onSuccess) options.onSuccess();
      }
  })
  .catch((error) => {
    console.log("no se ejecuto");
  });
}

///----------------------------------------------------PETICION PARA AGREGAR PRODUCTOS-----------------------------------------////
export function AddProducts(body, options, bearerToken) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
  },
  body: JSON.stringify(body),
  };

  fetch(`http://localhost:8080/products/`, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson) {
        if(options.onSuccess) options.onSuccess();
      }
    })
    .catch((error) => {
      console.log('producto no creado', error);
  });
}