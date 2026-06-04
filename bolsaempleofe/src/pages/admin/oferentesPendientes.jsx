import { useCallback, useEffect, useState } from "react";

function OferentesPendientes() {
    const [oferentes, setOferentes] = useState([]);
    const backend = "http://localhost:8080/api/admin";

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, []);

    const cargarOferentes = useCallback(async () => {
        const response = await fetch(`${backend}/oferentes/pendientes`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        const data = await response.json();
        setOferentes(data);
    }, [backend, getAuthHeaders]);

    async function aprobarOferente(id) {
        const response = await fetch(`${backend}/oferentes/${id}/aprobar`, {
            method: "POST",
            headers: getAuthHeaders()
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        cargarOferentes();
    }

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "ADM") window.location.href = "/";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarOferentes();
    }, [cargarOferentes]);

    return (
        <main className="admin-pendientes">
            <h2 className="admin-pendientes__titulo">Oferentes Esperando Aprobación</h2>

            <table className="admin-pendientes__tabla">
                <thead className="admin-pendientes__header">
                <tr>
                    <th>Usuario</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {oferentes.map(o => (
                    <tr className="admin-pendientes__fila" key={o.id}>
                        <td>{o.nombre}</td>
                        <td>
                            <button
                                type="button"
                                className="admin-pendientes__btn"
                                onClick={() => aprobarOferente(o.id)}
                            >
                                Aprobar
                            </button>
                        </td>
                    </tr>
                ))}
                {oferentes.length === 0 && (
                    <tr className="admin-pendientes__fila">
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            No hay oferentes pendientes.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </main>
    );
}

export default OferentesPendientes;
