import { useState} from "react";
import "../inicio.css";
import { BACKEND } from '@/Utils';

function Login() {

    const [setUser] = useState(initUser());

    function handleLogin(user){
        let url = BACKEND +'/usuarios/login';
        const request = new Request(url,
            {method: 'POST',headers: { 'Content-Type': 'application/json'},body: JSON.stringify(user)});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            const token = await response.text();
            localStorage.setItem("token",token);
            setUser(getUser(token));
        })();
    }

    function initUser(){
        let token= localStorage.getItem("token");
        if(token) {
            return getUser(token);
        }
        else{
            return {id:null,rol:'',name:''};
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
            return {id: payLoad.id, rol: payLoad.scope[0], name: payLoad.name}
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    }

    // function handleLogout(){
    //     localStorage.removeItem('token');
    // }

    const [local, setLocal] = useState({id:'',password:''});

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let userChanged = {...local};
        userChanged[name] = value;
        setLocal(userChanged);
    }

    return (
        <main className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Login</h1>
                </div>

                <div className="login-body">
                    <div className="user-icon">
                        <img src="/images/usuario.png" alt="User Icon"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="username"
                            placeholder="websoft@tuorg.com"
                            value={local.username}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={local.password}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button className="btn-entrar" onClick={() => handleLogin(local)}>
                        Entrar
                    </button>
                    <li><a href="/buscar_puestos" className="nav__link">Buscar Empleos</a></li>
                </div>
                <div className="login-footer"></div>
            </div>
        </main>
    );
}



export default Login;