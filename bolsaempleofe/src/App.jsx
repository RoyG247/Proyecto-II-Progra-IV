import './App.css';
import BolsaEmpleo from './pages/inicio/inicio.jsx';
import { Link, BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from '@/AppProvider.jsx';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Header />
                <Main />
                <Footer />
            </BrowserRouter>
        </AppProvider>
    );
}

function Header() {
    return (
        <header className="header">
            <p>Bolsa de Empleo</p>
            <Link to="/">Inicio</Link>
        </header>
    );
}

function Main() {
    return (
        <div className="main">
            <Routes>
                <Route exact path="/" element={<BolsaEmpleo />} />
                <Route exact path="/inicio" element={<BolsaEmpleo />} />
            </Routes>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div>
                <strong>Bolsa de Empleo</strong><br />
                <small>Total Soft Inc.</small>
            </div>
            <div>
                <small>Contacto: info@bolsaempleo.local</small><br />
                <small>Créditos: Equipo de desarrollo</small>
            </div>
        </footer>
    );
}

export default App;