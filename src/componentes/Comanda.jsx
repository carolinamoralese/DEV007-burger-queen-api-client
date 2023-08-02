import "../estilos/comanda.css";

function getInfoOrder() {}

function GetOrder() {
  return (
    <div className="container-principal">
      <div className="container-order">
        <h1 className="orden-pedido">PEDIDOS</h1>
        <input className="cliente" placeholder="Cliente"></input>
        <div className="container-pedido">
          <p className="info-producto">PRODUCTO</p>
          <p className="info-precio">PRECIO</p>
          <p className="info-cantidad">CANTIDAD</p>
        </div>
        <div></div>
        <div >
          <p className="info-pedidos">TOTAL</p>
          <p className="info-pedidos">
            $<span>{getInfoOrder}</span>
          </p>
          <button className="boton-orden">CREAR ORDEN</button>
        </div>
      </div>
    </div>
  );
}

export default GetOrder;