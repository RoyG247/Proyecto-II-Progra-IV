package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progra4.bolsaempleobe.logic.Caracteristica;
import progra4.bolsaempleobe.logic.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private Service service;

    @GetMapping("/caracteristicas")
    public ResponseEntity<?> verRaices() {
        List<Caracteristica> padres = service.obtenerPadres();
        List<Map<String, Object>> resultado = padres.stream()
                .map(this::mapCaracteristica)
                .toList();
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/caracteristicas/{id}/hijos")
    public ResponseEntity<?> verHijos(@PathVariable Integer id) {
        List<Caracteristica> hijos = service.obtenerHijos(id);
        List<Map<String, Object>> resultado = hijos.stream()
                .map(this::mapCaracteristica)
                .toList();
        return ResponseEntity.ok(resultado);
    }

    @PostMapping("/caracteristicas")
    public ResponseEntity<?> crearCaracteristica(@RequestBody Map<String, Object> body) {
        String nombre = body.get("nombre") != null ? body.get("nombre").toString().trim() : "";
        String descripcion = body.get("descripcion") != null ? body.get("descripcion").toString().trim() : "";

        if (nombre.isBlank() || descripcion.isBlank()) {
            return ResponseEntity.badRequest().body("Nombre y descripción son obligatorios");
        }

        Integer padreId = null;
        Object padreObj = body.get("padreId");
        if (padreObj instanceof Number) {
            padreId = ((Number) padreObj).intValue();
        } else if (padreObj instanceof String && !((String) padreObj).isBlank()) {
            padreId = Integer.valueOf((String) padreObj);
        }

        Caracteristica nueva = new Caracteristica();
        nueva.setNombre(nombre);
        nueva.setDescripcion(descripcion);

        if (padreId != null) {
            Caracteristica padre = service.obtenerCaractPorId(padreId);
            if (padre == null) {
                return ResponseEntity.status(404).body("Categoría padre no encontrada");
            }
            nueva.setPadre(padre);
        }

        service.guardarCaracteristica(nueva);
        return ResponseEntity.ok("Característica creada");
    }

    @GetMapping("/empresas/pendientes")
    public ResponseEntity<?> listarEmpresasPendientes() {
        List<Map<String, Object>> resultado = service.obtenerEmpresasPendientes().stream()
                .map(e -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("id", e.getId());
                    item.put("nombre", e.getNombre());
                    return item;
                })
                .toList();
        return ResponseEntity.ok(resultado);
    }

    @PostMapping("/empresas/{id}/aprobar")
    public ResponseEntity<?> aprobarEmpresa(@PathVariable String id) {
        service.aprobarEmpresa(id);
        return ResponseEntity.ok("Empresa aprobada");
    }

    @GetMapping("/oferentes/pendientes")
    public ResponseEntity<?> listarOferentesPendientes() {
        List<Map<String, Object>> resultado = service.obtenerOferentesPendientes().stream()
                .map(o -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("id", o.getId());
                    item.put("nombre", o.getNombre() + " " + o.getApellidos());
                    return item;
                })
                .toList();
        return ResponseEntity.ok(resultado);
    }

    @PostMapping("/oferentes/{id}/aprobar")
    public ResponseEntity<?> aprobarOferente(@PathVariable String id) {
        service.aprobarOferente(id);
        return ResponseEntity.ok("Oferente aprobado");
    }

    private Map<String, Object> mapCaracteristica(Caracteristica c) {
        Map<String, Object> item = new HashMap<>();
        item.put("id", c.getId());
        item.put("nombre", c.getNombre());
        item.put("descripcion", c.getDescripcion());
        item.put("tieneHijos", !service.obtenerHijos(c.getId()).isEmpty());
        return item;
    }
}
