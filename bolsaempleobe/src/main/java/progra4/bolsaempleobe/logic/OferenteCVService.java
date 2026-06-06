package progra4.bolsaempleobe.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import progra4.bolsaempleobe.data.OferenteCVRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OferenteCVService {

    @Autowired
    private OferenteCVRepository repository;



    public Optional<OferenteCV> obtenerPorOferenteId(String id) {
        return repository.findByOferente_Id(id);
    }

    public OferenteCV guardarArchivo(Oferente oferente, MultipartFile file) throws IOException {

        Optional<OferenteCV> existente = repository.findByOferente_Id(oferente.getId());
        OferenteCV cv = existente.orElseGet(OferenteCV::new);
        if (cv.getOferente() == null) {
            cv.setOferente(oferente);
        }
        String nombreArchivo = file.getOriginalFilename();
        if (nombreArchivo == null || nombreArchivo.isBlank()) {
            nombreArchivo = "cv.pdf";
        }
        cv.setNombreArchivo(nombreArchivo);
        cv.setTamanio(file.getSize());
        cv.setFechaSubida(LocalDateTime.now());
        cv.setArchivo(file.getBytes());

        return repository.save(cv);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }

    public Optional<OferenteCV> obtenerPorId(Integer id) {
        return repository.findById(id);
    }
}
