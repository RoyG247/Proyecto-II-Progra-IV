<div align="center">

```
██████╗  ██████╗ ██╗     ███████╗ █████╗     ██████╗ ███████╗    ███████╗███╗   ███╗██████╗ ██╗     ███████╗ ██████╗ 
██╔══██╗██╔═══██╗██║     ██╔════╝██╔══██╗    ██╔══██╗██╔════╝    ██╔════╝████╗ ████║██╔══██╗██║     ██╔════╝██╔═══██╗
██████╔╝██║   ██║██║     ███████╗███████║    ██║  ██║█████╗      █████╗  ██╔████╔██║██████╔╝██║     █████╗  ██║   ██║
██╔══██╗██║   ██║██║     ╚════██║██╔══██║    ██║  ██║██╔══╝      ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝  ██║   ██║
██████╔╝╚██████╔╝███████╗███████║██║  ██║    ██████╔╝███████╗    ███████╗██║ ╚═╝ ██║██║     ███████╗███████╗╚██████╔╝
╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═════╝ ╚══════╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝ ╚═════╝ 
```

# 💼 Bolsa de Empleo — Proyecto II · Progra IV

**Plataforma web full-stack para conectar empresas con candidatos de empleo**

[![Java](https://img.shields.io/badge/Backend-Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![CSS](https://img.shields.io/badge/Estilos-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)

</div>

---

## 📋 Descripción

**Bolsa de Empleo** es una aplicación web completa desarrollada como Proyecto II del curso de Programación IV. Permite a **empresas** publicar ofertas de trabajo, a **oferentes** postularse a las mismas y gestionar su perfil con CV, y a un **administrador** aprobar y supervisar todo el proceso.

La arquitectura sigue un modelo **cliente-servidor** con backend en Java y frontend en React, respaldado por una base de datos relacional MySQL.

---

## 🏗️ Arquitectura del Proyecto

```
Proyecto-II-Progra-IV/
│
├── 📁 bolsaempleobe/        # Backend — Java (API REST)
├── 📁 bolsaempleofe/        # Frontend — React (SPA)
├── 📄 BaseProyecto.sql      # Script de base de datos MySQL
└── 📄 package.json          # Dependencias Node del frontend
```

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React · React Router v7 · React Modal · CSS3 |
| **Backend** | Java |
| **Base de Datos** | MySQL |
| **Autenticación** | BCrypt (contraseñas hasheadas) |

---

## 👥 Roles del Sistema

El sistema maneja **tres tipos de usuarios**:

### 🛡️ Administrador (`ADM`)
- Aprueba o rechaza cuentas de empresas y oferentes
- Gestiona características/habilidades del sistema
- Supervisa la plataforma completa

### 🏢 Empresa (`EMPRESA`)
- Crea y publica ofertas de trabajo
- Define habilidades requeridas por oferta con nivel mínimo
- Visualiza postulantes a sus ofertas

### 🙋 Oferente (`OFERENTE`)
- Crea su perfil profesional
- Sube su **CV en formato PDF**
- Registra sus habilidades con nivel de dominio
- Se postula a ofertas disponibles

---

## 🗄️ Modelo de Base de Datos

```sql
usuarios          -- Tabla central de autenticación (id, correo, rol, aprobado)
├── administradores
├── empresas      -- nombre, ubicación, teléfono, descripción
└── oferentes     -- nombre, apellidos, nacionalidad, residencia

ofertas           -- Publicaciones de trabajo (empresa, salario, tipo, activo)
├── oferta_caracteristicas   -- Habilidades requeridas por oferta + nivel
└── postulaciones            -- Relación oferente ↔ oferta

caracteristicas   -- Habilidades/competencias (jerarquía con padre_id)
├── oferente_habilidad       -- Habilidades del candidato + su nivel
└── oferente_cv              -- CVs subidos por oferentes (LONGBLOB)
```

> **Usuarios de prueba** incluidos en el script SQL:
> - `admin@bolsa.com` — Administrador del sistema
> - `contacto@softlab.com` — Empresa de ejemplo (SoftLab S.A.)
> - `jose.sanchez@gmail.com` — Oferente de ejemplo

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Java** 11+
- **Node.js** 18+
- **MySQL** 8+

### 1. Base de Datos

```sql
-- Ejecutar el script de base de datos
mysql -u root -p < BaseProyecto.sql
```

Esto creará la base de datos `bolsa_empleo` con todas las tablas y datos iniciales.

### 2. Backend (Java)

```bash
cd bolsaempleobe
# Configurar conexión a MySQL en el archivo de propiedades
# Compilar y ejecutar el servidor
```

### 3. Frontend (React)

```bash
cd bolsaempleofe

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

---

## ✨ Funcionalidades Principales

- ✅ **Registro y login** con roles diferenciados
- ✅ **Aprobación de cuentas** por parte del administrador
- ✅ **Publicación de ofertas** con habilidades requeridas y nivel mínimo
- ✅ **Postulación a ofertas** por parte de oferentes
- ✅ **Subida de CV** en formato PDF almacenado en base de datos
- ✅ **Gestión de habilidades** con estructura jerárquica
- ✅ **Sistema de niveles** para habilidades (oferente vs. requerido)
- ✅ **Navegación SPA** con React Router v7

---

## 👨‍💻 Equipo

Proyecto desarrollado para el curso de **Programación IV**.

| Colaborador |
|------------|
| [RoyG247](https://github.com/RoyG247) |
| [Carlos175214](https://github.com/Carlos175214) |
| [IsaacHollow](https://github.com/IsaacHollow) |
| *(ver [contributors](https://github.com/RoyG247/Proyecto-II-Progra-IV/graphs/contributors))* |

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos.

---

<div align="center">

*Hecho con ☕ Java y ⚛️ React*

</div>
