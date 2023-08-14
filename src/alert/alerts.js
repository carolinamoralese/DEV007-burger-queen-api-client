import Swal from "sweetalert2";

export function showAlertError(text) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  }
  export function showAlertOrderConfirm() {
    return Swal.fire({
      title: "¿Estas seguro de crear esta orden?",
      showDenyButton: true,
      confirmButtonText: "Enviar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      let orderConfirmed = false
      if (result.isConfirmed) {
        Swal.fire("Orden guardada", "", "success");
        orderConfirmed = true
      } else if (result.isDenied) {
        Swal.fire("La orden no se guardò", "", "error");
      }
      return orderConfirmed
    });
  }