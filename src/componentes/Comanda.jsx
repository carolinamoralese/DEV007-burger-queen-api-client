import "../estilos/comanda.css";



function GetOrder(props) {
  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input className="cliente" placeholder="CLIENTE"></input>
        <div className="container-pedido">
          <p className="info-producto">PRODUCTO</p>
          <p className="info-precio">PRECIO</p>
          <p className="info-cantidad">CANTIDAD</p>
        </div>
        <div></div>
        <div className="container-total">
          <p className="info-pedidos">TOTAL</p>
          <p className="info-pedidos">
            <span>$</span>
          </p>
          <button className="boton-orden">CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}

export default GetOrder;

//probar la funcion haciendo un boton para ver producto por producto, llamarlo order,