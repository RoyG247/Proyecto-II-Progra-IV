import { useEffect, useState } from "react";


function Habilidades() {
    const id = localStorage.getItem("id");
    const [habilidades, setHabilidades] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [hijos, setHijos] = useState([]);
    const [ruta, setRuta] = useState([]);
    const [form, setForm] = useState({ idCaracteristica: "", nivel: 1 });

    useEffect(() => {
        cargarHabilidades();
        cargarCategorias();
    }, []);

    function cargarHabilidades() {
        fetch(`http://localhost:8080/api/oferente/${id}/habilidades`)
            .then(res => res.json())
            .then(data => setHabilidades(data))
            .catch(err => console.error(err));
    }

    function cargarCategorias() {
        fetch("http://localhost:8080/api/oferente/caracteristicas")
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(err => console.error(err));
    }

    function entrarCategoria(cat) {
        fetch(`http://localhost:8080/api/oferente/caracteristicas/${cat.id}/hijos`)
            .then(res => res.json())
            .then(data => {
                setHijos(data);
                setRuta(prev => [...prev, cat]);
            });
    }

    function volverA(index) {
        if (index === -1) {
            setHijos([]);
            setRuta([]);
        } else {
            const nuevaRuta = ruta.slice(0, index + 1);
            const cat = nuevaRuta[nuevaRuta.length - 1];
            setRuta(nuevaRuta);
            fetch(`http://localhost:8080/api/oferente/caracteristicas/${cat.id}/hijos`)
                .then(res => res.json())
                .then(data => setHijos(data));
        }
    }

    async function agregarHabilidad() {
        if (!form.idCaracteristica) { alert("Seleccioná una característica"); return; }
        const res = await fetch(`http://localhost:8080/api/oferente/${id}/habilidades`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idCaracteristica: parseInt(form.idCaracteristica),
                nivel: parseInt(form.nivel)
            })
        });
        if (res.ok) {
            cargarHabilidades();
            setForm({ idCaracteristica: "", nivel: 1 });
        }
    }

    const listaMostrada = hijos.length > 0 ? hijos : categorias;

    return (
        <div className="hab-container">
            <h1 className="hab-title">Mis Habilidades</h1>

            <div className="hab-grid">

                {/* IZQUIERDA - habilidades actuales */}
                <div className="hab-card">
                    <div className="hab-list">
                        <div className="hab-item hab-header">
                            <strong>Característica</strong>
                            <strong>Nivel</strong>
                        </div>
                        {habilidades.map(h => (
                            <div className="hab-item" key={h.id}>
                                <span>{h.rutaCompleta}</span>
                                <span>{h.nivel}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CENTRO - árbol de categorías */}
                <div className="hab-card">
                    <p className="hab-label"><strong>Ruta:</strong></p>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span className="tag" style={{ cursor: "pointer" }}
                              onClick={() => volverA(-1)}>Raíces</span>
                        {ruta.map((r, i) => (
                            <span key={r.id}>
                                <span>/</span>
                                <span className="tag" style={{ cursor: "pointer" }}
                                      onClick={() => volverA(i)}>{r.nombre}</span>
                            </span>
                        ))}
                    </div>

                    <p className="hab-label">Subcategorías</p>
                    <div className="hab-list">
                        {listaMostrada.map(c => (
                            <div className="hab-item" key={c.id}>
                                <span>{c.nombre}</span>
                                <button className="btn-enter"
                                        onClick={() => entrarCategoria(c)}>Entrar</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DERECHA - agregar habilidad */}
                <div className="hab-card">
                    <h3 className="hab-subtitle">Agregar Habilidad</h3>
                    <div className="hab-form-group">
                        <label>Característica</label>
                        <select value={form.idCaracteristica}
                                onChange={e => setForm({ ...form, idCaracteristica: e.target.value })}>
                            <option value="">Seleccione...</option>
                            {listaMostrada.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hab-form-group">
                        <label>Nivel (1-5)</label>
                        <input type="number" min="1" max="5" value={form.nivel}
                               onChange={e => setForm({ ...form, nivel: e.target.value })} />
                    </div>
                    <button className="hab-btn" onClick={agregarHabilidad}>Agregar</button>
                </div>

            </div>
        </div>
    );
}

export default Habilidades;