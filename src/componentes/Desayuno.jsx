import '../estilos/desayunos.css';
import { Desayunos } from './utils';

function Desayuno() {
  return (
    <div className='container-home'>
      <div className='titulo-desayunos'>
        <h1 className='title'>DESAYUNOS</h1>
      </div>

      <div className='container-buttons'>
        <button className='break-fast'>DESAYUNOS</button>
        <button className='dinner'>COMIDAS</button>
      </div>

      <div className='container-menu' id='carta'>
      <Desayunos/>

        {/*<div className='product'>
            <img className='imagen' src={cafe}></img>
            <div className='container-description'>
            <p className='description'>Cafe Americano<br />$5.00</p>
            <button className='add'>+</button>
            </div>
        </div>
        
        <div className='product'>
            <img src=''></img>
            <p></p>
            <button></button>
        </div>

        <div className='product'>
            <img src=''></img>
            <p></p>
            <button></button>
        </div>

        <div className='product'>
            <img src=''></img>
            <p></p>
            <button></button>
  </div>*/}
      </div>

    </div>
  );
}

export default Desayuno;
