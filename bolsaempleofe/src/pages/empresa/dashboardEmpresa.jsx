import { useEffect } from "react";
import { Link } from "react-router";

function DashboardEmpresa() {
    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "EMPRESA") window.location.href = "/";
    }, []);

    return (
        <main className="admin-panel">
            <h1 className="admin-title">Empresa - Dashboard</h1>
            <p className="admin-subtitle">Desde aquí podés administrar tus puestos y buscar candidatos.</p>
            <div className="admin-buttons">
                <Link to="/empresa/ver-puestos" className="admin-btn">Ver mis puestos</Link>
                <Link to="/empresa/publicar-puesto" className="admin-btn">Publicar nuevo puesto</Link>
            </div>
        </main>
    );
}

export default DashboardEmpresa;