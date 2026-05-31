package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progra4.bolsaempleobe.logic.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empresa")
@CrossOrigin(origins = "http://localhost:5173")
public class EmpresaController {

    @Autowired
    private Service service;


    @GetMapping("/{id}/puestos")
    public ResponseEntity<?> verPuestos(@PathVariable String id) {
        List<Oferta> puestos = service.getOfertasEmpresa(id);
        return ResponseEntity.ok(puestos);
    }

    @DeleteMapping("/puestos/desactivar/{id}")
    public ResponseEntity<?> desactivarPuesto(@PathVariable Integer id) {
        service.desactivarPuesto(id);
        return ResponseEntity.ok("Puesto desactivado");
    }

    @GetMapping("/caracteristicas")
    public ResponseEntity<?> getAllCaracteristicas() {
        return ResponseEntity.ok(service.findAllCaracteristicas());
    }

    @PostMapping("/{id}/puestos/guardar")
    public ResponseEntity<?> publicarPuesto(
            @PathVariable String id,
            @RequestBody Map<String, Object> body) {
        try {
            // Armar la oferta
            Oferta oferta = new Oferta();
            oferta.setDescripcionGeneral((String) body.get("descripcionGeneral"));
            oferta.setSalario(new java.math.BigDecimal(body.get("salario").toString()));
            oferta.setTipo((String) body.get("tipo"));

            Empresa empresa = service.getEmpresaById(id);
            oferta.setIdEmpresa(empresa);
            service.guardarOferta(oferta);

            // Guardar características
            List<Map<String, Integer>> caracteristicas =
                    (List<Map<String, Integer>>) body.get("caracteristicas");

            if (caracteristicas != null) {
                for (Map<String, Integer> c : caracteristicas) {
                    OfertaCaracteristica oc = new OfertaCaracteristica();
                    oc.setOferta(oferta);
                    oc.setCaracteristica(
                            service.getCaracteristicaById(c.get("idCaracteristica"))
                    );
                    oc.setNivelRequerido(c.get("nivelRequerido"));
                    service.guardarOfertaCaracteristica(oc);
                }
            }
            return ResponseEntity.ok("Puesto publicado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al guardar: " + e.getMessage());
        }
    }

    @GetMapping("/puestos/{idOferta}/candidatos")
    public ResponseEntity<?> verCandidatos(@PathVariable Integer idOferta) {
        Oferta oferta = service.getOfertaById(idOferta);
        List<Map<String, Object>> candidatos =
                service.obtenerCandidatosPorOferta(idOferta);

        Map<String, Object> response = new java.util.HashMap<>();
        response.put("puesto", oferta);
        response.put("candidatos", candidatos);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/candidatos/{id}/detalles")
    public ResponseEntity<?> verDetalleCandidato(@PathVariable String id) {
        Oferente oferente = service.findById(id);
        List<OferenteHabilidad> habilidades = service.findByOferenteId(id);

        Map<String, Object> response = new java.util.HashMap<>();
        response.put("oferente", oferente);
        response.put("habilidades", habilidades);

        return ResponseEntity.ok(response);
    }
}
