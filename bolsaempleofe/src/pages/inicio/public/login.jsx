import { useState } from "react";
import "../inicio.css";

function Login() {
    const [, setUser] = useState(initUser());
    const [form, setForm] = useState({ correo: "", contrasena: "" });
    const [error] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleLogin() {
        let url = 'http://localhost:8080/api/usuarios/login';
        const request = new Request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        await (async () => {
            const response = await fetch(request);
            if (!response.ok) {
                alert("Error: " + response.status);
                return;
            }
            const token = await response.text();
            const user = getUser(token);
            if (!user) {
                alert("Error: token inválido");
                return;
            }
            localStorage.setItem("token", token);
            localStorage.setItem("rol", user.rol);
            localStorage.setItem("correo", user.correo);
            localStorage.setItem("id", user.id);

            setUser(user);
            let target = "/";
            switch (user.rol) {
                case 'OFERENTE': target = "/oferente/dashboard";
                    break;
                case 'EMPRESA': target = "/empresa/dashboard";
                    break;
                case 'ADM': target = "/admin/dashboard";
                    break;
            }
            window.location.href = target;
        })();
    }

    function initUser(){
        let token= localStorage.getItem("token");
        if(token) {
            return getUser(token);
        }
        else{
            return {correo:null, rol:'', name:'', id:null};
        }
    }

    function getUser(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format');
            }
            const payloadEncoded = parts[1];
            const payLoad= JSON.parse(atob(payloadEncoded));
            return { correo: payLoad.correo, rol: payLoad.scope[0], name: payLoad.name, id: payLoad.id }        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
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
