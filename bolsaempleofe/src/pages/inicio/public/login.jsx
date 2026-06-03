import { useState } from "react";
import "../inicio.css";

function Login() {
    const [form, setForm] = useState({ correo: "", contrasena: "" });
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleLogin() {
        try {
            const res = await fetch("http://localhost:8080/api/publico/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (!res.ok) {
                const msg = await res.text();
                setError(msg);
                return;
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("id", data.id);


            if (data.rol === "ADM") window.location.href = "/admin/dashboard";
            else if (data.rol === "EMPRESA") window.location.href = "/empresa/dashboard";
            else if (data.rol === "OFERENTE") window.location.href = "/oferente/dashboard";

        } catch {
            setError("No se pudo conectar con el servidor.");
        }
    }

    return (
        <main className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Iniciar Sesión</h1>
                </div>
                <div className="login-body">
                    <img
                        src="/src/images/usuario.png"
                        alt="User Icon"
                        className="login-user-img"
                    />
                    {error && <div className="alert alert--error">{error}</div>}
                    <div className="form-group">
                        <label>Correo</label>
                        <input type="email" name="correo"
                               placeholder="correo@ejemplo.com"
                               value={form.correo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="contrasena"
                               placeholder="••••••••"
                               value={form.contrasena} onChange={handleChange} />
                    </div>
                    <button className="btn-entrar" onClick={handleLogin}>
                        Entrar
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Login;