package progra4.bolsaempleobe.data;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import progra4.bolsaempleobe.logic.Oferta;

import java.util.List;

public interface OfertaRepository extends JpaRepository<Oferta, Integer> {
    @Query("select o from Oferta o where o.idEmpresa.id = :nombre")
    public List<Oferta> findByNombre(String nombre);
    List<Oferta> findByIdEmpresa_Id(String idEmpresa);
    List<Oferta> findTop5ByActivoTrueOrderByFecCreacionDesc();

    @Query("SELECT o FROM Oferta o WHERE o.tipo = 'PUBLICO' AND o.activo = true ORDER BY o.fecCreacion DESC")
    List<Oferta> findTop5Publicos(Pageable pageable);

    List<Oferta> findByActivoTrue();
    @Query("SELECT DISTINCT o FROM Oferta o " +
            "JOIN OfertaCaracteristica oc ON oc.oferta.id = o.id " +
            "WHERE o.activo = true " +
            "AND oc.caracteristica.id IN :ids")
    List<Oferta> findByCaracteristicas(@Param("ids") List<Integer> ids);
}
