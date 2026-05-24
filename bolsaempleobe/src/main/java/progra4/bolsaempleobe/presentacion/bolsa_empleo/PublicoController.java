package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progra4.bolsaempleobe.logic.Service;
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
}