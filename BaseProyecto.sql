CREATE DATABASE IF NOT EXISTS bolsa_empleo;
USE bolsa_empleo;

CREATE TABLE usuarios
(
    id           VARCHAR(20)  NOT NULL,
    correo       VARCHAR(150) NOT NULL,
    contrasena   VARCHAR(255) NOT NULL,
    rol          VARCHAR(25)  NOT NULL,
    aprobado     BOOLEAN      NOT NULL DEFAULT FALSE,
    fec_creacion DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usuarios
    ADD CONSTRAINT pk_usuarios PRIMARY KEY (id);
ALTER TABLE usuarios
    ADD CONSTRAINT uk_usuarios_correo UNIQUE (correo);
ALTER TABLE usuarios
    ADD CONSTRAINT ck_usuarios_rol CHECK (rol IN ('ADM', 'EMPRESA', 'OFERENTE'));

CREATE TABLE administradores
(
    id     VARCHAR(20)  NOT NULL,
    nombre VARCHAR(100) NOT NULL
);

ALTER TABLE administradores
    ADD CONSTRAINT pk_administrador PRIMARY KEY (id);
ALTER TABLE administradores
    ADD CONSTRAINT fk_admin_user FOREIGN KEY (id) REFERENCES usuarios (id);

CREATE TABLE empresas
(
    id          VARCHAR(20)  NOT NULL,
    nombre      VARCHAR(150) NOT NULL,
    ubicacion   VARCHAR(200),
    telefono    VARCHAR(20),
    descripcion VARCHAR(500) NOT NULL,
    aprobada    BOOLEAN      NOT NULL DEFAULT FALSE
);

ALTER TABLE empresas
    ADD CONSTRAINT pk_empresas PRIMARY KEY (id);
ALTER TABLE empresas
    ADD CONSTRAINT fk_empresas_usuarios FOREIGN KEY (id) REFERENCES usuarios (id);
CREATE TABLE oferentes
(
    id           VARCHAR(20)  NOT NULL,
    nombre       VARCHAR(100) NOT NULL,
    apellidos    VARCHAR(200) NOT NULL,
    nacionalidad VARCHAR(80),
    telefono     VARCHAR(20),
    residencia   VARCHAR(200),
    aprobado     BOOLEAN      NOT NULL DEFAULT FALSE
);

ALTER TABLE oferentes
    ADD CONSTRAINT pk_oferentes PRIMARY KEY (id);
ALTER TABLE oferentes
    ADD CONSTRAINT fk_oferentes_usuarios FOREIGN KEY (id) REFERENCES usuarios (id);

CREATE TABLE oferente_cv
(
    id            INT AUTO_INCREMENT NOT NULL,
    oferente_id   VARCHAR(20)        NOT NULL,
    nombreArchivo VARCHAR(255)       NOT NULL,
    tamanio       BIGINT             NOT NULL,
    fechaSubida   DATETIME           NOT NULL,
    archivo       LONGBLOB           NOT NULL,
    CONSTRAINT pk_oferente_cv PRIMARY KEY (id),
    CONSTRAINT fk_oferente_cv_oferente FOREIGN KEY (oferente_id) REFERENCES oferentes (id)
);

CREATE TABLE postulaciones (
                               id                INT AUTO_INCREMENT PRIMARY KEY,
                               id_oferta         INT         NOT NULL,
                               id_oferente       VARCHAR(20) NOT NULL,
                               fecha_postulacion TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                               FOREIGN KEY (id_oferta) REFERENCES ofertas (id),
                               FOREIGN KEY (id_oferente) REFERENCES oferentes (id)
);

CREATE TABLE caracteristicas
(
    id          INT          NOT NULL AUTO_INCREMENT,
    padre_id    INT          NULL DEFAULT NULL,
    nombre      VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE caracteristicas
    ADD CONSTRAINT fk_caracteristicas_padre FOREIGN KEY (padre_id) REFERENCES caracteristicas (id);

CREATE TABLE ofertas
(
    id                  INT          NOT NULL AUTO_INCREMENT,
    id_empresa          VARCHAR(20)  NOT NULL,
    descripcion_general VARCHAR(500) NOT NULL,
    salario             DECIMAL      NOT NULL,
    tipo                VARCHAR(30),
    activo              BOOLEAN DEFAULT TRUE,
    fec_creacion        DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE ofertas
    ADD CONSTRAINT fk_oferta_empresa FOREIGN KEY (id_empresa) REFERENCES empresas (id);

CREATE TABLE oferta_caracteristicas
(
    id                INT NOT NULL AUTO_INCREMENT,
    oferta_id         INT NOT NULL,
    caracteristica_id INT NOT NULL,
    nivel_requerido   INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

ALTER TABLE oferta_caracteristicas
    ADD CONSTRAINT uk_oferta_caracteristica UNIQUE (oferta_id, caracteristica_id);
ALTER TABLE oferta_caracteristicas
    ADD CONSTRAINT fk_ofertac_oferta FOREIGN KEY (oferta_id) REFERENCES ofertas (id);
ALTER TABLE oferta_caracteristicas
    ADD CONSTRAINT fk_ofertac_caracteristicas FOREIGN KEY (caracteristica_id) REFERENCES caracteristicas (id);

CREATE TABLE oferente_habilidad
(
    id                INT         NOT NULL AUTO_INCREMENT,
    id_oferente       VARCHAR(20) NOT NULL,
    id_caracteristica INT         NOT NULL,
    nivel             INT         NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE oferente_habilidad
    ADD CONSTRAINT uk_oferente_caracteristica UNIQUE (id_oferente, id_caracteristica);
ALTER TABLE oferente_habilidad
    ADD CONSTRAINT fk_oh_oferente FOREIGN KEY (id_oferente) REFERENCES oferentes (id);
ALTER TABLE oferente_habilidad
    ADD CONSTRAINT fk_oh_caracteristica FOREIGN KEY (id_caracteristica) REFERENCES caracteristicas (id);


INSERT INTO usuarios (id, correo, contrasena, rol, aprobado)
VALUES ('1', 'admin@bolsa.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.7uqqCyO', 'ADM', TRUE);

INSERT INTO administradores (id, nombre)
VALUES ('1', 'Administrador Sistema');

INSERT INTO usuarios (id, correo, contrasena, rol, aprobado)
VALUES ('2', 'contacto@softlab.com', '$2a$10$9v/S7SHTWNo9CH9.Spx6te00NAtXG.mXEcqIiz.S6.vP6.yG9.XG.', 'EMPRESA', TRUE);

INSERT INTO empresas (id, nombre, ubicacion, telefono, descripcion, aprobada)
VALUES ('2', 'SoftLab S.A.', 'San José, Costa Rica', '2222-3333', 'Empresa de software.', TRUE);

INSERT INTO oferentes (id, nombre, apellidos, nacionalidad, telefono, residencia, aprobado)
VALUES ('3', 'Jose', 'Sanchez', 'Costarricense', '88888888', 'San Jose', TRUE);

INSERT INTO usuarios (id, correo, contrasena, rol, aprobado)
VALUES ('3', 'jose.sanchez@gmail.com', '$2a$10$Bleubo5S2wSCA7EReS2.tuw0stZsve0jLo82FbEs7t7gqXx27KISa', 'OFERENTE', TRUE);



