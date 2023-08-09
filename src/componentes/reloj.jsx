import { useEffect, useRef } from "react";


export default function Reloj() {
  const h1 = useRef();
  const hora = () => {
    const fechahora = new Date();
    const hora = fechahora.getHours();
    const minuto = fechahora.getMinutes();
    const segundo = fechahora.getSeconds();
    return `${hora}:${minuto}:${segundo}`;
  };
  useEffect(() => {
    const cl = setInterval(() => {
      h1.current.innerHTML = `${hora()}`;
    }, 1000);
    return () => clearInterval(cl);
  }, []);
  return (
    <div className="App">
      <h1 ref={h1}>{hora()}</h1>
    </div>
  );
}