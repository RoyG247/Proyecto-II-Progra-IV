import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function Ver_Mis_Puestos() {
    const [puestos, setPuestos] = useState([]);
    const idEmpresa = localStorage.getItem("id");
    const navigate = useNavigate();
    const backend = "http://localhost:8080/api";
    const token = localStorage.getItem("token");



    function handleList() {
        const request = new Request(
            `${backend}/empresa/${idEmpresa}/puestos`,
            { method: "GET",  headers: {
                    "Authorization": `Bearer ${token}`
                }}
        );
        (async () => {
            const response = await fetch(request);
            if (!response.ok) { alert("Error: " + response.status); return; }
            const data = await response.json();
            setPuestos(data);
        })();
    }

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "EMPRESA") window.location.href = "/";
        handleList();
    }, []);

    function handleDesactivar(id) {
        const request = new Request(
            `${backend}/empresa/puestos/desactivar/${id}`,
            { method: "DELETE", headers: { "Authorization": `Bearer ${token}`} }
        );
        (async () => {
            const response = await fetch(request);
            if (!response.ok) { alert("Error: " + response.status); return; }
            handleList(); // refresca la tabla
        })();
    }

    return (
        <main className="container">
            <h2 className="title">Mis puestos</h2>

            <Link to="/empresa/publicar-puesto" className="btn btn--primary"
                  style={{ marginBottom: "15px", display: "inline-block" }}>
                Publicar puesto
            </Link>

            <div className="admin-panel">
                <table className="table-container">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Salario</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {puestos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.descripcionGeneral}</td>
                            <td>
                                {Number(p.salario).toLocaleString("es-CR", {
                                    minimumFractionDigits: 0
                                })}
                            </td>
                            <td>
                                {p.activo
                                    ? <span className="status status--active">Sí</span>
                                    : <span className="status status--inactive">No</span>
                                }
                            </td>
                            <td>
                                <button
                                    className="admin-btn"
                                    style={{ background: "#dc3545" }}
                                    onClick={() => handleDesactivar(p.id)}
                                >
                                    Desactivar
                                </button>
                                <Link to={`/empresa/candidatos?idOferta=${p.id}`}>
                                    <button className="admin-btn">
                                        Buscar candidatos
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {puestos.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "1em" }}>
                                No tenés puestos publicados aún.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Ver_Mis_Puestos;