package progra4.bolsaempleobe.data;

import org.springframework.data.jpa.repository.JpaRepository;
import progra4.bolsaempleobe.logic.Oferente;

import java.util.List;

public interface OferenteRepository extends JpaRepository<Oferente, String> {
    List<Oferente> findByAprobado(Boolean aprobado);
    Oferente findOferenteById(String id);
}