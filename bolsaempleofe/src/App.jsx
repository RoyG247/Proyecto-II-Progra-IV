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
    return (
        <nav className="nav">
            <div className="nav__inner container">
                <Link to="/" className="nav__logo">
                    <img src={imagenA} className="nav__logo_img" alt="logo" />
                    Bolsa de Empleo
                </Link>
                <ul className="nav__links" role="list">
                    <li><Link to="/buscar-puestos" className="nav__link">Buscar Puestos</Link></li>
                    <li><Link to="/registro-empresa" className="nav__link">Registro Empresa</Link></li>
                    <li><Link to="/registro-oferente" className="nav__link">Registro Oferente</Link></li>
                </ul>
                <div className="nav__actions">
                    <Link to="/login" className="btn btn--primary">Iniciar sesión</Link>
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