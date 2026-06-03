import { useEffect, useState } from "react";

function BuscarPuestos() {
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [buscado, setBuscado] = useState(false);
    const [postulado, setPostulado] = useState(false);
    const [yaPostuladas, setYaPostuladas] = useState([]);

    const rol = localStorage.getItem("rol");
    const idOferente = localStorage.getItem("id");

    useEffect(() => {
        fetch("http://localhost:8080/api/publico/caracteristicas")
            .then(res => res.json())
            .then(data => setCaracteristicas(data))
            .catch(err => console.error(err));
    }, []);

    function toggleCaracteristica(id) {
        setSeleccionadas(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    function buscar() {
        const params = seleccionadas.map(id => `caracteristicas=${id}`).join("&");
        const url = `http://localhost:8080/api/publico/buscar-puestos${params ? "?" + params : ""}`;
        fetch(url)
            .then(res => res.json())
            .then(data => { setOfertas(data); setBuscado(true); })
            .catch(err => console.error(err));
    }

    function limpiar() {
        setSeleccionadas([]);
        setOfertas([]);
        setBuscado(false);
    }

    async function postular(idOferta) {
        const res = await fetch("http://localhost:8080/api/publico/postular", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idOferta, idOferente })
        });
        if (res.ok) {
            setYaPostuladas(prev => [...prev, idOferta]);
            setPostulado(true);
        }
    }

    return (
        <div className="search-card">
            <h2 className="search-title">Buscar puestos por características</h2>

            {postulado && (
                <div className="alert alert--success"> Te has postulado exitosamente.</div>
            )}

            <ul className="filter-list">
                {caracteristicas.map(padre => (
                    <li key={padre.id}>
                        <label>
                            <input type="checkbox"
                                   checked={seleccionadas.includes(padre.id)}
                                   onChange={() => toggleCaracteristica(padre.id)} />
                            {" "}{padre.nombre}
                        </label>
                        {padre.hijos && padre.hijos.length > 0 && (
                            <ul className="sub-filter-list">
                                {padre.hijos.map(hijo => (
                                    <li key={hijo.id}>
                                        <label>
                                            <input type="checkbox"
                                                   checked={seleccionadas.includes(hijo.id)}
                                                   onChange={() => toggleCaracteristica(hijo.id)} />
                                            {" "}{hijo.nombre}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            <div className="search-actions">
                <button className="btn-search" onClick={buscar}>Buscar</button>
                <button className="btn-clean" onClick={limpiar}>Limpiar</button>
            </div>

            <div className="results-section">
                <h3 className="results-title">Resultados</h3>
                {buscado && ofertas.length === 0 && (
                    <div className="results-placeholder">
                        <p style={{ color: "#999", padding: "20px", fontStyle: "italic" }}>
                            No se encontraron puestos con esos criterios.
                        </p>
                    </div>
                )}
                {ofertas.map(oferta => (
                    <div className="card" key={oferta.id}>
                        <div className="company">{oferta.idEmpresa.nombre}</div>
                        <div className="position">{oferta.tipo}</div>
                        <div className="salary">₡{Number(oferta.salario).toLocaleString("es-CR")}</div>
                        <div className="detail">
                            <b>Descripción</b>
                            <p>{oferta.descripcionGeneral}</p>
                        </div>
                        {rol === "OFERENTE" && (
                            <div style={{ marginTop: "10px" }}>
                                {yaPostuladas.includes(oferta.id) ? (
                                    <span className="alert alert--success"
                                          style={{ display: "inline-block", padding: "6px 12px" }}>
                                        Ya postulado
                                    </span>
                                ) : (
                                    <button className="btn--card"
                                            onClick={() => postular(oferta.id)}>
                                        Postularme
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuscarPuestos;