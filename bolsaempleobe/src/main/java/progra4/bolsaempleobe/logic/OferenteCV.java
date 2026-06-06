package progra4.bolsaempleobe.logic;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "oferente_cv")
public class OferenteCV {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "oferente_id", nullable = false)
    private Oferente oferente;

    @Column(name = "tamanio", nullable = false)
    private Long tamanio;

    @Column(name = "nombre_archivo", nullable = false, length = 255)
    private String nombreArchivo;

    @Column(name = "fecha_subida", nullable = false)
    private LocalDateTime fechaSubida;

    @Lob
    @Column(name = "archivo", nullable = false, columnDefinition = "LONGBLOB")
    private byte[] archivo;
}