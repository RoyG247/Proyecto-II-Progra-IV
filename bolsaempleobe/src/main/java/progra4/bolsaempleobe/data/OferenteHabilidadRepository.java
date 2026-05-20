package progra4.bolsaempleobe.data;

import org.springframework.data.jpa.repository.JpaRepository;
import progra4.bolsaempleobe.logic.OferenteHabilidad;

import java.util.List;

public interface OferenteHabilidadRepository extends JpaRepository<OferenteHabilidad, Integer> {
    List<OferenteHabilidad> findByIdOferente_Id(String idOferente);
}
