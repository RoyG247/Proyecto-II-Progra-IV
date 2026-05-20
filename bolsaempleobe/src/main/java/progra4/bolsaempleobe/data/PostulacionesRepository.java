package progra4.bolsaempleobe.data;
import org.springframework.data.jpa.repository.JpaRepository;
import progra4.bolsaempleobe.logic.Postulaciones;

import java.util.List;

public interface PostulacionesRepository extends JpaRepository<Postulaciones, Integer> {
    List<Postulaciones> findByOferta_Id(Integer idOferta);
    boolean existsByOferta_IdAndOferente_Id(Integer idOferta, String idOferente);
}
