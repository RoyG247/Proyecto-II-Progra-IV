package progra4.bolsaempleobe.logic;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "oferentes")
public class Oferente {
    @Id
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @MapsId
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id", nullable = false)
    private Usuario usuarios;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "apellidos", nullable = false, length = 200)
    private String apellidos;

    @Column(name = "nacionalidad", length = 80)
    private String nacionalidad;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "residencia", length = 200)
    private String residencia;

    @ColumnDefault("0")
    @Column(name = "aprobado", nullable = false)
    private Boolean aprobado = false;

}