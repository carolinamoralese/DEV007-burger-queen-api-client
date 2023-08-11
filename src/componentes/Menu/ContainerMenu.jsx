import "./Menu/menu.css";
import { Comidas } from "./utils";

function ContainerMenu(props) {
  return (
    <div className="container-home">
      <div className="titulo-desayunos">
        <h1 className="title">DESAYUNOS</h1>
      </div>

      <div className="container-buttons">
        <button className="break-fast">DESAYUNOS</button>
        <button className="dinner">COMIDAS</button>
      </div>

      <div className="container-menu" id="carta">
        <Comidas productos={props.productos} />
      </div>
    </div>
  );
}

export default ContainerMenu;
