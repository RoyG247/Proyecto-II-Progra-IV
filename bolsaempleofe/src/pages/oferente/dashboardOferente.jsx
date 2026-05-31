import { useEffect } from "react";
import { Link } from "react-router";

function DashboardOferente() {
    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "OFERENTE") window.location.href = "/";
    }, []);

    return (
        <main className="admin-panel">
            <h1 className="admin-title">Oferente</h1>
            <p className="admin-subtitle">Gestión de habilidades y CV.</p>
            <div className="admin-buttons">
                <Link to="/oferente/habilidades" className="admin-btn">Mis Habilidades</Link>
                <Link to="/oferente/cv" className="admin-btn">Mi CV</Link>
            </div>
        </main>
    );
}

export default DashboardOferente;