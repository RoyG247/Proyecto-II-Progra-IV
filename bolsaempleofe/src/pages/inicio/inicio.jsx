import { useEffect, useContext, useState } from 'react';
import { AppContext } from '@/AppProvider';
import './inicio.css';

const MOCK_PUESTOS = [
    {
        id: 1,
        descripcionGeneral: 'Desarrollador Full Stack',
        salario: 1500000,
        idEmpresa: { nombre: 'Tech Solutions S.A.' },
        caracteristicas: [
            { caracteristica: { nombre: 'React' }, nivelRequerido: 'Avanzado' },
            { caracteristica: { nombre: 'Java' }, nivelRequerido: 'Intermedio' },
            { caracteristica: { nombre: 'SQL' }, nivelRequerido: 'Básico' },
        ]
    },
    {
        id: 2,
        descripcionGeneral: 'Analista de Datos',
        salario: 1200000,
        idEmpresa: { nombre: 'DataCorp CR' },
        caracteristicas: [
            { caracteristica: { nombre: 'Python' }, nivelRequerido: 'Avanzado' },
            { caracteristica: { nombre: 'Power BI' }, nivelRequerido: 'Intermedio' },
        ]
    },
    {
        id: 3,
        descripcionGeneral: 'Administrador de Sistemas',
        salario: 1350000,
        idEmpresa: { nombre: 'Infranet S.A.' },
        caracteristicas: [
            { caracteristica: { nombre: 'Linux' }, nivelRequerido: 'Avanzado' },
            { caracteristica: { nombre: 'AWS' }, nivelRequerido: 'Intermedio' },
            { caracteristica: { nombre: 'Docker' }, nivelRequerido: 'Básico' },
        ]
    },
    {
        id: 4,
        descripcionGeneral: 'Diseñador UX/UI',
        salario: 980000,
        idEmpresa: { nombre: 'Creative Studio CR' },
        caracteristicas: [
            { caracteristica: { nombre: 'Figma' }, nivelRequerido: 'Avanzado' },
            { caracteristica: { nombre: 'CSS' }, nivelRequerido: 'Intermedio' },
        ]
    },
    {
        id: 5,
        descripcionGeneral: 'Ingeniero DevOps',
        salario: 1800000,
        idEmpresa: { nombre: 'CloudBase SA' },
        caracteristicas: [
            { caracteristica: { nombre: 'Kubernetes' }, nivelRequerido: 'Avanzado' },
            { caracteristica: { nombre: 'CI/CD' }, nivelRequerido: 'Avanzado' },
            { caracteristica: { nombre: 'Terraform' }, nivelRequerido: 'Intermedio' },
        ]
    },
];

function BolsaEmpleo() {
    // ── Usar estado LOCAL en vez de contexto para aislar el problema ──
    const [puestos, setPuestos] = useState(MOCK_PUESTOS); // ← inicia con mock directo
    const [puestoModal, setPuestoModal] = useState(null);
    const backend = "http://localhost:8080/api";

    useEffect(() => {
        handleList();
    }, []);

    function handleList() {
        const request = new Request(backend + '/puestos/ultimos', {
            method: 'GET',
            headers: {}
        });
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) return; // si falla, deja el mock
                const data = await response.json();
                if (data && data.length > 0) {
                    setPuestos(data); // solo sobreescribe si hay datos reales
                }
            } catch (e) {
                // backend no disponible, queda el mock
                console.warn("Backend no disponible, mostrando datos de prueba.");
            }
        })();
    }

    return (
        <>
            <div className="title">
                <h2>Bolsa de Empleo</h2>
                <div className="sub">Últimos 5 puestos públicos</div>
            </div>

            <div className="container-cards">
                {puestos.map(puesto =>
                    <Card
                        key={puesto.id}
                        puesto={puesto}
                        onVerDetalle={() => setPuestoModal(puesto)}
                    />
                )}
            </div>

            {puestoModal && (
                <Modal
                    puesto={puestoModal}
                    onClose={() => setPuestoModal(null)}
                />
            )}
        </>
    );
}

function Card({ puesto, onVerDetalle }) {
    const salarioFormateado = Number(puesto.salario).toLocaleString('es-CR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    return (
        <div className="card">
            <div className="company">{puesto.idEmpresa.nombre}</div>
            <div className="position">{puesto.descripcionGeneral}</div>
            <div className="salary">{salarioFormateado}</div>
            <button className="btn--card" onClick={onVerDetalle}>
                Ver detalle
            </button>
        </div>
    );
}

function Modal({ puesto, onClose }) {
    const salarioFormateado = Number(puesto.salario).toLocaleString('es-CR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <button className="modal-close" onClick={onClose}>✕</button>
                <div className="modal-company">{puesto.idEmpresa.nombre}</div>
                <div className="modal-position">{puesto.descripcionGeneral}</div>
                <div className="modal-salary">₡ {salarioFormateado}</div>
                <hr className="modal-divider"/>
                <div className="modal-requisitos">
                    <b>Requisitos</b>
                    <ul>
                        {puesto.caracteristicas.map((req, index) => (
                            <li key={index}>
                                <span className="req-nombre">{req.caracteristica.nombre}</span>
                                <span className="req-nivel">Nivel mínimo: {req.nivelRequerido}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="btn--card modal-btn-cerrar" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default BolsaEmpleo;