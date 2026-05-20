package progra4.bolsaempleobe.data;

import org.springframework.data.jpa.repository.JpaRepository;
import progra4.bolsaempleobe.logic.OfertaCaracteristica;

import java.util.List;

public interface OfertaCaracteristicaRepository extends JpaRepository<OfertaCaracteristica, Integer> {
    List<OfertaCaracteristica> findByOferta_Id(Integer idOferta);
}
