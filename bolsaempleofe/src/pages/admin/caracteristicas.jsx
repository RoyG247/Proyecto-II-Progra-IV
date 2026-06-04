import { useCallback, useEffect, useState } from "react";

function CaracteristicasAdmin() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [ruta, setRuta] = useState([]);
    const [form, setForm] = useState({ nombre: "", descripcion: "" });
    const backend = "http://localhost:8080/api/admin";

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, []);

    const cargarRaices = useCallback(async () => {
        const response = await fetch(`${backend}/caracteristicas`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        const data = await response.json();
        setCaracteristicas(data);
        setRuta([]);
    }, [backend, getAuthHeaders]);

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "ADM") window.location.href = "/";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarRaices();
    }, [cargarRaices]);

    async function cargarHijos(cat, nuevaRuta) {
        const response = await fetch(`${backend}/caracteristicas/${cat.id}/hijos`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        const data = await response.json();
        setCaracteristicas(data);
        setRuta(nuevaRuta);
    }

    function entrarCategoria(cat) {
        const nuevaRuta = [...ruta, cat];
        cargarHijos(cat, nuevaRuta);
    }

    function irARuta(index) {
        const nuevaRuta = ruta.slice(0, index + 1);
        const objetivo = nuevaRuta[nuevaRuta.length - 1];
        if (!objetivo) {
            cargarRaices();
            return;
        }
        cargarHijos(objetivo, nuevaRuta);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const padreId = ruta.length ? ruta[ruta.length - 1].id : null;
        const response = await fetch(`${backend}/caracteristicas`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify({
                nombre: form.nombre,
                descripcion: form.descripcion,
                padreId: padreId
            })
        });
        if (!response.ok) { alert("Error: " + response.status); return; }
        setForm({ nombre: "", descripcion: "" });
        if (ruta.length) {
            const rutaActual = [...ruta];
            cargarHijos(rutaActual[rutaActual.length - 1], rutaActual);
        } else {
            cargarRaices();
        }
    }

    return (
        <main className="main-content">
            <div className="features-container">
                <h1 className="main-title">Características</h1>

                <div className="grid-layout">
                    <section className="card-section feature-list-card">
                        <div className="card-content">
                            <p className="path-label"><strong>Ruta:</strong></p>

                            <button className="btn-root" type="button" onClick={cargarRaices}>
                                Raíces
                            </button>

                            {ruta.map((cat, index) => (
                                <span key={cat.id} style={{ marginLeft: "6px" }}>
                                    <span>/</span>
                                    <button
                                        type="button"
                                        className="btn-root"
                                        onClick={() => irARuta(index)}
                                        style={{ marginLeft: "6px" }}
                                    >
                                        {cat.nombre}
                                    </button>
                                </span>
                            ))}
                        </div>

                        <p className="category-label">
                            Categorías: <strong>{ruta.length === 0 ? "raíces" : ruta[ruta.length - 1].nombre}</strong>
                        </p>

                        <div className="list-container">
                            {caracteristicas.map(cat => (
                                <div className="list-item" key={cat.id}>
                                    <span>{cat.nombre}</span>
                                    <button className="btn-enter" type="button" onClick={() => entrarCategoria(cat)}>
                                        Entrar
                                    </button>
                                </div>
                            ))}
                            {caracteristicas.length === 0 && (
                                <div className="list-item">
                                    <span>No hay subcategorías disponibles.</span>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="card-section feature-form-card">
                        <div className="card-content">
                            <h2 className="sub-title">Agregar Característica</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            value={form.nombre}
                                            onChange={e => setForm({ ...form, nombre: e.target.value })}
                                            placeholder="Ej: Java"
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label>Descripción</label>
                                        <input
                                            type="text"
                                            value={form.descripcion}
                                            onChange={e => setForm({ ...form, descripcion: e.target.value })}
                                            placeholder="Ej: Lenguaje de programación"
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn-create">Crear</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default CaracteristicasAdmin;
