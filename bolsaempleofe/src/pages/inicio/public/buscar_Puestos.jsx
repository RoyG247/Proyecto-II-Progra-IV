import { useState, useEffect } from "react";

const BACKEND = "http://localhost:8080/api/publico";

function BuscarPuestos() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [buscado, setBuscado] = useState(false);

    // Al cargar la página, trae las características para los checkboxes
    useEffect(() => {
        fetch(BACKEND + "/caracteristicas")
            .then(res => res.json())
            .then(data => setCaracteristicas(data));
    }, []);

    // Marca o desmarca un checkbox
    function handleCheck(id) {
        setSeleccionadas(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    // Hace la búsqueda al backend
    async function handleBuscar() {
        let url = BACKEND + "/buscar-puestos";
        if (seleccionadas.length > 0) {
            const params = seleccionadas.map(id => `caracteristicas=${id}`).join("&");
            url += "?" + params;
        }
        const res = await fetch(url);
        const data = await res.json();
        setOfertas(data);
        setBuscado(true);
    }

    function handleLimpiar() {
        setSeleccionadas([]);
        setOfertas([]);
        setBuscado(false);
    }

    return (
        <div className="main-content">
            <div className="search-card">
                <h2 className="search-title">Buscar puestos por características</h2>

                {/* Checkboxes de características */}
                <ul className="filter-list">
                    {caracteristicas.map(padre => (
                        <li key={padre.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={seleccionadas.includes(padre.id)}
                                    onChange={() => handleCheck(padre.id)}
                                />
                                <span> {padre.nombre}</span>
                            </label>

                            {/* Hijos (subcategorías) */}
                            {padre.hijos && padre.hijos.length > 0 && (
                                <ul className="sub-filter-list">
                                    {padre.hijos.map(hijo => (
                                        <li key={hijo.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionadas.includes(hijo.id)}
                                                    onChange={() => handleCheck(hijo.id)}
                                                />
                                                <span> {hijo.nombre}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="search-actions">
                    <button className="btn-search" onClick={handleBuscar}>Buscar</button>
                    <button className="btn-clean" onClick={handleLimpiar}>Limpiar</button>
                </div>

                {/* Resultados */}
                <div className="results-section">
                    <h3 className="results-title">Resultados</h3>

                    {buscado && ofertas.length === 0 && (
                        <p style={{ color: "#999", padding: "20px", fontStyle: "italic" }}>
                            No se encontraron puestos con esos criterios.
                        </p>
                    )}

                    {ofertas.map(oferta => (
                        <div className="card" key={oferta.id}>
                            <div className="company">{oferta.idEmpresa?.nombre}</div>
                            <div className="position">{oferta.tipo}</div>
                            <div className="salary">₡{Number(oferta.salario).toLocaleString("es-CR")}</div>
                            <div className="detail">
                                <b>Descripción</b>
                                <p>{oferta.descripcionGeneral}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BuscarPuestos;