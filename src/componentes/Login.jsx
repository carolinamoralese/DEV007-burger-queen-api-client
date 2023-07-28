import { useState } from 'react'
import '../estilos/login.css'
import logo from '../Imagenes/logo.png'
import PeticionLogin, {  GetUsers }  from './Peticion'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
    <div className='container-login'>
    <div className='container-form'>
        <h1 className='titulo'>
        Comida todo el día, <br></br>todos los días
        </h1><br></br><br></br><br></br>
        <div>
            <input className='ingresar' type='email' id='email' value={email} placeholder='CORREO' onChange={(e) => {
                setEmail(e.target.value)
            }}></input><br></br><br></br><br></br>
            <input className='ingresar' type='password' id='password' value={password} placeholder='CONTRASEÑA' onChange={(e) => {
                setPassword(e.target.value)
            }}></input><br></br><br></br><br></br>
            
            <button className='ingresarDatos' 
            onClick={() => PeticionLogin(email, password)}
            >INGRESAR</button>
            <button className='ingresarDatos' 
            onClick={() => GetUsers()}
            >INGRESAR</button>

        </div>
    </div>
    <div className='container-logo'>
    <img src={logo} className='logo'/>
    </div>
    </div>
    )
}

export default Login