import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('hola')

    return (
    <>
        <form>
            <label htmlFor='email'>Correo:</label>
            <input type='email' id='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}></input>

        </form>
    </>
    )
}

export default Login