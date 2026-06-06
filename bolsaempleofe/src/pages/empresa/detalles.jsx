import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

function Detalles() {
    const [oferente, setOferente] = useState(null);
    const [habilidades, setHabilidades] = useState([]);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const backend = "http://localhost:8080/api";
    const token = localStorage.getItem("token");



    function handleList() {
        const request = new Request(
            `${backend}/empresa/candidatos/${id}/detalles`,
            { method: "GET", headers: { "Authorization": `Bearer ${token}`} }
        );
        (async () => {
            const response = await fetch(request);
            if (!response.ok) { alert("Error: " + response.status); return; }
            const data = await response.json();
            setOferente(data.oferente);
            setHabilidades(data.habilidades);
        })();
    }

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "EMPRESA") window.location.href = "/";
        if (id) handleList();
    }, []);

    async function verCV() {
        const res = await fetch(`${backend}/oferente/${id}/cv`);
        const data = await res.json();
        if (data.tieneCV) {
            window.open(`${backend}/oferente/cv/ver/${data.cv.id}`, "_blank");
        } else {
            alert("Este oferente no tiene CV registrado.");
        }
    }

    return (
        <main className="container">
            <h2 className="title">Detalle de oferente</h2>

            {oferente && (
                <div className="admin-panel">
                    <div className="table-container">
                        <p><strong>ID:</strong> {oferente.usuarios?.id}</p>
                        <p><strong>Email:</strong> {oferente.usuarios?.correo}</p>
                        <p><strong>Nombre:</strong> {oferente.nombre}</p>
                        <p><strong>Teléfono:</strong> {oferente.telefono}</p>
                        <p><strong>Residencia:</strong> {oferente.residencia}</p>
                    </div>
                </div>
            )}

            <h3 className="title">Habilidades</h3>

            <div className="admin-panel">
                <table className="table-container">
                    <thead>
                    <tr>
                        <th>Característica</th>
                        <th>Nivel</th>
                    </tr>
                    </thead>
                    <tbody>
                    {habilidades.map((h, index) => (
                        <tr key={index}>
                            <td>{h.idCaracteristica?.nombre}</td>
                            <td>{h.nivel}</td>
                        </tr>
                    ))}
                    {habilidades.length === 0 && (
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center", padding: "1em" }}>
                                Sin habilidades registradas.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button onClick={verCV} className="btn btn--primary">
                    Ver CV
                </button>
                <Link to="/empresa/ver-puestos" className="btn btn--primary">
                    Volver
                </Link>
            </div>
        </main>
    );
}

export default Detalles;