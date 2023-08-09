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
