import './pages/inicio/inicio.css';
import BuscarPuestos from './pages/inicio/public/buscar_Puestos.jsx';
import RegistroOferente from './pages/inicio/public/registro_Oferente.jsx';
import RegistroEmpresa from './pages/inicio/public/registro_Empresa.jsx';
import Login from './pages/inicio/public/login.jsx';

import { Link, BrowserRouter, Routes, Route } from 'react-router';
import Inicio from './pages/inicio/inicio.jsx';
import imagenA from "./images/imagenA.png";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <main style={{ paddingBottom: '60px' }}>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/registro-empresa" element={<RegistroEmpresa />} />
                    <Route path="/registro-oferente" element={<RegistroOferente />} />
                    <Route path="/buscar-puestos" element={<BuscarPuestos />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}
function Nav() {
    const rol = localStorage.getItem("rol");
    const id = localStorage.getItem("id");

    function cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("id");
        window.location.href = "/";
    }

    return (
        <nav className="nav">
            <div className="nav__inner container">
                <Link to="/" className="nav__logo">
                    <img src={imagenA} className="nav__logo_img" alt="logo" />
                    Bolsa de Empleo
                </Link>

                <ul className="nav__links" role="list">
                    {/* Links públicos - siempre visibles */}
                    <li><Link to="/buscar-puestos" className="nav__link">Buscar Puestos</Link></li>

                    {/* Sin login */}
                    {!rol && <>
                        <li><Link to="/registro-empresa" className="nav__link">Registro Empresa</Link></li>
                        <li><Link to="/registro-oferente" className="nav__link">Registro Oferente</Link></li>
                    </>}

                    {/* Admin */}
                    {rol === "ADM" && <>
                        <li><Link to="/admin/dashboard" className="nav__link">Dashboard</Link></li>
                        <li><Link to="/admin/empresas-pendientes" className="nav__link">Empresas</Link></li>
                        <li><Link to="/admin/oferentes-pendientes" className="nav__link">Oferentes</Link></li>
                        <li><Link to="/admin/caracteristicas" className="nav__link">Características</Link></li>
                    </>}

                    {/* Empresa */}
                    {rol === "EMPRESA" && <>
                        <li><Link to="/empresa/dashboard" className="nav__link">Dashboard</Link></li>
                        <li><Link to="/empresa/ver-puestos" className="nav__link">Mis Puestos</Link></li>
                        <li><Link to="/empresa/publicar-puesto" className="nav__link">Publicar Puesto</Link></li>
                    </>}

                    {/* Oferente */}
                    {rol === "OFERENTE" && <>
                        <li><Link to="/oferente/dashboard" className="nav__link">Dashboard</Link></li>
                        <li><Link to="/oferente/habilidades" className="nav__link">Mis Habilidades</Link></li>
                        <li><Link to="/oferente/cv" className="nav__link">Mi CV</Link></li>
                    </>}
                </ul>

                <div className="nav__actions">
                    {!rol && <Link to="/login" className="btn btn--primary">Iniciar sesión</Link>}
                    {rol && <>
                        <span style={{color:"white", marginRight:"10px"}}>{id}</span>
                        <button className="btn btn--primary" onClick={cerrarSesion}>Cerrar sesión</button>
                    </>}
                </div>
            </div>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__logo">
                        BolsaEmpleo
                    </div>
                    <a href="mailto:info@bolsaempleo.cr" className="footer__contact">
                        <span className="footer__contact-icon">✉</span>
                        info@bolsaempleo.cr
                    </a>
                </div>
                <div className="footer__bottom">
                    <p className="footer__copy">&copy; 2026 <strong>BolsaEmpleo.</strong> Progra IV Todos los derechos
                        reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default App;