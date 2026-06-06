import { useEffect, useState } from "react";

function CV() {
    const id = localStorage.getItem("id");
    const [datos, setDatos] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "OFERENTE") window.location.href = "/";
        cargarDatos();
    }, []);

    function getAuthHeaders() {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async function cargarDatos() {
        if (!id) {
            setError("No se encontró el ID del oferente. Iniciá sesión de nuevo.");
            return;
        }
        setError("");
        try {
            const res = await fetch(`http://localhost:8080/api/oferente/${id}/cv`, {
                headers: getAuthHeaders()
            });
            if (!res.ok) {
                const detalle = await res.text();
                const msg = res.status === 401
                    ? "Sesión expirada o sin permisos. Iniciá sesión de nuevo."
                    : (detalle || "Error al cargar el CV.");
                setError(msg);
                return;
            }
            const data = await res.json();
            setDatos(data);
        } catch (err) {
            console.error(err);
            setError("Error al cargar el CV.");
        }
    }

    async function subirCV(e) {
        const archivo = e.target.files[0];
        if (!archivo) return;
        const formData = new FormData();
        formData.append("archivo", archivo);
        const res = await fetch(`http://localhost:8080/api/oferente/${id}/cv/subir`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: formData
        });
        if (res.ok) {
            cargarDatos();
        } else {
            const detalle = await res.text();
            alert(detalle || "Error al subir CV");
        }
    }

    async function eliminarCV(cvId) {
        const res = await fetch(`http://localhost:8080/api/oferente/cv/eliminar/${cvId}`,
            { method: "DELETE", headers: getAuthHeaders() });
        if (res.ok) cargarDatos();
    }

    if (error) return <p>{error}</p>;
    if (!datos) return <p>Cargando...</p>;

    const { oferente, tieneCV, cv } = datos;

    return (
        <div className="cv-container">

            {/* IZQUIERDA - CV registrado */}
            <div className="cv-view-card">
                <h2>CV registrado</h2>
                {tieneCV ? (
                    <div className="cv-file">
                        <div className="cv-file-info">
                            <div className="cv-details">
                                <p className="cv-name">{cv.nombreArchivo}</p>
                                <p className="cv-meta">Tamaño: {Math.round(cv.tamanio / 1024)} KB</p>
                            </div>
                        </div>
                        <div className="cv-actions">
                            <a href={`http://localhost:8080/api/oferente/cv/ver/${cv.id}`}
                               target="_blank" className="cv-btn cv-btn-primary">Abrir PDF</a>
                            <a href={`http://localhost:8080/api/oferente/cv/descargar/${cv.id}`}
                               className="cv-btn cv-btn-secondary">Descargar</a>
                            <button className="cv-btn cv-btn-danger"
                                    onClick={() => eliminarCV(cv.id)}>Eliminar</button>
                        </div>
                    </div>
                ) : (
                    <div className="cv-empty">
                        <p>No tenés ningún CV registrado.</p>
                        <span>Subí uno usando el formulario de la derecha.</span>
                    </div>
                )}
            </div>

            {/* DERECHA - Subir CV */}
            <div className="card upload-card">
                <h2 className="upload-title">Reemplazar CV</h2>
                <p className="upload-subtitle">Subir un nuevo archivo reemplaza el CV actual.</p>
                <label className="upload-area">
                    <input type="file" accept="application/pdf" onChange={subirCV} />
                    <div className="upload-content">
                        <p className="main-text">Hacé click para seleccionar archivo PDF</p>
                        <span className="file-type">Solo PDF · Máx 1MB</span>
                    </div>
                </label>
            </div>

            {/* ABAJO - Datos del oferente */}
            {oferente && (
                <div className="card">
                    <h2>Datos del oferente</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Identificación:</span>
                            <span>{oferente.id}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Nombre:</span>
                            <span>{oferente.nombre} {oferente.apellidos}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Nacionalidad:</span>
                            <span>{oferente.nacionalidad}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Teléfono:</span>
                            <span>{oferente.telefono}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Residencia:</span>
                            <span>{oferente.residencia}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CV;
