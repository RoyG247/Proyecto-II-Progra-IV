import { useState } from "react";

function RegistroOferente() {
    const [form, setForm] = useState({
        id: "", nombre: "", apellidos: "",
        nacionalidad: "", telefono: "", correo: "",
        residencia: "", contrasena: ""
    });
    const [exitoso, setExitoso] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        const res = await fetch("http://localhost:8080/api/publico/registro-oferente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            setExitoso(true);
            setError("");
        } else {
            setError("Error al registrar. Verificá los datos.");
        }
    }

    return (
        <div className="main-content">
            <div className="registration-card">
                <div className="card-header">
                    <h1 className="form-title">Registro de Oferente</h1>
                </div>

                {exitoso && (
                    <div className="alert alert--success">
                        Registro exitoso. Tu cuenta está pendiente de aprobación.
                    </div>
                )}
                {error && (
                    <div className="alert alert--error">{error}</div>
                )}

                <div className="card-body">
                    <div className="form-group">
                        <label>Identificación</label>
                        <input type="text" name="id" placeholder="Ej: 123456789"
                               value={form.id} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" placeholder="Ej: Juan"
                               value={form.nombre} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input type="text" name="apellidos" placeholder="Ej: Pérez González"
                               value={form.apellidos} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Nacionalidad</label>
                        <input type="text" name="nacionalidad" placeholder="Ej: Costarricense"
                               value={form.nacionalidad} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input type="tel" name="telefono" placeholder="Ej: 8888-9999"
                               value={form.telefono} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" name="correo" placeholder="Ej: juan@correo.com"
                               value={form.correo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Lugar de residencia</label>
                        <input type="text" name="residencia" placeholder="Ej: Heredia, Costa Rica"
                               value={form.residencia} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="contrasena" placeholder="Mínimo 8 caracteres"
                               value={form.contrasena} onChange={handleChange} />
                    </div>

                    <div className="form-actions">
                        <button className="btn-primary" onClick={handleSubmit}>Registrar</button>
                        <button className="btn-secondary" onClick={() => window.history.back()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroOferente;