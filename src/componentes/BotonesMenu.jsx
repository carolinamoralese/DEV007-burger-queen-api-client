/*--------------------------------- BOTÓN DINÁMICO PARA DESAYUNOS ------------------------------------------------*/
export const ButtonDesayunos = (props) => {
    
    const clickDesayunos = () => {
        props.onClick();
    };
    
    return (
        <>
        <button className='break-fast' onClick={clickDesayunos}>DESAYUNOS</button>
        </>
    )
}

/*--------------------------------- BOTÓN DINÁMICO PARA COMIDAS ------------------------------------------------*/
export const ButtonComidas = (props) => {
    const clickComidas = () => {
        props.onClick();
    };

    return (
        <>
        <button className='dinner' onClick={clickComidas}>COMIDAS</button>
        </>
    )
}
