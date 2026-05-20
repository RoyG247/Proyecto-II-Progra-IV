package progra4.bolsaempleobe.logic;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@Entity
@Table(name = "usuarios")
public class Usuario{
    @Id
    @Size(max = 20)
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @Size(max = 150)
    @NotNull
    @Column(name = "correo", nullable = false, length = 150)
    private String correo;

    @Size(max = 255)
    @NotNull
    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Size(max = 25)
    @NotNull
    @Column(name = "rol", nullable = false, length = 25)
    private String rol;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "aprobado", nullable = false)
    private Boolean aprobado = false;

    @NotNull
    @Column(name = "fec_creacion", nullable = false, updatable = false)
    private Instant fecCreacion;

    @PrePersist
    protected void onCreate() {
        fecCreacion = Instant.now();
    }

}