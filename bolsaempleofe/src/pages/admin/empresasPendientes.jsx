import { useCallback, useEffect, useState } from "react";

function EmpresasPendientes() {
    const [empresas, setEmpresas] = useState([]);
    const backend = "http://localhost:8080/api/admin";

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, []);

    const cargarEmpresas = useCallback(async () => {
        const response = await fetch(`${backend}/empresas/pendientes`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        const data = await response.json();
        setEmpresas(data);
    }, [backend, getAuthHeaders]);

    async function aprobarEmpresa(id) {
        const response = await fetch(`${backend}/empresas/${id}/aprobar`, {
            method: "POST",
            headers: getAuthHeaders()
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        cargarEmpresas();
    }

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "ADM") window.location.href = "/";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarEmpresas();
    }, [cargarEmpresas]);

    return (
        <main className="admin-pendientes">
            <h2 className="admin-pendientes__titulo">Empresas Esperando Aprobación</h2>

            <table className="admin-pendientes__tabla">
                <thead className="admin-pendientes__header">
                <tr>
                    <th>Usuario</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {empresas.map(e => (
                    <tr className="admin-pendientes__fila" key={e.id}>
                        <td>{e.nombre}</td>
                        <td>
                            <button
                                type="button"
                                className="admin-pendientes__btn"
                                onClick={() => aprobarEmpresa(e.id)}
                            >
                                Aprobar
                            </button>
                        </td>
                    </tr>
                ))}
                {empresas.length === 0 && (
                    <tr className="admin-pendientes__fila">
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            No hay empresas pendientes.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </main>
    );
}

export default EmpresasPendientes;
