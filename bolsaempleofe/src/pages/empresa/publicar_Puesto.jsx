import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function PublicarPuesto() {
    const token = localStorage.getItem("token");
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [niveles, setNiveles] = useState({});
    const [form, setForm] = useState({
        descripcionGeneral: "",
        tipo: "PUBLICO",
        salario: ""
    });
    const navigate = useNavigate();
    const idEmpresa = localStorage.getItem("id");
    const backend = "http://localhost:8080/api";

    function handleCaracteristicas() {
        const request = new Request(`${backend}/empresa/caracteristicas`,
            { method: "GET",  headers: {
                    "Authorization": `Bearer ${token}`
                } });
        (async () => {
            const response = await fetch(request);
            if (!response.ok) { alert("Error: " + response.status); return; }
            const data = await response.json();
            setCaracteristicas(data);
            // Inicializar todos los niveles en 0
            const nivelesIniciales = {};
            data.forEach(c => nivelesIniciales[c.id] = 0);
            setNiveles(nivelesIniciales);
        })();
    }

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "EMPRESA") window.location.href = "/";
        handleCaracteristicas();
    }, []);


    function handleFieldChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleNivelChange(idCaracteristica, valor) {
        setNiveles({ ...niveles, [idCaracteristica]: parseInt(valor) });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const body = {
            descripcionGeneral: form.descripcionGeneral,
            tipo: form.tipo,
            salario: form.salario,
            caracteristicas: Object.entries(niveles).map(([id, nivel]) => ({
                idCaracteristica: parseInt(id),
                nivelRequerido: nivel
            }))
        };
        const request = new Request(`${backend}/empresa/${idEmpresa}/puestos/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}`},
            body: JSON.stringify(body)
        });
        (async () => {
            const response = await fetch(request);
            if (!response.ok) { alert("Error al publicar: " + response.status); return; }
            navigate("/empresa/ver-puestos");
        })();
    }

    return (
        <main className="main-content">
            <div className="registration-card">
                <div className="card-header">
                    <h1 className="form-title">Publicar nuevo puesto</h1>
                    <p className="form-subtitle">Complete la información del puesto</p>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                name="descripcionGeneral"
                                value={form.descripcionGeneral}
                                onChange={handleFieldChange}
                                placeholder="Nombre del puesto..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Visibilidad del puesto</label>
                            <div className="custom-select-wrapper">
                                <select
                                    name="tipo"
                                    className="custom-select"
                                    value={form.tipo}
                                    onChange={handleFieldChange}
                                    required
                                >
                                    <option value="PUBLICO">🌐 Público</option>
                                    <option value="PRIVADO">🔒 Privado</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Salario</label>
                            <input
                                type="text"
                                name="salario"
                                value={form.salario}
                                onChange={handleFieldChange}
                                placeholder="Ej: 800000"
                                required
                            />
                        </div>

                        <table className="table-container">
                            <thead>
                            <tr>
                                <th>Característica</th>
                                <th style={{ width: "140px" }}>Nivel mínimo</th>
                            </tr>
                            </thead>
                            <tbody>
                            {caracteristicas.map(c => (
                                <tr key={c.id}>
                                    <td>{c.nombre}</td>
                                    <td>
                                        <select
                                            value={niveles[c.id] ?? 0}
                                            onChange={e => handleNivelChange(c.id, e.target.value)}
                                        >
                                            <option value="0">No requerido</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Publicar</button>
                            <Link to="/empresa/dashboard">
                                <button type="button" className="btn-secondary">Cancelar</button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}

export default PublicarPuesto;