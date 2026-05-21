import './inicio.css';
import { useCallback, useEffect, useState } from "react";

const backend = "http://localhost:8080/api/puestos";

function Inicio() {
    //const [inicio, setInicio] = useState(null);
    const [puestos, setPuestos] = useState([]);

    const handleList = useCallback(() => {
        const request = new Request(backend + '/ultimos', { method: 'GET', headers: {} });
        (async () => {
            const response = await fetch(request);
            if (!response.ok) {
                alert("Error: " + response.status);
                return;
            }
            const puestos = await response.json();
            setPuestos(puestos);

        })();
    }, []);

    useEffect(() => {
        handleList();
    }, [handleList]);

    return (
        <div>
            <div className="title">
                <h2>Bolsa de Empleo</h2>
                <div className="sub">Últimos 5 puestos públicos</div>
            </div>

            <div className="container-cards">
                {puestos.map(puesto => (
                    <div className="card" key={puesto.id}>

                        <div className="company">{puesto.idEmpresa.nombre}</div>

                        <div className="position">{puesto.descripcionGeneral}</div>

                        <div className="salary">
                            {Number(puesto.salario).toLocaleString("es-CR")}
                        </div>

                        <button className="btn--card">Ver detalle</button>

                        <div className="detail">
                            <b>Requisitos</b>
                            <ul>
                                {puesto.caracteristicas?.map((req, i) => (
                                    <li key={i}>
                                        <span>{req.caracteristica.nombre}</span>
                                        {" "}(nivel mínimo: <span>{req.nivelRequerido}</span>)
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inicio;