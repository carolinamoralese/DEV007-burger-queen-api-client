import logo from '../Imagenes/logo.png'
import usuario from '../Imagenes/usuario.jpg'
import '../estilos/header.css'

function Encabezado() {
    return (
        <div className="containerHeader">
            <div className="header">
                <div className='containerLogo'>
                <img src={logo} className='logoPequeño'/>
                </div>
                <div className='containerBotones'>
                <button className='boton'>HOME</button>
                <button className='boton'>PEDIDOS</button>
                <button className='boton'>SALIR</button>
                </div>
                <div className='foto'>
                <img src={usuario} className='usuario'/>
                </div>
            </div>
        </div>
    )
}

export default Encabezado;