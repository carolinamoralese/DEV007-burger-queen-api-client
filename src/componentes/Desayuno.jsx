import cafe from'../Imagenes/cafe.png'
import '../estilos/desayunos.css'


function Desayuno() {
  return (
    <div className='container-home'>
      <div className='container-title'>
        <h1 className='title'>DESAYUNOS</h1>
      </div>

      <div className='container-buttons'>
        <button className='break-fast'>DESAYUNOS</button>
        <button className='dinner'>COMIDAS</button>
      </div>

      <section className='container-menu'>
        <div className='product'>
            <img className='imagen' src={cafe}></img>
            <p className='description'>Cafe Americano<br />$5.00</p>
            <button className='add'>+</button>
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
        </div>
      </section>

    </div>
  );
}

export default Desayuno;
