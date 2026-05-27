package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progra4.bolsaempleobe.logic.Service;
import progra4.bolsaempleobe.logic.Caracteristica;
import progra4.bolsaempleobe.logic.Oferta;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/publico")
@CrossOrigin(origins = "http://localhost:5173")
public class PublicoController {

    @Autowired
    private Service service;

    @PostMapping("/registro-oferente")
    public ResponseEntity<?> registrarOferente(@RequestBody Map<String, String> body) {
        service.registrarOferente(
                body.get("id"),
                body.get("nombre"),
                body.get("apellidos"),
                body.get("nacionalidad"),
                body.get("telefono"),
                body.get("correo"),
                body.get("residencia"),
                body.get("contrasena")
        );
        return ResponseEntity.ok("Registro exitoso");
    }

    @PostMapping("/registro-empresa")
    public ResponseEntity<?> registrarEmpresa(@RequestBody Map<String, String> body) {
        service.registrarEmpresa(
                body.get("nombre"),
                body.get("ubicacion"),
                body.get("correo"),
                body.get("telefono"),
                body.get("descripcion"),
                body.get("contrasena")
        );
        return ResponseEntity.ok("Registro exitoso");
    }

    // Trae todas las características con sus hijos (para los checkboxes)
    @GetMapping("/caracteristicas")
    public ResponseEntity<?> getCaracteristicas() {
        List<Caracteristica> padres = service.obtenerPadres();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Caracteristica padre : padres) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", padre.getId());
            item.put("nombre", padre.getNombre());
            item.put("hijos", service.obtenerHijos(padre.getId()).stream()
                    .map(h -> Map.of("id", h.getId(), "nombre", h.getNombre()))
                    .toList());
            resultado.add(item);
        }
        return ResponseEntity.ok(resultado);
    }

    // Busca puestos según características seleccionadas
    @GetMapping("/buscar-puestos")
    public ResponseEntity<?> buscarPuestos(
            @RequestParam(required = false) List<Integer> caracteristicas) {
        List<Oferta> ofertas = service.buscarPorCaracteristicas(caracteristicas);
        return ResponseEntity.ok(ofertas);
    }


}