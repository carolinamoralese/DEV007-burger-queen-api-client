export function getRequestOptions(method) {
  const tokenMock = localStorage.getItem("token");
  let requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer ",
    },
  };
  if (tokenMock) {
    requestOptions["headers"]["authorization"] = "Bearer " + tokenMock;
  }
  return requestOptions;
}
