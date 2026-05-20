package progra4.bolsaempleobe.data;

import org.springframework.data.jpa.repository.JpaRepository;
import progra4.bolsaempleobe.logic.Caracteristica;

import java.util.List;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {
    List<Caracteristica> findBypadre_idIsNull();
    List<Caracteristica> findBypadre_id(Integer id);
}
