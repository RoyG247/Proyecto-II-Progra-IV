package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progra4.bolsaempleobe.logic.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/oferente")
@CrossOrigin(origins = "http://localhost:5173")
public class OferenteController {

    @Autowired
    private Service service;

    // Ver habilidades del oferente
    @GetMapping("/{id}/habilidades")
    public ResponseEntity<?> verHabilidades(@PathVariable String id) {
        List<OferenteHabilidad> habilidades = service.obtenerHabilidadesPorOferente(id);
        for (OferenteHabilidad h : habilidades) {
            h.setRutaCompleta(service.buildRutaTexto(h.getIdCaracteristica()));
        }
        return ResponseEntity.ok(habilidades);
    }

    // Ver características para el árbol de selección
    @GetMapping("/caracteristicas")
    public ResponseEntity<?> verCaracteristicas() {
        return ResponseEntity.ok(service.obtenerPadres());
    }

    @GetMapping("/caracteristicas/{id}/hijos")
    public ResponseEntity<?> verHijos(@PathVariable Integer id) {
        return ResponseEntity.ok(service.obtenerHijos(id));
    }

    // Agregar o actualizar habilidad
    @PostMapping("/{id}/habilidades")
    public ResponseEntity<?> agregarHabilidad(
            @PathVariable String id,
            @RequestBody Map<String, Integer> body) {

        Integer idCaracteristica = body.get("idCaracteristica");
        Integer nivel = body.get("nivel");

        Oferente oferente = service.findById(id);
        OferenteHabilidad existente = service.buscarHabilidad(id, idCaracteristica);

        if (existente != null) {
            existente.setNivel(nivel);
            service.guardarHabilidad(existente);
        } else {
            OferenteHabilidad nueva = new OferenteHabilidad();
            nueva.setIdOferente(oferente);
            nueva.setIdCaracteristica(service.obtenerCaractPorId(idCaracteristica));
            nueva.setNivel(nivel);
            service.guardarHabilidad(nueva);
        }
        return ResponseEntity.ok("Habilidad guardada");
    }

    @Autowired
    private OferenteCVService cvService;

    @GetMapping("/{id}/cv")
    public ResponseEntity<?> verCV(@PathVariable String id) {
        Oferente oferente = service.findById(id);
        var cvOpt = cvService.obtenerPorOferenteId(id);
        java.util.Map<String, Object> result = new java.util.HashMap<>();
        result.put("oferente", oferente);
        result.put("tieneCV", cvOpt.isPresent());
        if (cvOpt.isPresent()) result.put("cv", cvOpt.get());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{id}/cv/subir")
    public ResponseEntity<?> subirCV(@PathVariable String id,
                                     @RequestParam("archivo") org.springframework.web.multipart.MultipartFile archivo) {
        try {
            Oferente oferente = service.findById(id);
            cvService.guardarArchivo(oferente, archivo);
            return ResponseEntity.ok("CV subido");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir CV");
        }
    }

    @GetMapping("/cv/ver/{id}")
    public ResponseEntity<byte[]> verArchivo(@PathVariable Integer id) {
        var cvOpt = cvService.obtenerPorId(id);
        if (cvOpt.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .body(cvOpt.get().getArchivo());
    }

    @GetMapping("/cv/descargar/{id}")
    public ResponseEntity<byte[]> descargarArchivo(@PathVariable Integer id) {
        var cvOpt = cvService.obtenerPorId(id);
        if (cvOpt.isEmpty()) return ResponseEntity.notFound().build();
        OferenteCV cv = cvOpt.get();
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=\"" + cv.getNombreArchivo() + "\"")
                .body(cv.getArchivo());
    }

    @DeleteMapping("/cv/eliminar/{id}")
    public ResponseEntity<?> eliminarArchivo(@PathVariable Integer id) {
        cvService.eliminar(id);
        return ResponseEntity.ok("CV eliminado");
    }
}