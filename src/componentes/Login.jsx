import { useState } from 'react'
import '../estilos/login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
    <>
    <>
        <h1 className='titulo'>
        Comida todo el día, todos los días
        </h1><br></br>
        </>
        <form>
            <label htmlFor='email' className='login-app'>Correo:</label><br></br>
            <input type='email' id='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}></input><br></br>
            <label htmlFor='password' className='login-app'>Contraseña:</label><br></br>
            <input type='password' id='password' value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}></input>
        </form>
    </>
    )
}

export default Login