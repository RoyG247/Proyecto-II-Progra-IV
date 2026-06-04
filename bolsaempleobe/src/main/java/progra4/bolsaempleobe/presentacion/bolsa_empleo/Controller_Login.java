package progra4.bolsaempleobe.presentacion.bolsa_empleo;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import progra4.bolsaempleobe.data.UsuarioRepository;
import progra4.bolsaempleobe.logic.Usuario;
import progra4.bolsaempleobe.security.TokenService;

import java.io.IOException;

@RestController
@RequestMapping("/api/usuarios")
@AllArgsConstructor
public class Controller_Login {
    private final UsuarioRepository usuarioRepository;
    private final TokenService tokenService;

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) throws IOException {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        usuario.setContrasena(encoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        try {
            Usuario ubd = usuario.getCorreo() != null && !usuario.getCorreo().isBlank()
                    ? usuarioRepository.findByCorreo(usuario.getCorreo()).orElseThrow()
                    : usuarioRepository.findById(usuario.getId()).orElseThrow();

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (!encoder.matches(usuario.getContrasena(), ubd.getContrasena())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            return tokenService.generateToken(ubd);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}