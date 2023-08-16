import "./modal.css";

/*---------------------------- SE CREA LA ESTRUCTURA BÁSICA DEL MODAL PARA PODER REUTILIZARSE -----------------------*/
const Modal = ({ isOpen, onClose, children }) => {

  return (
    <div
      className="modal-container"
      style={{ display: isOpen ? "grid" : "none" }}
    >
      <div className="modal-body">
        <button className="modal-close" onClick={onClose}>
          {" "}
          {/* Boton en x pa cerrar el modal */}X
        </button>
        {children} {/* El children permite renderizar cualquier contenido */}
      </div>
    </div>
  );
};

export default Modal;



