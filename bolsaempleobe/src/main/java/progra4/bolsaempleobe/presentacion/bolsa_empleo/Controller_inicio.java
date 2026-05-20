package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import progra4.bolsaempleobe.logic.Oferta;
import progra4.bolsaempleobe.logic.Service;

import java.util.List;

@RestController
@RequestMapping("/api/puestos")
@CrossOrigin(origins = "http://localhost:5173")
public class Controller_inicio {

    @Autowired
    private Service service;

    @GetMapping("/ultimos")
    public List<Oferta> ultimos() {
        try {
            return service.obtenerTop5Publicos();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
