import { useState } from "react";

function RegistroEmpresa() {
    const [form, setForm] = useState({
        nombre: "", ubicacion: "", correo: "",
        telefono: "", descripcion: "", contrasena: ""
    });
    const [exitoso, setExitoso] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
            const res = await fetch("http://localhost:8080/api/publico/registro-empresa", {
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
                    <h1 className="form-title">Registro de Empresa</h1>
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
                        <label>Nombre de la empresa</label>
                        <input type="text" name="nombre" placeholder="Ej: SoftLab S.A."
                               value={form.nombre} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Ubicación</label>
                        <input type="text" name="ubicacion" placeholder="Ej: San José, Costa Rica"
                               value={form.ubicacion} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" name="correo" placeholder="Ej: contacto@empresa.com"
                               value={form.correo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input type="tel" name="telefono" placeholder="Ej: 2222-3333"
                               value={form.telefono} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea name="descripcion" placeholder="Descripción de la empresa"
                                  value={form.descripcion} onChange={handleChange} rows="3" />
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

export default RegistroEmpresa;