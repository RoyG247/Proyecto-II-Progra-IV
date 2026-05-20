package progra4.bolsaempleobe.logic;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;


@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@Entity
@Table(name = "empresas")
public class Empresa {
    @Id
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id", nullable = false)
    private Usuario usuarios;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "ubicacion", length = 200)
    private String ubicacion;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "descripcion", nullable = false, length = 500)
    private String descripcion;

    @ColumnDefault("0")
    @Column(name = "aprobada", nullable = false)
    private Boolean aprobada = false;

    public boolean isAprobada() {
        return aprobada;
    }


}