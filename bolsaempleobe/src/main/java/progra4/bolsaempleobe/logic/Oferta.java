package progra4.bolsaempleobe.logic;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "ofertas")
public class Oferta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)  // ← EAGER para que cargue
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa idEmpresa;

    @Column(name = "descripcion_general", nullable = false, length = 500)
    private String descripcionGeneral;

    @Column(name = "salario", nullable = false, precision = 10)
    private BigDecimal salario;

    @Column(name = "tipo", length = 30)
    private String tipo;

    @ColumnDefault("1")
    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "fec_creacion", nullable = false)
    private Instant fecCreacion;
    @Transient
    private List<OfertaCaracteristica> caracteristicas;
}