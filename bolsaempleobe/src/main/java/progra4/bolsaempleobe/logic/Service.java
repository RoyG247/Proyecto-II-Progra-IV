package progra4.bolsaempleobe.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import progra4.bolsaempleobe.data.*;

import java.time.Instant;
import java.util.*;


@org.springframework.stereotype.Service
public class Service {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private OfertaCaracteristicaRepository ofertaCaracteristicaRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OferenteRepository oferenteRepository;

    @Autowired
    private OferenteHabilidadRepository oferenteHabilidadRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Autowired
    private PostulacionesRepository postulacionesRepository;




    /*==========Empresas============*/
    public List<Oferta> obtenerTop5Publicos() {
        List<Oferta> ofertas = ofertaRepository.findTop5Publicos(PageRequest.of(0, 5));

        for (Oferta o : ofertas) {
            List<OfertaCaracteristica> requisitos = ofertaCaracteristicaRepository.findByOferta_Id(o.getId());

            List<OfertaCaracteristica> requisitosFiltrados = requisitos.stream()
                    .filter(req -> req.getNivelRequerido() != null && req.getNivelRequerido() > 0)
                    .toList();

            o.setCaracteristicas(requisitosFiltrados); // campo @Transient en Oferta
        }

        return ofertas;
    }

    public List<OfertaCaracteristica> getOfertaCaracteristicas(Integer idOferta) {
        return ofertaCaracteristicaRepository.findByOferta_Id(idOferta);
    }

    public Caracteristica getCaracteristicaById(Integer id) {
        return caracteristicaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada"));
    }

    public void guardarOfertaCaracteristica(OfertaCaracteristica oc) {
        ofertaCaracteristicaRepository.save(oc);
    }

    public List<Caracteristica> findAllCaracteristicas() {
        return caracteristicaRepository.findAll();
    }
    public Empresa getEmpresaById(String idUsuario) {
        return empresaRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }

    public Oferta guardarOferta(Oferta oferta) {
        oferta.setFecCreacion(Instant.now());
        oferta.setActivo(true);
        return ofertaRepository.save(oferta);
    }

    public List<Map<String,Object>> obtenerCandidatosPorOferta(Integer idOferta) {
        List<Postulaciones> postulaciones = postulacionesRepository.findByOferta_Id(idOferta);
        List<OfertaCaracteristica> requisitos = ofertaCaracteristicaRepository.findByOferta_Id(idOferta);

        List<Map<String,Object>> candidatos = new ArrayList<>();

        for (Postulaciones p : postulaciones) {
            Oferente o = p.getOferente();
            List<OferenteHabilidad> habilidades = oferenteHabilidadRepository.findByIdOferente_Id(o.getId());
            int cumplidos = 0;
            for (OfertaCaracteristica req : requisitos) {
                for (OferenteHabilidad hab : habilidades) {
                    if (Objects.equals(req.getCaracteristica().getId(), hab.getIdCaracteristica().getId())
                            && hab.getNivel() >= req.getNivelRequerido()) {
                        cumplidos++;
                        break;
                    }
                }
            }

            long total = requisitos.stream()
                    .filter(r -> r.getNivelRequerido() > 0)
                    .count();

            double porcentaje = total == 0 ? 0 : (cumplidos * 100.0 / total);

            Map<String,Object> fila = new HashMap<>();
            fila.put("id", o.getId());
            fila.put("nombre", o.getNombre() + " " + o.getApellidos());
            fila.put("requisitosCumplidos", cumplidos);
            fila.put("totalRequisitos", total);
            fila.put("porcentaje", porcentaje);

            candidatos.add(fila);
        }

        return candidatos;
    }
    public List<Oferta> getOfertasEmpresa(String idEmpresa) {
        return ofertaRepository.findByIdEmpresa_Id(idEmpresa);
    }
    public Oferta getOfertaById(Integer id) {
        return ofertaRepository.findById(id).orElseThrow();
    }

    public List<Empresa> obtenerEmpresasPendientes() {
        return empresaRepository.findByAprobada(false);
    }

    public void aprobarEmpresa(String id) {
        Empresa empresa = empresaRepository.findById(id).orElse(null);
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (empresa != null) {
            empresa.setAprobada(true);
            usuario.setAprobado(true);
            empresaRepository.save(empresa);
            usuarioRepository.save(usuario);
        }
    }
    public Oferente findById(String id) {
        return oferenteRepository.findOferenteById(id);
    }
    public List<OferenteHabilidad> findByOferenteId(String idOferente) {
        return oferenteHabilidadRepository.findByIdOferente_Id(idOferente);
    }

    public void desactivarPuesto(Integer id) {
        Oferta oferta = ofertaRepository.findById(id).orElse(null);
        if (oferta != null) {
            oferta.setActivo(false);
            ofertaRepository.save(oferta);
        }
    }

    /*==========Oferentes============*/
    public List<Oferente> obtenerOferentesPendientes() {
        return oferenteRepository.findByAprobado(false);
    }

    public void aprobarOferente(String id) {
        Oferente oferente = oferenteRepository.findById(id).orElse(null);
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (oferente != null) {
            oferente.setAprobado(true);
            usuario.setAprobado(true);
            oferenteRepository.save(oferente);
            usuarioRepository.save(usuario);
        }
    }

    /*==========Usuarios============*/
    public void registrarEmpresa(String nombre, String ubicacion, String correo,
                                 String telefono, String descripcion, String contrasena) {

        String nuevoId = String.valueOf(System.currentTimeMillis()).substring(7);

        Usuario usuario = new Usuario();
        usuario.setId(nuevoId);
        usuario.setCorreo(correo);
        usuario.setContrasena(passwordEncoder.encode(contrasena));
        usuario.setRol("EMPRESA");
        usuario.setAprobado(false);
        usuarioRepository.save(usuario);
        Usuario usuarioPersistido = usuarioRepository.findById(nuevoId)
                .orElseThrow(() -> new RuntimeException("Error al ingresar usuairo"));
        Empresa empresa = new Empresa();
        empresa.setUsuarios(usuarioPersistido);
        empresa.setNombre(nombre);
        empresa.setUbicacion(ubicacion);
        empresa.setTelefono(telefono);
        empresa.setDescripcion(descripcion);
        empresa.setAprobada(false);
        empresaRepository.save(empresa);
    }

    public void registrarOferente(String id, String nombre, String apellidos,
                                  String nacionalidad, String telefono, String correo,
                                  String residencia, String contrasena) {
        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setCorreo(correo);
        usuario.setContrasena(passwordEncoder.encode(contrasena));
        usuario.setRol("OFERENTE");
        usuario.setAprobado(false);
        usuarioRepository.save(usuario);
        Usuario usuarioPersistido = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error al persistir usuario"));
        Oferente oferente = new Oferente();
        oferente.setUsuarios(usuarioPersistido);
        oferente.setNombre(nombre);
        oferente.setApellidos(apellidos);
        oferente.setNacionalidad(nacionalidad);
        oferente.setTelefono(telefono);
        oferente.setResidencia(residencia);
        oferente.setAprobado(false);
        oferenteRepository.save(oferente);
    }
    /*==========Caracteristicas============*/

    public Caracteristica obtenerCaractPorId(Integer id) {
        return caracteristicaRepository.findById(id).orElse(null);
    }
    public List<Caracteristica> obtenerPadres() {
        return caracteristicaRepository.findBypadre_idIsNull();
    }
    public List<Caracteristica> obtenerHijos(Integer id) {
        return caracteristicaRepository.findBypadre_id(id);
    }
    public List<Caracteristica> obtenerRuta(Caracteristica caracteristica) {
        List<Caracteristica> ruta = new ArrayList<>();
        while(caracteristica!=null){
            ruta.add(0, caracteristica);
            caracteristica = caracteristica.getPadre();
        }
        return ruta;
    }


    public Usuario getUsuarioByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    /*==========HABILIDADES============*/

    // 🔹 Obtener habilidades del oferente
    public List<OferenteHabilidad> obtenerHabilidadesPorOferente(String idOferente) {
        return oferenteHabilidadRepository.findByIdOferente_Id(idOferente);
    }

    // 🔹 Buscar si ya existe una habilidad (para update)
    public OferenteHabilidad buscarHabilidad(String idOferente, Integer idCaracteristica) {

        List<OferenteHabilidad> lista =
                oferenteHabilidadRepository.findByIdOferente_Id(idOferente);

        for (OferenteHabilidad h : lista) {
            if (h.getIdCaracteristica().getId().equals(idCaracteristica)) {
                return h;
            }
        }

        return null;
    }

    // 🔹 Guardar habilidad (insert o update)
    public void guardarHabilidad(OferenteHabilidad habilidad) {
        oferenteHabilidadRepository.save(habilidad);
    }

    public String buildRutaTexto(Caracteristica caracteristica) {

        List<String> nombres = new ArrayList<>();

        while (caracteristica != null) {
            nombres.add(0, caracteristica.getNombre());
            caracteristica = caracteristica.getPadre();
        }

        return String.join(" / ", nombres);
    }

    public void guardarCaracteristica(Caracteristica nueva) {
        caracteristicaRepository.save(nueva);
    }

    //===============================POSTULAR==========================

    public List<Oferta> buscarPorCaracteristicas(List<Integer> idsCaracteristicas) {
        if (idsCaracteristicas == null || idsCaracteristicas.isEmpty()) {
            return ofertaRepository.findByActivoTrue();
        }
        return ofertaRepository.findByCaracteristicas(idsCaracteristicas);
    }

    public boolean yaPostulado(Integer idOferta, String correoOferente) {
        Usuario usuario = usuarioRepository.findByCorreo(correoOferente).orElse(null);
        if (usuario == null) return false;
        return postulacionesRepository.existsByOferta_IdAndOferente_Id(idOferta, usuario.getId());
    }

    public void postular(Integer idOferta, String correoOferente) {
        if (yaPostulado(idOferta, correoOferente)) return;

        Usuario usuario = usuarioRepository.findByCorreo(correoOferente)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Oferente oferente = oferenteRepository.findById(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Oferente no encontrado"));

        Postulaciones p = new Postulaciones();
        p.setOferta(ofertaRepository.findById(idOferta).orElseThrow());
        p.setOferente(oferente);
        postulacionesRepository.save(p);
    }

}