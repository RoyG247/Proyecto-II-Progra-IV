package progra4.bolsaempleobe.data;

import org.springframework.data.jpa.repository.JpaRepository;
import progra4.bolsaempleobe.logic.OferenteCV;

import java.util.Optional;

public interface OferenteCVRepository extends JpaRepository<OferenteCV, Integer> {

    Optional<OferenteCV> findByOferente_Id(String id);

}