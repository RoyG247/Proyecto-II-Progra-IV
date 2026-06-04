import { useEffect } from "react";
import { Link } from "react-router";

function DashboardAdmin() {
    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "ADM") window.location.href = "/";
    }, []);

    return (
        <main className="admin-panel">
            <h1 className="admin-title">Administrador</h1>
            <p className="admin-subtitle">Aprobaciones, catálogo de características y reportes.</p>

            <div className="admin-buttons">
                <Link to="/admin/empresas-pendientes" className="admin-btn">Empresas pendientes</Link>
                <Link to="/admin/oferentes-pendientes" className="admin-btn">Oferentes pendientes</Link>
                <Link to="/admin/caracteristicas" className="admin-btn">Características</Link>
                <Link to="/admin/reportes" className="admin-btn">Reportes</Link>
            </div>
        </main>
    );
}

export default DashboardAdmin;
