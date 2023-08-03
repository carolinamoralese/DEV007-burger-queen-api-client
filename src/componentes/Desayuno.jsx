import { useState } from 'react'; //NUEVO
import '../estilos/desayunos.css';
import {ButtonDesayunos, ButtonComidas} from './BotonesMenu';
import{ Desayunos, Comidas} from './FiltroMenu';

function Desayuno(props) {
  const [mostrarDesayunos, setMostrarDesayunos] = useState(false); //MANEJA EL ESTADO DE LOS DESAYUNOS DEL MENU
  const [mostrarComidas, setMostrarComidas] = useState(false); //MANEJA EL ESTADO DE LAS COMIDAS DEL MENU
  
  return (
    <div className='container-home'>
      <div className='titulo-desayunos'>
        <h1 className='title'>DESAYUNOS</h1>
      </div>

      <div className='container-buttons'>
        <ButtonDesayunos onClick={() => [setMostrarDesayunos(true), setMostrarComidas(false)]}>DESAYUNOS</ButtonDesayunos>  
        <ButtonComidas onClick={() => [setMostrarComidas(true), setMostrarDesayunos(false)]}>COMIDAS</ButtonComidas> 
        {/* SE AGREGA EL onClick para cambiar el estado de comidas y desayunos */}
      </div>

      <div className='container-menu' id='carta' >
      {mostrarDesayunos && <Desayunos productos={props.productos} />} {/* PASAMOS PROPS A CADA COMPONENTE */}
      {mostrarComidas && <Comidas productos={props.productos} />}
      </div>

    </div>
  );
}

export default Desayuno;
