import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

function Candidatos() {
    const [puesto, setPuesto] = useState(null);
    const [candidatos, setCandidatos] = useState([]);
    const [searchParams] = useSearchParams();
    const idOferta = searchParams.get("idOferta");
    const backend = "http://localhost:8080/api";
    const token = localStorage.getItem("token");



    function handleList() {
        const request = new Request(
            `${backend}/empresa/puestos/${idOferta}/candidatos`,
            { method: "GET", headers: { "Authorization": `Bearer ${token}`} }
        );
        (async () => {
            const response = await fetch(request);
            if (!response.ok) { alert("Error: " + response.status); return; }
            const data = await response.json();
            setPuesto(data.puesto);
            setCandidatos(data.candidatos);
        })();
    }

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "EMPRESA") window.location.href = "/";
        if (idOferta) handleList();
    }, []);

    return (
        <main className="container">
            <h2 className="title">Candidatos para el puesto</h2>

            {puesto && (
                <p className="sub-title2">
                    Puesto: <strong>{puesto.descripcionGeneral}</strong>
                </p>
            )}

            <div className="admin-panel">
                <table className="table-container">
                    <thead>
                    <tr>
                        <th>Oferente</th>
                        <th>Requisitos cumplidos</th>
                        <th>% Coincidencia</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {candidatos.map(c => (
                        <tr key={c.id}>
                            <td>{c.nombre}</td>
                            <td>{c.requisitosCumplidos} / {c.totalRequisitos}</td>
                            <td>{c.porcentaje.toFixed(1)}%</td>
                            <td>
                                <Link to={`/empresa/detalles?id=${c.id}`}>
                                    <button className="admin-btn">Ver Detalles</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {candidatos.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: "1em" }}>
                                No hay candidatos postulados aún.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Link to="/empresa/ver-puestos" className="btn btn--primary">
                Volver
            </Link>
        </main>
    );
}

export default Candidatos;